import type { QuizFormData } from './quiz.machine';
import {
  getLabelForDateRange,
  getLabelForBudget,
  getLabelForTravelers,
  getLabelForRegion,
  getLabelForPriority,
} from './quiz.domain';

export interface SubmitResult {
  success: boolean;
  applicationId?: string;
  error?: string;
}

/**
 * Submit quiz form to API
 */
export async function submitQuiz(formData: QuizFormData): Promise<SubmitResult> {
  try {
    // Валидация перед отправкой
    if (!formData.name || !formData.phone || !formData.email) {
      return {
        success: false,
        error: 'Заполните все обязательные поля',
      };
    }

    // Конвертируем domain types → labels для API
    const payload = {
      dates: formData.dateRange ? getLabelForDateRange(formData.dateRange) : undefined,
      budget: formData.budget ? getLabelForBudget(formData.budget) : undefined,
      travelers: formData.travelers ? getLabelForTravelers(formData.travelers) : undefined,
      region: formData.region ? getLabelForRegion(formData.region) : undefined,
      priorities: formData.priorities.map(getLabelForPriority),
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      source: 'quiz-form',
    };

    // Отправка на /api/quiz
    const response = await fetch('/api/quiz', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Quiz submit failed:', errorText);
      return {
        success: false,
        error: 'Ошибка отправки. Попробуйте позже.',
      };
    }

    const result = await response.json();
    
    return {
      success: true,
      applicationId: result.applicationId || `CR-${Date.now()}`,
    };
  } catch (error) {
    console.error('Quiz submit failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Неизвестная ошибка',
    };
  }
}
