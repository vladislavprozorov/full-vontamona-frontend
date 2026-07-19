import { NextRequest, NextResponse } from "next/server";

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
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `QUIZ-${timestamp}-${random}`;
}

// 🧠 Scoring логика
function calculateScore(data: QuizData): {
  score: number;
  priority: string;
  emoji: string;
  sla: string;
} {
  let score = 0;

  // 📅 Сроки
  if (data.dates === "В ближайший месяц") score += 3;
  else if (data.dates === "Через 1-3 месяца") score += 2;
  else if (data.dates === "Через 3-6 месяцев") score += 1;

  // 💰 Бюджет
  if (data.budget === "400 000 ₽+") score += 3;
  else if (data.budget === "200 000 – 400 000 ₽") score += 3;
  else if (data.budget === "100 000 – 200 000 ₽") score += 2;
  else if (data.budget === "Пока не знаю") score += 1;

  // 👥 Кто едет
  if (data.travelers === "Пара" || data.travelers === "Семья с детьми") score += 2;
  else if (data.travelers === "Один/одна") score += 1;

  // 🌍 Регион определён
  if (data.region && data.region !== "Пока не определился") score += 1;

  // 🎯 Определяем приоритет
  let priority = "";
  let emoji = "";
  let sla = ""; // ⏱ SLA для менеджера

  if (score >= 7) {
    priority = "ГОРЯЧИЙ";
    emoji = "🔥";
    sla = "⚡ Связаться в течение 30 минут";
  } else if (score >= 4) {
    priority = "ТЁПЛЫЙ";
    emoji = "🌡";
    sla = "📞 Связаться в течение дня";
  } else {
    priority = "ХОЛОДНЫЙ";
    emoji = "❄️";
    sla = "📅 Обработать когда будет окно";
  }

  return { score, priority, emoji, sla };
}

// Формируем доп комментарии
function getInsights(data: QuizData): string[] {
  const insights: string[] = [];

  if (data.budget === "400 000 ₽+" || data.budget === "200 000 – 400 000 ₽") {
    insights.push("💎 Клиент открыт к премиальным вариантам");
  }

  if (data.dates === "Пока не определился" || data.region === "Пока не определился") {
    insights.push("🧭 Нужна консультация, клиенту важно сопровождение");
  }

  if (data.priorities.includes("Комфорт и сервис")) {
    insights.push("⭐ Акцент на премиальный сервис");
  }

  if (data.priorities.includes("Минимум детей")) {
    insights.push("🔇 Важен спокойный отдых без детей");
  }

  return insights;
}

// 📱 Отправка в Telegram
async function sendToTelegram(
  data: QuizData,
  scoring: ReturnType<typeof calculateScore>,
  applicationId: string,
) {
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn("⚠️ Telegram credentials not configured");
    return;
  }

  const insights = getInsights(data);
  const insightsText = insights.length > 0 ? "\n\n" + insights.join("\n") : "";

  const message = `
<b>🌊 Новая заявка с квиза!</b>

<b>🆔 ID заявки: <code>${applicationId}</code></b>
${data.source ? `📍 Источник: ${data.source}` : ""}

<b>👤 ${data.name}</b>
${data.phone ? `📞 <code>${data.phone}</code>` : ""}
${data.email ? `📧 ${data.email}` : ""}

<b>📊 Ответы:</b>
🗓 Сроки: ${data.dates || "не указано"}
💰 Бюджет: ${data.budget || "не указано"}
👥 Путешествуют: ${data.travelers || "не указано"}
🌍 Регион: ${data.region || "не указано"}
${data.priorities.length > 0 ? `⭐ Приоритеты: ${data.priorities.join(", ")}` : ""}

<b>🎯 Приоритет: ${scoring.emoji} ${scoring.priority}</b>
📈 Скоринг: ${scoring.score}/9 баллов
⏱ <b>${scoring.sla}</b>${insightsText}
`.trim();

  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "HTML",
      }),
      signal: AbortSignal.timeout(5000), // 🔥 Timeout 5 секунд
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Telegram API error: ${error}`);
    }

    console.log("✅ Telegram message sent successfully");
  } catch (error) {
    console.error("❌ Failed to send to Telegram:", error);
  }
}

// 📧 Отправка на Email через SMTP (с автоответом клиенту)
async function sendToEmail(
  data: QuizData,
  scoring: ReturnType<typeof calculateScore>,
  applicationId: string,
) {
  const nodemailer = (await import("nodemailer")).default;

  const SMTP_HOST = process.env.SMTP_HOST;
  const SMTP_PORT = Number(process.env.SMTP_PORT) || 465;
  const SMTP_USER = process.env.SMTP_USER;
  const SMTP_PASS = process.env.SMTP_PASS;

  const EMAIL_TO = process.env.EMAIL_TO || SMTP_USER || "info@vontamona.com";
  const EMAIL_FROM = process.env.EMAIL_FROM || SMTP_USER || "";
  const insights = getInsights(data);

  // 1️⃣ Email менеджеру
  const managerEmailBody = `
    <h2>🌊 Новая заявка с квиза</h2>
    
    <p><strong>🆔 ID заявки:</strong> ${applicationId}</p>
    ${data.source ? `<p><strong>📍 Источник:</strong> ${data.source}</p>` : ""}
    
    <h3>Контакты</h3>
    <ul>
      <li><strong>Имя:</strong> ${data.name}</li>
      ${data.phone ? `<li><strong>Телефон:</strong> ${data.phone}</li>` : ""}
      ${data.email ? `<li><strong>Email:</strong> ${data.email}</li>` : ""}
    </ul>
    
    <h3>Ответы квиза</h3>
    <ul>
      <li><strong>Сроки:</strong> ${data.dates || "не указано"}</li>
      <li><strong>Бюджет:</strong> ${data.budget || "не указано"}</li>
      <li><strong>Кто едет:</strong> ${data.travelers || "не указано"}</li>
      <li><strong>Регион:</strong> ${data.region || "не указано"}</li>
      ${data.priorities.length > 0 ? `<li><strong>Приоритеты:</strong> ${data.priorities.join(", ")}</li>` : ""}
    </ul>
    
    <h3>🎯 Оценка лида</h3>
    <p><strong>Приоритет:</strong> ${scoring.emoji} ${scoring.priority}</p>
    <p><strong>Скоринг:</strong> ${scoring.score}/9 баллов</p>
    <p><strong>SLA:</strong> ${scoring.sla}</p>
    
    ${insights.length > 0 ? `<h3>💡 Инсайты</h3><ul>${insights.map((i) => `<li>${i}</li>`).join("")}</ul>` : ""}
  `;

  // Краткое резюме ответов клиента для письма
  const summaryRows = [
    ["🗓 Сроки", data.dates],
    ["👥 Путешествуют", data.travelers],
    ["🌍 Регион", data.region],
    ["⭐ Приоритеты", data.priorities.length > 0 ? data.priorities.join(", ") : ""],
  ]
    .filter(([, v]) => v)
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding: 6px 0; color: #737373; font-size: 14px; white-space: nowrap; vertical-align: top;">${label}</td>
          <td style="padding: 6px 0 6px 16px; color: #171717; font-size: 14px;">${value}</td>
        </tr>`,
    )
    .join("");

  // 2️⃣ Автоответ клиенту
  const clientEmailBody = `
  <div style="background: #f0f0f0; padding: 32px 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e5e5e5;">
      <!-- Шапка -->
      <tr>
        <td style="background: #171717; padding: 32px 40px; text-align: center;">
          <div style="color: #ffffff; font-size: 22px; font-weight: 600; letter-spacing: 0.5px;">Вонтамона</div>
          <div style="color: #a3a3a3; font-size: 13px; margin-top: 4px;">Персональный подбор круизов</div>
        </td>
      </tr>
      <!-- Тело -->
      <tr>
        <td style="padding: 36px 40px;">
          <h1 style="margin: 0 0 16px; color: #171717; font-size: 22px; font-weight: 600;">
            Здравствуйте, ${data.name}!
          </h1>
          <p style="margin: 0 0 20px; color: #404040; font-size: 15px; line-height: 1.6;">
            Спасибо за заявку - мы получили её и уже приступили к подбору круиза
            специально для вас. Мы подбираем маршруты вручную, не по шаблону,
            поэтому уделяем внимание деталям.
          </p>

          <!-- Номер заявки -->
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background: #f5f5f5; border-radius: 12px; margin: 0 0 24px;">
            <tr>
              <td style="padding: 18px 20px;">
                <div style="color: #737373; font-size: 11px; text-transform: uppercase; letter-spacing: 0.6px; margin-bottom: 6px;">Номер вашей заявки</div>
                <div style="font-family: 'Courier New', monospace; font-size: 17px; font-weight: 700; color: #171717;">${applicationId}</div>
              </td>
            </tr>
          </table>

          ${
            summaryRows
              ? `<div style="color: #171717; font-size: 14px; font-weight: 600; margin-bottom: 8px;">Ваша заявка:</div>
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin: 0 0 24px;">${summaryRows}</table>`
              : ""
          }

          <!-- Что дальше -->
          <div style="color: #171717; font-size: 14px; font-weight: 600; margin-bottom: 10px;">Что будет дальше:</div>
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin: 0 0 24px;">
            <tr><td style="padding: 4px 0; color: #404040; font-size: 14px; line-height: 1.6;">✓&nbsp;&nbsp;в течение 2–3 часов с вами свяжется персональный консультант</td></tr>
            <tr><td style="padding: 4px 0; color: #404040; font-size: 14px; line-height: 1.6;">✓&nbsp;&nbsp;предложим оптимальные варианты по датам, маршрутам и уровню сервиса</td></tr>
            <tr><td style="padding: 4px 0; color: #404040; font-size: 14px; line-height: 1.6;">✓&nbsp;&nbsp;при необходимости уточним детали для максимально точного подбора</td></tr>
          </table>

          <p style="margin: 0; color: #525252; font-size: 14px; line-height: 1.6;">
            Появились вопросы или хотите дополнить заявку? Просто ответьте на это
            письмо, указав номер заявки — будем рады помочь.
          </p>
        </td>
      </tr>
      <!-- Подвал -->
      <tr>
        <td style="padding: 24px 40px; border-top: 1px solid #e5e5e5;">
          <p style="margin: 0; color: #737373; font-size: 13px; line-height: 1.6;">
            С уважением,<br>
            <strong style="color: #171717;">Команда Вонтамона</strong><br>
            Персональный подбор круизов
          </p>
        </td>
      </tr>
    </table>
  </div>
  `;

  // Проверяем, что SMTP настроен
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.warn("⚠️ SMTP credentials not configured (SMTP_HOST / SMTP_USER / SMTP_PASS)");
    console.log("📧 Manager email would be sent to:", EMAIL_TO);
    if (data.email) {
      console.log("📧 Client email would be sent to:", data.email);
    }
    return;
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465, // true для 465 (SSL), false для 587 (STARTTLS)
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
    // ⏱ Таймауты — чтобы запрос не висел вечно, если порт недоступен
    connectionTimeout: 10000, // 10с на установку TCP-соединения
    greetingTimeout: 10000, // 10с на приветствие сервера
    socketTimeout: 15000, // 15с на неактивность сокета
  });

  try {
    // 1️⃣ Отправка менеджеру
    await transporter.sendMail({
      from: EMAIL_FROM,
      to: EMAIL_TO,
      replyTo: data.email || undefined,
      subject: `${scoring.emoji} ${scoring.priority} лид: ${data.name} (${applicationId})`,
      html: managerEmailBody,
    });
    console.log("✅ Manager email sent successfully to:", EMAIL_TO);

    // 2️⃣ Автоответ клиенту
    if (data.email) {
      await transporter.sendMail({
        from: EMAIL_FROM,
        to: data.email,
        subject: `Ваша заявка №${applicationId} принята — подбираем круизы!`,
        html: clientEmailBody,
      });
      console.log("✅ Client auto-reply sent to:", data.email);
    }
  } catch (error) {
    console.error("❌ Failed to send email:", error);
    throw error; // пробрасываем, чтобы POST-обработчик залогировал
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: QuizData = await request.json();

    // Валидация
    if (!data.name) {
      return NextResponse.json({ error: "Имя обязательно" }, { status: 400 });
    }

    // 🆔 Генерация ID заявки
    const applicationId = generateApplicationId();

    // Расчёт скоринга
    const scoring = calculateScore(data);

    console.log("📊 Quiz submission:", {
      applicationId,
      name: data.name,
      source: data.source || "не указан",
      scoring: `${scoring.emoji} ${scoring.priority} (${scoring.score}/9)`,
    });

    // 🚀 КРИТИЧНО: Отправляем уведомления СИНХРОННО (await)
    // Иначе Vercel может прервать execution до отправки в Telegram
    try {
      await sendToTelegram(data, scoring, applicationId);
      console.log("✅ Telegram notification sent");
    } catch (error) {
      console.error("❌ Telegram error:", error);
      // Продолжаем даже если Telegram упал
    }

    try {
      await sendToEmail(data, scoring, applicationId);
      console.log("✅ Email notification sent");
    } catch (error) {
      console.error("❌ Email error:", error);
      // Продолжаем даже если Email упал
    }

    // Возвращаем успех после отправки уведомлений
    return NextResponse.json({
      success: true,
      applicationId,
      scoring,
      message: "Заявка успешно отправлена",
    });
  } catch (error) {
    console.error("❌ Quiz API error:", error);
    return NextResponse.json({ error: "Ошибка отправки заявки" }, { status: 500 });
  }
}
