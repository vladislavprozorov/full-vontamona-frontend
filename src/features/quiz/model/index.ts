/**
 * 💎 Model Layer — Public API
 * 
 * Чистые экспорты для использования в UI
 */

// Types
export type {
  QuizStep,
  QuizFormData,
  QuizState,
  QuizEvent,
  QuizStepConfig,
} from './quiz.machine';

export type {
  Budget,
  Travelers,
  Region,
  DateRange,
  Priority,
  DomainOption,
} from './quiz.domain';

export type { SuccessMessage } from './success.copy';
export type { ContextualHint } from './quiz.suggestions';
export type { SavedDraft } from './quiz.persistence';
export type { SubmitResult } from './quiz.submit';

// Constants
export {
  QUIZ_STEPS,
  TOTAL_STEPS,
} from './quiz.machine';

export {
  BUDGET_OPTIONS,
  TRAVELERS_OPTIONS,
  REGION_OPTIONS,
  DATE_RANGE_OPTIONS,
  PRIORITY_OPTIONS,
  getLabelForBudget,
  getLabelForTravelers,
  getLabelForRegion,
  getLabelForDateRange,
  getLabelForPriority,
} from './quiz.domain';

export { MOTION, getDuration } from './quiz.motion';

// Reducer
export { quizReducer, initialState } from './quiz.reducer';

// Effects
export { saveDraft, loadDraft, clearDraft } from './quiz.persistence';
export { submitQuiz } from './quiz.submit';

// Selectors
export {
  canGoNext,
  canGoBack,
  getProgress,
  getCurrentStepNumber,
  canSubmit,
} from './quiz.selectors';

// Business Logic
export { getContextualHint, suggestPriorities } from './quiz.suggestions';
export { getPersonalizedSuccessMessage } from './success.copy';
