/**
 * 💎 Quiz Suggestions Layer — Principal-level
 * 
 * Ответственность: Smart defaults, contextual hints
 * Бизнес-логика для UX-подсказок
 * 
 * UI НЕ работает со строками — только с domain types
 */

import type { QuizFormData } from './quiz.machine';
import type { Priority } from './quiz.domain';

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

  return suggestions;
}