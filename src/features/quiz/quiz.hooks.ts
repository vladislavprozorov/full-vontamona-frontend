import { useState } from 'react';
import { QuizStep, QuizFormData } from './quiz.types';
import { QUIZ_STEPS } from './quiz.constants';

export function useQuiz() {
  const [currentStep, setCurrentStep] = useState<QuizStep>('dates');
  const [formData, setFormData] = useState<QuizFormData>({
    priorities: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationId, setApplicationId] = useState<string>('');
  const [submitError, setSubmitError] = useState<string>('');
  const [isReturning, setIsReturning] = useState(false);
  const [selectingOption, setSelectingOption] = useState<string | null>(null);

  const goToNextStep = () => {
    const next = QUIZ_STEPS[currentStep].next;
    if (next) {
      setCurrentStep(next);
      setIsReturning(false); // Moving forward = not returning
    }
  };

  const goToPrevStep = () => {
    const prev = QUIZ_STEPS[currentStep].prev;
    if (prev) {
      setCurrentStep(prev);
      setIsReturning(true); // Moving back = returning
    }
  };

  const handleOptionSelect = (field: keyof QuizFormData, value: string) => {
    setSelectingOption(value); // Visual feedback state
    setFormData(prev => ({ ...prev, [field]: value }));
    setTimeout(() => {
      goToNextStep();
      setSelectingOption(null);
    }, 200);
  };

  const togglePriority = (priority: string) => {
    setFormData(prev => {
      const current = prev.priorities || [];
      const newPriorities = current.includes(priority)
        ? current.filter(p => p !== priority)
        : [...current, priority];
      return { ...prev, priorities: newPriorities };
    });
  };

  const submitContacts = async (contactsData: { name: string; phone?: string; email?: string }) => {
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          ...formData, 
          ...contactsData,
          source: 'Страница /quiz',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      const result = await response.json();
      if (result.applicationId) {
        setApplicationId(result.applicationId);
      }

      setCurrentStep('success');
    } catch (error) {
      console.error('Quiz submission error:', error);
      setSubmitError('Не получилось отправить с первого раза');
    } finally {
      setIsSubmitting(false);
    }
  };

  const retrySubmit = (contactsData: { name: string; phone?: string; email?: string }) => {
    submitContacts(contactsData);
  };

  // Smart Defaults: подсказываем варианты на основе предыдущих выборов
  const getSuggestedPriorities = (): string[] => {
    const suggestions: string[] = [];
    
    // Если высокий бюджет → подсвечиваем "Комфорт и сервис"
    if (formData.budget === '400 000 ₽+' || formData.budget === '200 000 – 400 000 ₽') {
      suggestions.push('Комфорт и сервис');
    }
    
    // Если семья с детьми → не подсвечиваем "Минимум детей"
    if (formData.travelers !== 'Семья с детьми') {
      // Можно подсветить "Спокойный отдых" для пар
      if (formData.travelers === 'Пара или семья без детей' || formData.travelers === 'Один/одна') {
        suggestions.push('Спокойный отдых');
      }
    }
    
    return suggestions;
  };

  return {
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
  };
}
