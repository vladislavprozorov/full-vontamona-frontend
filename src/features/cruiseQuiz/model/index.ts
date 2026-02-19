/**
 * 💎 Model Layer — Public API
 *
 * Чистые экспорты для использования в UI
 */

export type {
  DateRange,
  DomainOption,
  Priority,
  Region,
  Travelers,
} from "./quiz.domain";
export {
  DATE_RANGE_OPTIONS,
  getLabelForDateRange,
  getLabelForPriority,
  getLabelForRegion,
  getLabelForTravelers,
  PRIORITY_OPTIONS,
  REGION_OPTIONS,
  TRAVELERS_OPTIONS,
} from "./quiz.domain";
// Types
export type {
  QuizEvent,
  QuizFormData,
  QuizState,
  QuizStep,
} from "./quiz.machine";
export { getDuration, MOTION } from "./quiz.motion";
export type { SavedDraft } from "./quiz.persistence";
// Effects
export { clearDraft, loadDraft, saveDraftDebounced, saveDraftImmediate } from "./quiz.persistence";
// Reducer
export { initialState, quizReducer } from "./quiz.reducer";
// Selectors
export {
  canGoBack,
  canGoNext,
  canSubmit,
  getCurrentStepNumber,
  getProgress,
} from "./quiz.selectors";
export type {
  QuizStepConfig,
  QuizStepRenderProps,
  SelectingOption,
} from "./quiz.steps.config";
// Constants
export {
  QUIZ_STEPS,
  TOTAL_STEPS,
} from "./quiz.steps.config";
export type { SubmitResult } from "./quiz.submit";
export { submitQuiz } from "./quiz.submit";
// Business Logic
export { suggestPriorities } from "./quiz.suggestions";
export type { ContactsFormData } from "./quiz.validation";
// Validation
export { contactsSchema } from "./quiz.validation";
export type { SuccessMessage } from "./success.copy";
export { getPersonalizedSuccessMessage } from "./success.copy";
