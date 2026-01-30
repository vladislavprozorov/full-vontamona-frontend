'use client';

import { useQuiz } from './quiz.hooks';
import { QuizLayout } from './QuizLayout';
import { SuccessScreen } from './SuccessScreen';
import { QUIZ_STEPS } from './model';

export function QuizForm() {
  const {
    currentStep,
    formData,
    isSubmitting,
    applicationId,
    submitError,
    isReturning,
    selectingOption,
    showRestoreDialog,
    goToNextStep,
    goToPrevStep,
    handleOptionSelect,
    togglePriority,
    submitContacts,
    retrySubmit,
    restoreDraft,
    startFresh,
  } = useQuiz();

  // ========== SUCCESS SCREEN ==========
  if (currentStep === 'success') {
    return (
      <SuccessScreen 
        applicationId={applicationId}
        phone={formData.phone}
        email={formData.email}
        formData={formData}
      />
    );
  }

  // ========== RENDER STEP FROM CONFIG ==========
  const stepConfig = QUIZ_STEPS[currentStep];
  const stepContent = stepConfig.render({
    state: { 
      currentStep, 
      formData, 
      isSubmitting, 
      submitError, 
      applicationId,
      isReturning,
    },
    onOptionSelect: handleOptionSelect,
    onTogglePriority: togglePriority,
    onNext: goToNextStep,
    onSubmit: submitContacts,
    onRetry: retrySubmit,
    onBack: goToPrevStep,
    selectingOption,
  });

  // ========== RENDER ==========
  return (
    <>
      {/* Спокойный диалог восстановления (не кричащая модалка) */}
      {showRestoreDialog && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-700 p-6 max-w-md w-full animate-in fade-in duration-200">
            <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
              Продолжить заполнение?
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-5">
              У вас есть незавершённая заявка. Хотите продолжить с того места, где остановились?
            </p>
            <div className="flex gap-3">
              <button
                onClick={restoreDraft}
                className="flex-1 px-4 py-2.5 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-sm font-medium rounded-xl hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all active:scale-[0.98]"
              >
                Продолжить
              </button>
              <button
                onClick={startFresh}
                className="flex-1 px-4 py-2.5 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 text-sm font-medium rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all active:scale-[0.98]"
              >
                Начать заново
              </button>
            </div>
          </div>
        </div>
      )}
      
      <QuizLayout
        currentStep={currentStep}
        onBack={goToPrevStep}
        onNext={currentStep === 'priorities' ? goToNextStep : undefined}
        isReturning={isReturning}
      >
        {stepContent}
      </QuizLayout>
    </>
  );
}
