'use client';

import { useQuiz } from './quiz.hooks';
import { QuizLayout } from './QuizLayout';
import { SuccessScreen } from './SuccessScreen';
import { DatesStep } from './steps/DatesStep';
import { BudgetStep } from './steps/BudgetStep';
import { TravelersStep } from './steps/TravelersStep';
import { RegionStep } from './steps/RegionStep';
import { PrioritiesStep } from './steps/PrioritiesStep';
import { ContactsStep } from './steps/ContactsStep';

export function QuizForm() {
  const {
    currentStep,
    formData,
    isSubmitting,
    applicationId,
    submitError,
    isReturning,
    selectingOption,
    goToNextStep,
    goToPrevStep,
    handleOptionSelect,
    togglePriority,
    submitContacts,
    retrySubmit,
    getSuggestedPriorities,
  } = useQuiz();

  // ========== SUCCESS SCREEN ==========
  if (currentStep === 'success') {
    return (
      <SuccessScreen 
        applicationId={applicationId}
        phone={formData.phone}
        email={formData.email}
      />
    );
  }

  // ========== STEPS MAP ==========
  const stepsMap = {
    dates: <DatesStep onSelect={(value) => handleOptionSelect('dates', value)} selectedValue={formData.dates} selectingValue={selectingOption} />,
    budget: <BudgetStep onSelect={(value) => handleOptionSelect('budget', value)} selectedValue={formData.budget} selectingValue={selectingOption} />,
    travelers: <TravelersStep onSelect={(value) => handleOptionSelect('travelers', value)} selectedValue={formData.travelers} selectingValue={selectingOption} />,
    region: <RegionStep onSelect={(value) => handleOptionSelect('region', value)} selectedValue={formData.region} selectingValue={selectingOption} />,
    priorities: (
      <PrioritiesStep 
        selectedPriorities={formData.priorities}
        onToggle={togglePriority}
        onNext={goToNextStep}
        suggestedPriorities={getSuggestedPriorities()}
      />
    ),
    contacts: (
      <ContactsStep 
        onSubmit={submitContacts}
        isSubmitting={isSubmitting}
        error={submitError}
        onRetry={retrySubmit}
        onBack={goToPrevStep}
      />
    ),
  };

  // ========== RENDER ==========
  return (
    <QuizLayout
      currentStep={currentStep}
      onBack={goToPrevStep}
      onNext={currentStep === 'priorities' ? goToNextStep : undefined}
      isReturning={isReturning}
    >
      {stepsMap[currentStep as keyof typeof stepsMap]}
    </QuizLayout>
  );
}
