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
} from './quiz.machine';

export type {
  QuizStepConfig,
  QuizStepRenderProps,
  SelectingOption,
} from './quiz.steps.config';

export type {
  Travelers,
  Region,
  DateRange,
  Priority,
  DomainOption,
} from './quiz.domain';

export type { SuccessMessage } from './success.copy';
export type { SavedDraft } from './quiz.persistence';
export type { SubmitResult } from './quiz.submit';
export type { ContactsFormData } from './quiz.validation';

// Constants
export {
  QUIZ_STEPS,
  TOTAL_STEPS,
} from './quiz.steps.config';

export {
  TRAVELERS_OPTIONS,
  REGION_OPTIONS,
  DATE_RANGE_OPTIONS,
  PRIORITY_OPTIONS,
  getLabelForTravelers,
  getLabelForRegion,
  getLabelForDateRange,
  getLabelForPriority,
} from './quiz.domain';

export { MOTION, getDuration } from './quiz.motion';

// Reducer
export { quizReducer, initialState } from './quiz.reducer';

// Effects
export { saveDraftDebounced, saveDraftImmediate, loadDraft, clearDraft } from './quiz.persistence';
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
export { suggestPriorities } from './quiz.suggestions';
export { getPersonalizedSuccessMessage } from './success.copy';

// Validation
export { contactsSchema } from './quiz.validation';
