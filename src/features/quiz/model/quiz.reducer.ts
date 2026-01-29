/**
 * 💎 Quiz Reducer — Principal-level FSM
 * 
 * Преимущества:
 * - Невозможно попасть в success без submit
 * - Все переходы в одном месте (goNext helper)
 * - Чистая функция → легко тестировать
 * - Compile-time гарантии
 */

import type { QuizState, QuizEvent } from './quiz.machine';
import { QUIZ_STEPS } from './quiz.machine';

export const initialState: QuizState = {
  currentStep: 'dates',
  formData: {
    priorities: [],
  },
  isSubmitting: false,
  isReturning: false,
};

/**
 * 🔥 Transition Helper — одна точка перехода
 */
function goNext(state: QuizState): QuizState {
  const next = QUIZ_STEPS[state.currentStep].next;
  return next
    ? { ...state, currentStep: next, isReturning: false }
    : state;
}

/**
 * Reducer — единственный источник истины для переходов
 */
export function quizReducer(state: QuizState, event: QuizEvent): QuizState {
  switch (event.type) {
    // ========== Field Updates ==========
    case 'SELECT_DATE_RANGE':
      return goNext({
        ...state,
        formData: { ...state.formData, dateRange: event.value },
      });

    case 'SELECT_BUDGET':
      return goNext({
        ...state,
        formData: { ...state.formData, budget: event.value },
      });

    case 'SELECT_TRAVELERS':
      return goNext({
        ...state,
        formData: { ...state.formData, travelers: event.value },
      });

    case 'SELECT_REGION':
      return goNext({
        ...state,
        formData: { ...state.formData, region: event.value },
      });

    case 'TOGGLE_PRIORITY': {
      const current = state.formData.priorities;
      const updated = current.includes(event.value)
        ? current.filter((p) => p !== event.value)
        : [...current, event.value];
      return {
        ...state,
        formData: { ...state.formData, priorities: updated },
      };
    }

    case 'UPDATE_CONTACTS':
      return {
        ...state,
        formData: {
          ...state.formData,
          name: event.name ?? state.formData.name,
          phone: event.phone ?? state.formData.phone,
          email: event.email ?? state.formData.email,
        },
      };

    // ========== Navigation ==========
    case 'NEXT': {
      const nextStep = QUIZ_STEPS[state.currentStep].next;
      if (!nextStep) return state;
      
      // 🔥 CRITICAL: нельзя попасть в success через NEXT
      if (nextStep === 'success') return state;
      
      return {
        ...state,
        currentStep: nextStep,
        isReturning: false,
      };
    }

    case 'PREV': {
      const prevStep = QUIZ_STEPS[state.currentStep].prev;
      if (!prevStep) return state;
      return {
        ...state,
        currentStep: prevStep,
        isReturning: true,
      };
    }

    // ========== Submit Flow ==========
    case 'SUBMIT_REQUEST':
      return {
        ...state,
        isSubmitting: true,
        submitError: undefined,
      };

    case 'SUBMIT_SUCCESS':
      return {
        ...state,
        isSubmitting: false,
        applicationId: event.applicationId,
        currentStep: 'success',
        submitError: undefined,
      };

    case 'SUBMIT_ERROR':
      return {
        ...state,
        isSubmitting: false,
        submitError: event.message,
      };

    // ========== Session Restoration ==========
    case 'RESTORE_DRAFT':
      return {
        ...event.state,
        isReturning: false,
      };

    case 'START_FRESH':
      return {
        ...initialState,
      };

    default:
      return state;
  }
}
