/**
 * Success Screen Copy
 * 
 * Ответственность: Персонализированные тексты
 * UI только рендерит, не содержит бизнес-логику
 */

import type { QuizFormData } from './quiz.machine';

export interface SuccessMessage {
  title: string;
  subtitle: string;
  timing: string;
}

/**
 * Получить персонализированное сообщение на основе выборов
 */
export function getPersonalizedSuccessMessage(formData: QuizFormData): SuccessMessage {
  // Premium бюджет
  if (formData.budget === 'PREMIUM') {
    return {
      title: 'Отличный выбор премиум-класса',
      subtitle: 'Наш luxury-консультант свяжется с вами в течение 30 минут',
      timing: '30 минут',
    };
  }

  // Семья с детьми
  if (formData.travelers === 'FAMILY') {
    return {
      title: 'Семейное приключение начинается',
      subtitle: 'Подберём лайнер с лучшими детскими программами',
      timing: '2–3 часа',
    };
  }

  // Экзотические направления
  if (formData.region === 'EXOTIC') {
    return {
      title: 'Готовим необычное путешествие',
      subtitle: 'Наш эксперт по экзотическим маршрутам уже изучает варианты',
      timing: '2–3 часа',
    };
  }

  // Высокие приоритеты комфорта
  if (formData.priorities?.includes('COMFORT')) {
    return {
      title: 'Ценим ваш вкус к комфорту',
      subtitle: 'Подберём только те лайнеры, где сервис на высоте',
      timing: '2–3 часа',
    };
  }

  // Стандартное сообщение
  return {
    title: 'Благодарим за доверие',
    subtitle: 'Мы подбираем круизы вручную, не по шаблону',
    timing: '2–3 часа',
  };
}
