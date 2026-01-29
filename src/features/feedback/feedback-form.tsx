'use client';

import { useRef, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IMaskInput } from 'react-imask';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import {
  feedbackSchema,
  FeedbackFormValues,
} from './feedback.schema';
import { createFeedback } from './feedback.api';
import { debounce } from '@/lib/debounce';

export function FeedbackForm() {
  const submitLock = useRef(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      source: 'SITE',
    },
  });

  const onSubmit = useMemo(
    () =>
      debounce(async (data: FeedbackFormValues) => {
        if (submitLock.current) return;
        submitLock.current = true;

        try {
          await createFeedback(data);
          reset();
        } finally {
          submitLock.current = false;
        }
      }, 800),
    [reset],
  );

  if (isSubmitSuccessful) {
    return (
      <div className="py-16 text-center">
        <p className="text-lg font-medium text-neutral-900">
          Спасибо. Мы свяжемся с вами в ближайшее время.
        </p>
        <p className="mt-2 text-sm text-neutral-500">
          Персональный менеджер уже получил заявку
        </p>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-5xl rounded-3xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 p-10 md:p-14">
        
        {/* LEFT — VALUE */}
        <div>
          <p className="text-xs uppercase tracking-widest text-neutral-400 mb-3">
            Персональный сервис
          </p>

          <h3 className="text-2xl font-semibold text-neutral-900 leading-tight">
            Получите персональный маршрут
          </h3>

          <p className="mt-4 text-[15px] text-neutral-600 leading-relaxed">
            Подбор круиза под ваши даты, бюджет и пожелания.  
            Один эксперт. Один контакт. Полная ответственность.
          </p>

          <ul className="mt-6 space-y-3 text-sm text-neutral-700">
            <li>— Персональный менеджер 24/7</li>
            <li>— Прямая работа с MSC, Costa, Royal Caribbean</li>
            <li>— Документы, визы, страховки</li>
          </ul>

          <p className="mt-6 text-xs text-neutral-400">
            Мы не передаём данные третьим лицам
          </p>
        </div>

        {/* RIGHT — FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Имя и телефон в одну строку на десктопе */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <Input
                placeholder="Ваше имя"
                {...register('name')}
                className="h-11 bg-neutral-50 border-neutral-200 text-sm placeholder:text-neutral-400 focus-visible:bg-white"
              />
              {errors.name && (
                <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <IMaskInput
                    {...field}
                    mask="+{7} (000) 000-00-00"
                    placeholder="+7 (___) ___-__-__"
                    onAccept={(value) => field.onChange(value)}
                    className="h-11 w-full rounded-md border border-neutral-200 bg-neutral-50 px-3 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:bg-white transition-colors"
                  />
                )}
              />
              {errors.phone && (
                <p className="text-xs text-red-600 mt-1">{errors.phone.message}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <Input
            type="email"
            placeholder="Электронная почта (необязательно)"
            {...register('email')}
            className="h-11 bg-neutral-50 border-neutral-200 text-sm placeholder:text-neutral-400 focus-visible:bg-white"
          />

          {/* Message */}
          <Textarea
            placeholder="Коротко опишите, какой круиз вы ищете"
            {...register('message')}
            className="min-h-[96px] bg-neutral-50 border-neutral-200 text-sm placeholder:text-neutral-400 focus-visible:bg-white resize-none"
          />

          <Button
            type="submit"
            disabled={isSubmitting || submitLock.current}
            className="mt-4 h-12 w-full rounded-full bg-neutral-900 text-sm font-medium hover:bg-neutral-800 transition-colors"
          >
            {isSubmitting ? 'Отправка…' : 'Получить персональный маршрут'}
          </Button>

          <p className="text-[11px] text-neutral-400 text-center mt-2">
            Отправляя форму, вы соглашаетесь с условиями обработки данных
          </p>
        </form>
      </div>
    </section>
  );
}
