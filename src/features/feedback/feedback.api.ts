import { config } from '@/lib/config';
import { FeedbackFormValues } from './feedback.schema';

export async function createFeedback(
  payload: FeedbackFormValues,
): Promise<void> {
  const res = await fetch(`${config.apiUrl}/feedback`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error('Failed to create feedback');
  }
}
