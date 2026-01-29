/**
 * 💎 useQuiz — React Integration Layer
 * 
 * Ответственность: Координация между React и бизнес-логикой
 * Thin orchestrator — никакой бизнес-логики
 */

import { useReducer, useEffect, useState, useCallback } from 'react';
import {
  quizReducer,
  initialState,
  loadDraft,
  saveDraftDebounced,
  saveDraftImmediate,
  submitQuiz,
  MOTION, // 🔥 Import motion tokens
  type QuizState,
  type QuizEvent,
  type Priority,
} from './model';

export function useQuiz() {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const [selectingOption, setSelectingOption] = useState<any>(null);
  const [showRestoreDialog, setShowRestoreDialog] = useState(false);

  // Load draft on mount
  useEffect(() => {
    const draft = loadDraft();
    if (draft) {
      setShowRestoreDialog(true);
    }
  }, []);

  // Auto-save (debounced для performance)
  useEffect(() => {
    saveDraftDebounced(state);
  }, [state]);

  // Immediate save on unmount (не потеряем данные)
  useEffect(() => {
    return () => {
      saveDraftImmediate(state);
    };
  }, [state]);

  // Restore draft
  const restoreDraft = useCallback(() => {
    const draft = loadDraft();
    if (draft) {
      dispatch({ type: 'RESTORE_DRAFT', state: draft.state });
      setShowRestoreDialog(false);
    }
  }, []);

  // Start fresh
  const startFresh = useCallback(() => {
    dispatch({ type: 'START_FRESH' });
    setShowRestoreDialog(false);
  }, []);

  // Navigation
  const goToNextStep = useCallback(() => {
    dispatch({ type: 'NEXT' });
  }, []);

  const goToPrevStep = useCallback(() => {
    dispatch({ type: 'PREV' });
  }, []);

  // Option selection with visual feedback
  const handleOptionSelect = useCallback((eventType: QuizEvent['type'], value: any) => {
    // 🎯 Haptic feedback (вибрация на поддерживаемых устройствах)
    if ('vibrate' in navigator) {
      navigator.vibrate(10); // Короткая вибрация 10ms
    }
    
    setSelectingOption(value);
    
    setTimeout(() => {
      dispatch({ type: eventType, value } as QuizEvent);
      setSelectingOption(null);
    }, MOTION.selectDelay); // � UX контракт из motion tokens
  }, []);

  // Priority toggle
  const togglePriority = useCallback((priority: Priority) => {
    dispatch({ type: 'TOGGLE_PRIORITY', value: priority });
  }, []);

  // Submit handler
  const submitContacts = useCallback(async (contactsData: { name: string; phone?: string; email?: string }) => {
    // 🔥 Сначала подготовим полные данные
    const completeFormData = {
      ...state.formData,
      name: contactsData.name,
      phone: contactsData.phone,
      email: contactsData.email,
    };

    // Update contacts в state
    dispatch({
      type: 'UPDATE_CONTACTS',
      name: contactsData.name,
      phone: contactsData.phone,
      email: contactsData.email,
    });

    // Submit с ПОЛНЫМИ данными
    dispatch({ type: 'SUBMIT_REQUEST' });
    
    // 🎯 Smart delay для видимости спиннера (UX: perceived performance)
    // Если API быстрый → добавляем задержку
    // Если медленный → не тормозим дополнительно
    const start = performance.now();
    const result = await submitQuiz(completeFormData);
    const elapsed = performance.now() - start;
    
    if (elapsed < MOTION.minSubmitDelay) {
      await new Promise(resolve => setTimeout(resolve, MOTION.minSubmitDelay - elapsed));
    }

    if (result.success) {
      dispatch({ type: 'SUBMIT_SUCCESS', applicationId: result.applicationId! });
    } else {
      dispatch({ type: 'SUBMIT_ERROR', message: result.error! });
    }
  }, [state.formData]);

  // Retry submit
  const retrySubmit = useCallback((contactsData: { name: string; phone?: string; email?: string }) => {
    submitContacts(contactsData);
  }, [submitContacts]);

  return {
    // State
    currentStep: state.currentStep,
    formData: state.formData,
    isSubmitting: state.isSubmitting,
    applicationId: state.applicationId,
    submitError: state.submitError,
    isReturning: state.isReturning,
    selectingOption,
    showRestoreDialog,
    
    // Actions
    dispatch,
    goToNextStep,
    goToPrevStep,
    handleOptionSelect,
    togglePriority,
    submitContacts,
    retrySubmit,
    restoreDraft,
    startFresh,
  };
}
