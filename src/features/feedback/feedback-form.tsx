'use client';

import { useRef, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller } from 'react-hook-form';
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
      }, 1000),
    [reset],
  );

  if (isSubmitSuccessful) {
    return (
      <div className="text-center text-green-600 font-medium">
        Спасибо! Мы скоро с вами свяжемся.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      {/* NAME */}
      <div>
        <Input
          placeholder="Ваше имя"
          {...register('name')}
        />
        {errors.name && (
          <p className="text-sm text-red-600">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* PHONE */}
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
        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
      />
    )}
  />

  {errors.phone && (
    <p className="text-sm text-red-600">
      {errors.phone.message}
    </p>
  )}
</div>


      {/* MESSAGE */}
      <Textarea
        placeholder="Комментарий"
        {...register('message')}
      />

      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting || submitLock.current}
      >
        {isSubmitting ? 'Отправка…' : 'Отправить'}
      </Button>
    </form>
  );
}
