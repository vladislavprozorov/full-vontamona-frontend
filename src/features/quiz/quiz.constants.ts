import { QuizStep, QuizStepConfig } from './quiz.types';

// ========== FSM Configuration ==========
export const QUIZ_STEPS: Record<QuizStep, QuizStepConfig> = {
  dates: { next: 'budget', prev: null, number: 1 },
  budget: { next: 'travelers', prev: 'dates', number: 2 },
  travelers: { next: 'region', prev: 'budget', number: 3 },
  region: { next: 'priorities', prev: 'travelers', number: 4 },
  priorities: { next: 'contacts', prev: 'region', number: 5 },
  contacts: { next: 'success', prev: 'priorities', number: 6 },
  success: { next: null, prev: null, number: 7 },
};

export const TOTAL_STEPS = 6;

// ========== Options ==========
export const OPTIONS = {
  dates: [
    'В ближайший месяц',
    'Через 1-3 месяца',
    'Через 3-6 месяцев',
    'Более чем через полгода',
    'Пока не определился',
  ],
  budget: [
    'До 100 000 ₽',
    '100 000 – 200 000 ₽',
    '200 000 – 400 000 ₽',
    '400 000 ₽+',
    'Пока не знаю',
  ],
  travelers: [
    'Один/одна',
    'Пара или семья без детей',
    'Семья с детьми',
    'Компания друзей',
    'Группа',
  ],
  region: [
    'Средиземное море',
    'Северная Европа и фьорды',
    'Карибы',
    'Азия',
    'Экзотика (Австралия, Южная Америка, Африка, Океания)',
    'Пока не определился',
  ],
  priorities: [
    'Комфорт и сервис',
    'Спокойный отдых',
    'Экскурсии',
    'Развлечения',
    'Минимум детей',
    'Цена',
    'Пока не определился',
  ],
} as const;
