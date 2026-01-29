/**
 * Quiz Submit Layer
 * 
 * Ответственность: API operations
 * Изолирует бизнес-логику от сетевых вызовов
 */

import type { QuizFormData } from './quiz.machine';
import { createFeedback } from '../../feedback/feedback.api';

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

    // Отправка через feedback API
    await createFeedback({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      source: 'SITE',
      message: `Quiz: ${formData.dateRange}, ${formData.budget}, ${formData.travelers}, ${formData.region}, ${formData.priorities.join(', ')}`,
    });

    // Генерируем ID заявки (или получаем с бэка, если API вернёт)
    const applicationId = `CR-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    return {
      success: true,
      applicationId,
    };
  } catch (error) {
    console.error('Quiz submit failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Неизвестная ошибка',
    };
  }
}
