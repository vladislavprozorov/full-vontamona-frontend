/**
 * 💎 Quiz Suggestions Layer — Principal-level
 * 
 * Ответственность: Smart defaults, contextual hints
 * Бизнес-логика для UX-подсказок
 * 
 * UI НЕ работает со строками — только с domain types
 */

import type { QuizFormData, QuizStep } from './quiz.machine';
import type { Priority } from './quiz.domain';

export interface ContextualHint {
  show: boolean;
  message: string;
}

/**
 * Получить контекстную подсказку для текущего шага
 */
export function getContextualHint(
  step: QuizStep,
  formData: QuizFormData
): ContextualHint | null {
  // Region hints для premium budget
  if (step === 'region') {
    const isPremium = formData.budget === 'PREMIUM' || formData.budget === 'HIGH';
    if (isPremium) {
      return {
        show: true,
        message:
          'При таком бюджете рекомендуем Средиземноморье или Карибы — лучшие лайнеры и сервис премиум-класса',
      };
    }
  }

  // Добавим больше hints по необходимости
  return null;
}

/**
 * 🔥 Умные дефолты на основе выборов
 * Возвращает Priority[] — UI сам решит как рендерить
 */
export function suggestPriorities(formData: QuizFormData): Priority[] {
  const suggestions: Priority[] = [];

  // Если FAMILY → suggest комфорт (детские программы важны)
  if (formData.travelers === 'FAMILY') {
    suggestions.push('COMFORT');
  }

  // Если PREMIUM → suggest комфорт
  if (formData.budget === 'PREMIUM') {
    if (!suggestions.includes('COMFORT')) {
      suggestions.push('COMFORT');
    }
  }

  return suggestions;
}