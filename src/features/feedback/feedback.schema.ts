import { z } from 'zod';

export const PHONE_MASK_REGEX =
  /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;

export const feedbackSchema = z.object({
  name: z
    .string()
    .min(2, 'Введите имя')
    .max(50),

  phone: z
    .string()
    .regex(PHONE_MASK_REGEX, 'Введите корректный телефон'),

  message: z
    .string()
    .max(500)
    .optional(),

  source: z.literal('SITE_FORM'),
});

export type FeedbackFormValues = z.infer<typeof feedbackSchema>;
