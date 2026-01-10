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
    const error = await res.json(); // ⬅️ ВАЖНО
    console.error('Backend validation error:', error);
    throw new Error(JSON.stringify(error));
  }
}

