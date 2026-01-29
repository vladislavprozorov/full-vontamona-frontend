import * as z from 'zod';

// ========== Zod Schemas ==========
export const contactsSchema = z.object({
  name: z.string().min(2, 'Введите имя (минимум 2 символа)'),
  phone: z.string().min(1, 'Укажите номер телефона'),
  email: z.string().email('Введите корректный email'),
});

export type ContactsFormData = z.infer<typeof contactsSchema>;
