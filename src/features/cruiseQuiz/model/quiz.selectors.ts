/**
 * Quiz Selectors Layer
 *
 * Ответственность: Derived state
 * Вычисления на основе текущего состояния
 */

import type { QuizState } from "./quiz.machine";
import { QUIZ_STEPS } from "./quiz.steps.config";

/**
 * Можно ли перейти вперёд?
 */
export function canGoNext(state: QuizState): boolean {
  return QUIZ_STEPS[state.currentStep].next !== null;
}

/**
 * Можно ли вернуться назад?
 */
export function canGoBack(state: QuizState): boolean {
  return QUIZ_STEPS[state.currentStep].prev !== null;
}

/**
 * Прогресс квиза (0-100)
 */
export function getProgress(state: QuizState): number {
  const config = QUIZ_STEPS[state.currentStep];
  if (config.number === 7) return 100; // success
  return Math.round((config.number / 6) * 100);
}

/**
 * Текущий номер шага для UI
 */
export function getCurrentStepNumber(state: QuizState): number {
  return QUIZ_STEPS[state.currentStep].number;
}

/**
 * Заполнены ли контакты для submit?
 */
export function canSubmit(state: QuizState): boolean {
  const { name, phone, email } = state.formData;
  return Boolean(name && phone && email);
}
