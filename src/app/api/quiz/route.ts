import { NextRequest, NextResponse } from 'next/server';

interface QuizData {
  dates?: string;
  budget?: string;
  travelers?: string;
  region?: string;
  priorities: string[];
  name: string;
  phone?: string;
  email?: string;
  source?: string; // Источник (страница/кнопка)
}

// 🆔 Генерация ID заявки
function generateApplicationId(): string {
  const date = new Date();
  const timestamp = date.getTime();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `QUIZ-${timestamp}-${random}`;
}

// 🧠 Scoring логика
function calculateScore(data: QuizData): { score: number; priority: string; emoji: string; sla: string } {
  let score = 0;

  // 📅 Сроки
  if (data.dates === 'В ближайший месяц') score += 3;
  else if (data.dates === 'Через 1-3 месяца') score += 2;
  else if (data.dates === 'Через 3-6 месяцев') score += 1;

  // 💰 Бюджет
  if (data.budget === '400 000 ₽+') score += 3;
  else if (data.budget === '200 000 – 400 000 ₽') score += 3;
  else if (data.budget === '100 000 – 200 000 ₽') score += 2;
  else if (data.budget === 'Пока не знаю') score += 1;

  // 👥 Кто едет
  if (data.travelers === 'Пара' || data.travelers === 'Семья с детьми') score += 2;
  else if (data.travelers === 'Один/одна') score += 1;

  // 🌍 Регион определён
  if (data.region && data.region !== 'Пока не определился') score += 1;

  // 🎯 Определяем приоритет
  let priority = '';
  let emoji = '';
  let sla = ''; // ⏱ SLA для менеджера

  if (score >= 7) {
    priority = 'ГОРЯЧИЙ';
    emoji = '🔥';
    sla = '⚡ Связаться в течение 30 минут';
  } else if (score >= 4) {
    priority = 'ТЁПЛЫЙ';
    emoji = '🌡';
    sla = '📞 Связаться в течение дня';
  } else {
    priority = 'ХОЛОДНЫЙ';
    emoji = '❄️';
    sla = '📅 Обработать когда будет окно';
  }

  return { score, priority, emoji, sla };
}

// Формируем доп комментарии
function getInsights(data: QuizData): string[] {
  const insights: string[] = [];

  if (data.budget === '400 000 ₽+' || data.budget === '200 000 – 400 000 ₽') {
    insights.push('💎 Клиент открыт к премиальным вариантам');
  }

  if (data.dates === 'Пока не определился' || data.region === 'Пока не определился') {
    insights.push('🧭 Нужна консультация, клиенту важно сопровождение');
  }

  if (data.priorities.includes('Комфорт и сервис')) {
    insights.push('⭐ Акцент на премиальный сервис');
  }

  if (data.priorities.includes('Минимум детей')) {
    insights.push('🔇 Важен спокойный отдых без детей');
  }

  return insights;
}

// 📱 Отправка в Telegram
async function sendToTelegram(
  data: QuizData, 
  scoring: ReturnType<typeof calculateScore>,
  applicationId: string
) {
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn('⚠️ Telegram credentials not configured');
    return;
  }

  const insights = getInsights(data);
  const insightsText = insights.length > 0 ? '\n\n' + insights.join('\n') : '';

  const message = `
<b>🌊 Новая заявка с квиза!</b>

<b>🆔 ID заявки: <code>${applicationId}</code></b>
${data.source ? `📍 Источник: ${data.source}` : ''}

<b>👤 ${data.name}</b>
${data.phone ? `📞 <code>${data.phone}</code>` : ''}
${data.email ? `📧 ${data.email}` : ''}

<b>📊 Ответы:</b>
🗓 Сроки: ${data.dates || 'не указано'}
💰 Бюджет: ${data.budget || 'не указано'}
👥 Путешествуют: ${data.travelers || 'не указано'}
🌍 Регион: ${data.region || 'не указано'}
${data.priorities.length > 0 ? `⭐ Приоритеты: ${data.priorities.join(', ')}` : ''}

<b>🎯 Приоритет: ${scoring.emoji} ${scoring.priority}</b>
📈 Скоринг: ${scoring.score}/9 баллов
⏱ <b>${scoring.sla}</b>${insightsText}
`.trim();

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'HTML',
        }),
        signal: AbortSignal.timeout(5000), // 🔥 Timeout 5 секунд
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Telegram API error: ${error}`);
    }

    console.log('✅ Telegram message sent successfully');
  } catch (error) {
    console.error('❌ Failed to send to Telegram:', error);
  }
}

// 📧 Отправка на Email (с автоответом клиенту)
async function sendToEmail(
  data: QuizData, 
  scoring: ReturnType<typeof calculateScore>,
  applicationId: string
) {
  const { Resend } = await import('resend');
  const resend = new Resend(process.env.RESEND_API_KEY);
  
  const EMAIL_TO = process.env.EMAIL_TO || 'info@vontamona.com';
  const EMAIL_FROM = process.env.EMAIL_FROM || 'onboarding@resend.dev';
  const insights = getInsights(data);

  // 1️⃣ Email менеджеру
  const managerEmailBody = `
    <h2>🌊 Новая заявка с квиза</h2>
    
    <p><strong>🆔 ID заявки:</strong> ${applicationId}</p>
    ${data.source ? `<p><strong>📍 Источник:</strong> ${data.source}</p>` : ''}
    
    <h3>Контакты</h3>
    <ul>
      <li><strong>Имя:</strong> ${data.name}</li>
      ${data.phone ? `<li><strong>Телефон:</strong> ${data.phone}</li>` : ''}
      ${data.email ? `<li><strong>Email:</strong> ${data.email}</li>` : ''}
    </ul>
    
    <h3>Ответы квиза</h3>
    <ul>
      <li><strong>Сроки:</strong> ${data.dates || 'не указано'}</li>
      <li><strong>Бюджет:</strong> ${data.budget || 'не указано'}</li>
      <li><strong>Кто едет:</strong> ${data.travelers || 'не указано'}</li>
      <li><strong>Регион:</strong> ${data.region || 'не указано'}</li>
      ${data.priorities.length > 0 ? `<li><strong>Приоритеты:</strong> ${data.priorities.join(', ')}</li>` : ''}
    </ul>
    
    <h3>🎯 Оценка лида</h3>
    <p><strong>Приоритет:</strong> ${scoring.emoji} ${scoring.priority}</p>
    <p><strong>Скоринг:</strong> ${scoring.score}/9 баллов</p>
    <p><strong>SLA:</strong> ${scoring.sla}</p>
    
    ${insights.length > 0 ? `<h3>💡 Инсайты</h3><ul>${insights.map(i => `<li>${i}</li>`).join('')}</ul>` : ''}
  `;

  // 2️⃣ Автоответ клиенту
  const clientEmailBody = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #1f2937;">
      <h2 style="color: #171717; font-size: 24px; font-weight: 500; margin-bottom: 16px;">
        Здравствуйте, ${data.name}!
      </h2>
      
      <p style="margin-bottom: 16px; line-height: 1.6;">
        Благодарим вас за обращение — мы получили вашу заявку на подбор круиза.
      </p>
      
      <div style="background: #f5f5f5; padding: 20px; border-radius: 12px; margin: 24px 0;">
        <p style="margin: 0; color: #737373; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">
          Номер вашей заявки
        </p>
        <p style="margin: 0; font-family: 'Courier New', monospace; font-size: 16px; font-weight: 600; color: #171717;">
          ${applicationId}
        </p>
      </div>
      
      <p style="margin-bottom: 16px; line-height: 1.6;">
        Наш эксперт уже приступил к подбору маршрутов и лайнеров с учётом ваших пожеланий.<br>
        Мы подбираем круизы вручную, не по шаблону, поэтому уделяем внимание деталям.
      </p>
      
      <p style="font-weight: 500; margin-top: 24px; margin-bottom: 12px;">Что будет дальше:</p>
      <ul style="line-height: 1.8; padding-left: 20px; color: #404040;">
        <li>в течение 2–3 часов с вами свяжется персональный консультант</li>
        <li>мы предложим оптимальные варианты по датам, маршрутам и уровню сервиса</li>
        <li>при необходимости уточним детали, чтобы сделать подбор максимально точным</li>
      </ul>
      
      <p style="margin-top: 24px; line-height: 1.6; color: #525252;">
        Если у вас появятся вопросы или вы захотите дополнить заявку, просто ответьте на это письмо, 
        указав номер заявки — мы будем рады помочь.
      </p>
      
      <hr style="margin: 32px 0; border: none; border-top: 1px solid #e5e5e5;">
      
      <p style="color: #737373; font-size: 14px; line-height: 1.6; margin: 0;">
        С уважением,<br>
        <strong style="color: #171717;">Команда VonTamona</strong><br>
        Персональный подбор круизов
      </p>
    </div>
  `;

  try {
    // Отправка менеджеру
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 're_YOUR_API_KEY_HERE') {
      await resend.emails.send({
        from: EMAIL_FROM,
        to: EMAIL_TO,
        subject: `${scoring.emoji} ${scoring.priority} лид: ${data.name} (${applicationId})`,
        html: managerEmailBody,
      });
      
      // Автоответ клиенту
      if (data.email) {
        await resend.emails.send({
          from: EMAIL_FROM,
          to: data.email,
          subject: `Ваша заявка №${applicationId} принята — подбираем круизы!`,
          html: clientEmailBody,
        });
        console.log('✅ Client auto-reply sent to:', data.email);
      }
      
      console.log('✅ Manager email sent successfully');
    } else {
      console.log('⚠️ Resend API key not configured');
      console.log('📧 Manager email preview:', EMAIL_TO);
      if (data.email) {
        console.log('📧 Client email would be sent to:', data.email);
      }
    }
  } catch (error) {
    console.error('❌ Failed to send email:', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: QuizData = await request.json();

    // Валидация
    if (!data.name) {
      return NextResponse.json(
        { error: 'Имя обязательно' },
        { status: 400 }
      );
    }

    // 🆔 Генерация ID заявки
    const applicationId = generateApplicationId();

    // Расчёт скоринга
    const scoring = calculateScore(data);

    console.log('📊 Quiz submission:', {
      applicationId,
      name: data.name,
      source: data.source || 'не указан',
      scoring: `${scoring.emoji} ${scoring.priority} (${scoring.score}/9)`,
    });

    // 🚀 Мгновенный ответ пользователю (не ждём отправки)
    // Отправка идёт в фоне, не блокирует response
    Promise.all([
      sendToTelegram(data, scoring, applicationId),
      sendToEmail(data, scoring, applicationId),
    ]).catch(error => {
      console.error('❌ Background notification error:', error);
      // Не падаем, логируем для мониторинга
    });

    // Сразу возвращаем успех (не ждём уведомлений)
    return NextResponse.json({
      success: true,
      applicationId,
      scoring,
      message: 'Заявка успешно отправлена',
    });
  } catch (error) {
    console.error('❌ Quiz API error:', error);
    return NextResponse.json(
      { error: 'Ошибка отправки заявки' },
      { status: 500 }
    );
  }
}
