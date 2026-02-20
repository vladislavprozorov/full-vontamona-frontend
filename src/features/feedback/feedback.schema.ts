import { z } from "zod";

export const PHONE_MASK_REGEX = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
export const FeedbackSource = {
  SITE: "SITE",
  PAC_WIDGET: "PAC_WIDGET",
} as const;

export const feedbackSchema = z.object({
  name: z.string().min(2, "Введите имя").max(50),

  phone: z.string().regex(PHONE_MASK_REGEX, "Введите корректный телефон"),

  email: z.string().email("Введите корректный email").optional().or(z.literal("")),

  message: z.string().max(500).optional(),

  source: z.literal(FeedbackSource.SITE),
});

export type FeedbackFormValues = z.infer<typeof feedbackSchema>;
