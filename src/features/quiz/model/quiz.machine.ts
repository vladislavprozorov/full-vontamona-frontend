/**
 * FSM Types — формализованная State Machine
 * 
 * Почему это Staff-level:
 * - Impossible states исключены на уровне типов
 * - Все переходы централизованы
 * - Reducer тестируется без React
 * - Бизнес-логика = чистая функция
 */

import type { Budget, Travelers, Region, DateRange, Priority } from './quiz.domain';

// ========== Steps ==========
export type QuizStep =
  | 'dates'
  | 'budget'
  | 'travelers'
  | 'region'
  | 'priorities'
  | 'contacts'
  | 'success';

// ========== Form Data (Domain Types) ==========
export interface QuizFormData {
  dateRange?: DateRange;
  budget?: Budget;
  travelers?: Travelers;
  region?: Region;
  priorities: Priority[];
  // Contacts остаются строками (это UX-данные)
  name?: string;
  phone?: string;
  email?: string;
}

// ========== State ==========
export interface QuizState {
  currentStep: QuizStep;
  formData: QuizFormData;
  applicationId?: string;
  submitError?: string;
  isSubmitting: boolean;
  // UX flags
  isReturning: boolean;
}

// ========== Events ==========
export type QuizEvent =
  | { type: 'SELECT_DATE_RANGE'; value: DateRange }
  | { type: 'SELECT_BUDGET'; value: Budget }
  | { type: 'SELECT_TRAVELERS'; value: Travelers }
  | { type: 'SELECT_REGION'; value: Region }
  | { type: 'TOGGLE_PRIORITY'; value: Priority }
  | { type: 'UPDATE_CONTACTS'; name?: string; phone?: string; email?: string }
  | { type: 'NEXT' }
  | { type: 'PREV' }
  | { type: 'SUBMIT_REQUEST' }
  | { type: 'SUBMIT_SUCCESS'; applicationId: string }
  | { type: 'SUBMIT_ERROR'; message: string }
  | { type: 'RESTORE_DRAFT'; state: QuizState }
  | { type: 'START_FRESH' };

// ========== Step Configuration ==========
export interface QuizStepConfig {
  next: QuizStep | null;
  prev: QuizStep | null;
  number: number;
}

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
