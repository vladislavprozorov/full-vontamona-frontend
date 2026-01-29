/**
 * 💎 useQuiz — React Integration Layer
 * 
 * Ответственность: Координация между React и бизнес-логикой
 * Thin orchestrator — никакой бизнес-логики
 */

import { useReducer, useEffect, useState } from 'react';
import {
  quizReducer,
  initialState,
  loadDraft,
  saveDraft,
  submitQuiz,
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

  // Auto-save
  useEffect(() => {
    saveDraft(state);
  }, [state]);

  // Restore draft
  const restoreDraft = () => {
    const draft = loadDraft();
    if (draft) {
      dispatch({ type: 'RESTORE_DRAFT', state: draft.state });
      setShowRestoreDialog(false);
    }
  };

  // Start fresh
  const startFresh = () => {
    dispatch({ type: 'START_FRESH' });
    setShowRestoreDialog(false);
  };

  // Navigation
  const goToNextStep = () => {
    dispatch({ type: 'NEXT' });
  };

  const goToPrevStep = () => {
    dispatch({ type: 'PREV' });
  };

  // Option selection with visual feedback
  const handleOptionSelect = (eventType: QuizEvent['type'], value: any) => {
    setSelectingOption(value);
    
    setTimeout(() => {
      dispatch({ type: eventType, value } as QuizEvent);
      setSelectingOption(null);
    }, 200); // micro-confirmation delay
  };

  // Priority toggle
  const togglePriority = (priority: Priority) => {
    dispatch({ type: 'TOGGLE_PRIORITY', value: priority });
  };

  // Submit handler
  const submitContacts = async (contactsData: { name: string; phone?: string; email?: string }) => {
    // Update contacts first
    dispatch({
      type: 'UPDATE_CONTACTS',
      name: contactsData.name,
      phone: contactsData.phone,
      email: contactsData.email,
    });

    // Submit
    dispatch({ type: 'SUBMIT_REQUEST' });
    
    const result = await submitQuiz(state.formData);

    if (result.success) {
      dispatch({ type: 'SUBMIT_SUCCESS', applicationId: result.applicationId! });
    } else {
      dispatch({ type: 'SUBMIT_ERROR', message: result.error! });
    }
  };

  // Retry submit
  const retrySubmit = (contactsData: { name: string; phone?: string; email?: string }) => {
    submitContacts(contactsData);
  };

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
