import { config } from '@/lib/config';
import { FeedbackFormValues } from './feedback.schema';

export async function createFeedback(payload: FeedbackFormValues) {
  const res = await fetch(`${config.apiUrl}/feedback`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    // Безопасная обработка ошибки (может быть HTML или JSON)
    let errorMessage = `HTTP ${res.status}: ${res.statusText}`;
    
    try {
      const contentType = res.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        const error = await res.json();
        errorMessage = error.message || JSON.stringify(error);
      } else {
        const text = await res.text();
        console.error('API error (non-JSON):', text.substring(0, 200));
      }
    } catch (parseError) {
      console.error('Failed to parse error response:', parseError);
    }
    
    throw new Error(errorMessage);
  }
}

