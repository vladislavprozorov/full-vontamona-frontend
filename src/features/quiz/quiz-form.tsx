'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';

// ========== FSM States ==========
type QuizStep = 'dates' | 'budget' | 'travelers' | 'region' | 'priorities' | 'contacts' | 'success';

// ========== Zod Schemas ==========
const contactsSchema = z.object({
  name: z.string().min(2, 'Введите имя (минимум 2 символа)'),
  phone: z.string()
    .regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, 'Введите корректный номер телефона')
    .optional()
    .or(z.literal('')),
  email: z.string().email('Введите корректный email').optional().or(z.literal('')),
});

type ContactsFormData = z.infer<typeof contactsSchema>;

interface QuizFormData {
  dates?: string;
  budget?: string;
  travelers?: string;
  region?: string;
  priorities: string[];
  name?: string;
  phone?: string;
  email?: string;
}

// ========== FSM Configuration ==========
const QUIZ_STEPS: Record<QuizStep, { next: QuizStep | null; prev: QuizStep | null; number: number }> = {
  dates: { next: 'budget', prev: null, number: 1 },
  budget: { next: 'travelers', prev: 'dates', number: 2 },
  travelers: { next: 'region', prev: 'budget', number: 3 },
  region: { next: 'priorities', prev: 'travelers', number: 4 },
  priorities: { next: 'contacts', prev: 'region', number: 5 },
  contacts: { next: 'success', prev: 'priorities', number: 6 },
  success: { next: null, prev: null, number: 7 },
};

const TOTAL_STEPS = 6;

// ========== Options ==========
const OPTIONS = {
  dates: [
    'В ближайший месяц',
    'Через 1-3 месяца',
    'Через 3-6 месяцев',
    'Более чем через полгода',
    'Пока не определился',
  ],
  budget: [
    'До 100 000 ₽',
    '100 000 – 200 000 ₽',
    '200 000 – 400 000 ₽',
    '400 000 ₽+',
    'Пока не знаю',
  ],
  travelers: [
    'Один/одна',
    'Пара',
    'Семья с детьми',
    'Компания друзей',
    'Группа',
  ],
  region: [
    'Средиземное море',
    'Северная Европа и фьорды',
    'Карибы',
    'Азия',
    'Экзотика (Южная Америка, Африка)',
    'Пока не определился',
  ],
  priorities: [
    'Комфорт и сервис',
    'Цена',
    'Минимум детей',
    'Развлечения',
    'Экскурсии',
    'Спокойный отдых',
  ],
};

export function QuizForm() {
  const [currentStep, setCurrentStep] = useState<QuizStep>('dates');
  const [formData, setFormData] = useState<QuizFormData>({
    priorities: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationId, setApplicationId] = useState<string>('');

  // React Hook Form только для последнего шага (контакты)
  const { register, handleSubmit: handleFormSubmit, formState: { errors } } = useForm<ContactsFormData>({
    resolver: zodResolver(contactsSchema),
  });

  const goToNextStep = () => {
    const next = QUIZ_STEPS[currentStep].next;
    if (next) {
      setCurrentStep(next);
    }
  };

  const goToPrevStep = () => {
    const prev = QUIZ_STEPS[currentStep].prev;
    if (prev) {
      setCurrentStep(prev);
    }
  };

  const handleOptionSelect = (field: keyof QuizFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setTimeout(() => goToNextStep(), 200);
  };

  const togglePriority = (priority: string) => {
    setFormData(prev => {
      const current = prev.priorities || [];
      const newPriorities = current.includes(priority)
        ? current.filter(p => p !== priority)
        : [...current, priority];
      return { ...prev, priorities: newPriorities };
    });
  };

  const onContactsSubmit = async (contactsData: ContactsFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          ...formData, 
          ...contactsData,
          source: 'Страница /quiz',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      const result = await response.json();
      if (result.applicationId) {
        setApplicationId(result.applicationId);
      }

      setCurrentStep('success');
    } catch (error) {
      console.error('Quiz submission error:', error);
      alert('Ошибка отправки. Попробуйте ещё раз или позвоните нам.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ========== SUCCESS SCREEN ==========
  if (currentStep === 'success') {
    return (
      <div className="w-full max-w-135 mx-auto">
        <div className="bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm rounded-2xl shadow-sm border border-transparent p-8 md:p-12 text-center">
          <div className="mb-5">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-neutral-100 dark:bg-neutral-800 rounded-full mb-5">
              <svg className="w-8 h-8 text-neutral-700 dark:text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-medium text-neutral-900 dark:text-neutral-100 mb-3 leading-tight">
              Благодарим за доверие
            </h2>
            
            {applicationId && (
              <div className="inline-block bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 rounded-xl px-4 py-2 mb-5">
                <p className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-1">
                  Номер заявки
                </p>
                <p className="text-sm font-mono text-neutral-900 dark:text-neutral-100">
                  {applicationId}
                </p>
              </div>
            )}
            
            <p className="text-[15px] text-neutral-600 dark:text-neutral-400 mb-3 leading-relaxed">
              Мы подбираем круизы вручную, не по шаблону
            </p>
            <p className="text-[15px] text-neutral-600 dark:text-neutral-400 mb-2 leading-relaxed">
              Ваш персональный консультант свяжется с вами <span className="text-neutral-900 dark:text-neutral-100">в течение 2–3 часов</span>
            </p>
            <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-4">
              Проверьте {formData.phone ? 'телефон' : ''}{formData.phone && formData.email ? ' и ' : ''}{formData.email ? 'почту' : ''}
            </p>
          </div>

          <div className="flex flex-col gap-3 mt-8">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-sm font-medium rounded-xl hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all active:scale-[0.98]"
            >
              Вернуться на главную
            </Link>
            <Link
              href="/#widget"
              className="inline-flex items-center justify-center px-6 py-2.5 text-neutral-600 dark:text-neutral-400 text-sm hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              Посмотреть круизы самостоятельно
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ========== QUIZ FORM ==========
  const currentStepNumber = QUIZ_STEPS[currentStep].number;
  const progress = (currentStepNumber / TOTAL_STEPS) * 100;

  // Wrapper для contacts - form, для остальных - div
  const WrapperComponent = currentStep === 'contacts' ? 'form' : 'div';
  const wrapperProps = currentStep === 'contacts' 
    ? { onSubmit: handleFormSubmit(onContactsSubmit) } 
    : {};

  return (
    <div className="w-full max-w-135 mx-auto">
      <WrapperComponent 
        {...wrapperProps}
        className="bg-white dark:bg-neutral-900 rounded-2xl border border-transparent flex flex-col" 
        style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.06)', height: '70vh', maxHeight: '650px', minHeight: '500px' }}
      >
        
        {/* Header с прогрессом */}
        <div className="p-5 md:p-9 pb-4 md:pb-6 border-b border-neutral-100 dark:border-neutral-800">
          <div className="mb-4 md:mb-5">
            <div className="flex items-center justify-between mb-2 md:mb-3">
              <span className="text-xs text-neutral-400 dark:text-neutral-500 tracking-wide">
                Шаг {currentStepNumber} из {TOTAL_STEPS}
              </span>
            </div>
            <div className="w-full h-0.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-neutral-900 dark:bg-neutral-100 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
            />
          </div>
        </div>

          {/* Подзаголовок luxury - только на первых 2-3 шагах */}
          {currentStepNumber <= 3 && (
            <p className="text-xs text-neutral-500 dark:text-neutral-400 text-center">
              Это займёт меньше минуты
            </p>
          )}
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-5 md:px-9 py-5 md:py-6">
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">

      {/* Шаг 1: Когда планируете */}
      {currentStep === 'dates' && (
        <div className="space-y-4 md:space-y-5">
          <h3 className="text-lg md:text-xl font-medium text-neutral-900 dark:text-neutral-100 leading-tight mb-4 md:mb-5">
            Когда вам было бы удобно отправиться?
          </h3>
          <div className="grid gap-2.5 md:gap-2">
            {OPTIONS.dates.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleOptionSelect('dates', option)}
                className="p-3.5 md:p-3 text-left border border-neutral-200 dark:border-neutral-700 rounded-xl hover:border-neutral-300 dark:hover:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-all active:scale-[0.98]"
              >
                <span className="text-[15px] text-neutral-900 dark:text-neutral-100">{option}</span>
              </button>
            ))}
          </div>
          <p className="text-center text-xs text-neutral-400 dark:text-neutral-500 mt-5">
            Это займёт меньше минуты
          </p>
        </div>
      )}

      {/* Шаг 2: Бюджет */}
      {currentStep === 'budget' && (
        <div className="space-y-4 md:space-y-5">
          <div>
            <h3 className="text-lg md:text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-2 leading-tight">
              Какой диапазон для вас комфортен?
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Мы подберём варианты под ваш бюджет
            </p>
          </div>
          <div className="grid gap-2.5 md:gap-2">
            {OPTIONS.budget.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleOptionSelect('budget', option)}
                className="p-3.5 md:p-3 text-left border border-neutral-200 dark:border-neutral-800 rounded-xl hover:border-neutral-300 dark:hover:border-neutral-300 hover:bg-neutral-50 dark:hover:bg-blue-950/20 transition-all active:scale-[0.98]"
              >
                <span className="text-[15px] text-neutral-900 dark:text-neutral-100">{option}</span>
              </button>
            ))}
          </div>
          <p className="text-center text-xs text-neutral-400 dark:text-neutral-500 mt-5">
            Это займёт меньше минуты
          </p>
        </div>
      )}

      {/* Шаг 3: Кто едет */}
      {currentStep === 'travelers' && (
        <div className="space-y-4 md:space-y-5">
          <h3 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 leading-tight mb-5">
            С кем планируете путешествие?
          </h3>
          <div className="grid gap-2.5 md:gap-2">
            {OPTIONS.travelers.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleOptionSelect('travelers', option)}
                className="p-3.5 md:p-3 text-left border border-neutral-200 dark:border-neutral-800 rounded-xl hover:border-neutral-300 dark:hover:border-neutral-300 hover:bg-neutral-50 dark:hover:bg-blue-950/20 transition-all active:scale-[0.98]"
              >
                <span className="text-[15px] text-neutral-900 dark:text-neutral-100">{option}</span>
              </button>
            ))}
          </div>
          <p className="text-center text-xs text-neutral-400 dark:text-neutral-500 mt-5">
            Это займёт меньше минуты
          </p>
        </div>
      )}

      {/* Шаг 4: Регион */}
      {currentStep === 'region' && (
        <div className="space-y-4 md:space-y-5">
          <h3 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 leading-tight mb-5">
            Какое направление вас привлекает?
          </h3>
          <div className="grid gap-2.5 md:gap-2 md:grid-cols-2">
            {OPTIONS.region.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleOptionSelect('region', option)}
                className="p-3.5 md:p-3 text-left border border-neutral-200 dark:border-neutral-800 rounded-xl hover:border-neutral-300 dark:hover:border-neutral-300 hover:bg-neutral-50 dark:hover:bg-blue-950/20 transition-all active:scale-[0.98]"
              >
                <span className="text-[15px] text-neutral-900 dark:text-neutral-100">{option}</span>
              </button>
            ))}
          </div>
          <p className="text-center text-xs text-neutral-400 dark:text-neutral-500 mt-5">
            Это займёт меньше минуты
          </p>
        </div>
      )}

      {/* Шаг 5: Приоритеты (мультиселект) */}
      {currentStep === 'priorities' && (
        <div className="space-y-4 md:space-y-5">
          <div>
            <h3 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-2 leading-tight">
              Что для вас особенно важно?
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Можно выбрать несколько
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {OPTIONS.priorities.map((option) => {
              const isSelected = formData.priorities.includes(option);
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => togglePriority(option)}
                  className={`p-3 text-left border rounded-xl transition-all ${
                    isSelected
                      ? 'border-neutral-900 bg-neutral-50 dark:bg-neutral-800/50 ring-1 ring-neutral-900'
                      : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-800/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[15px] text-neutral-900 dark:text-neutral-100">{option}</span>
                    {isSelected && (
                      <svg className="w-6 h-6 text-neutral-900 dark:text-neutral-100" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
          
          {/* Динамические микро-подсказки */}
          {formData.priorities.length === 0 ? (
            <p className="text-center text-sm text-neutral-400 dark:text-neutral-500 mt-4">
              Выберите один или несколько вариантов
            </p>
          ) : formData.priorities.length === 1 ? (
            <p className="text-center text-sm text-emerald-600 dark:text-emerald-400 mt-4">
              ✓ Отлично! Можно выбрать ещё
            </p>
          ) : (
            <p className="text-center text-sm text-emerald-600 dark:text-emerald-400 mt-4">
              ✓ Прекрасно, этого достаточно
            </p>
          )}
          
          <p className="text-center text-xs text-neutral-400 dark:text-neutral-500 mt-3">
            Это займёт меньше минуты
          </p>
        </div>
      )}

      {/* Шаг 6: Контакты */}
      {currentStep === 'contacts' && (
        <div className="space-y-4 md:space-y-5">
          <div>
            <h3 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-2 leading-tight">
              Как нам с вами связаться?
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-5">
              Ваш персональный консультант свяжется в течение 2–3 часов
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Ваше имя *
              </label>
              <input
                type="text"
                {...register('name')}
                autoFocus
                placeholder="Как вас зовут?"
                className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 rounded-xl focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:outline-none transition-all active:scale-[0.98]"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Телефон (необязательно)
              </label>
              <input
                {...register('phone')}
                type="tel"
                placeholder="+7 (___) ___-__-__"
                className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 rounded-xl focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:outline-none transition-all active:scale-[0.98]"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Email (необязательно)
              </label>
              <input
                type="email"
                {...register('email')}
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 rounded-xl focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:outline-none transition-all active:scale-[0.98]"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <p className="text-xs text-neutral-500 dark:text-neutral-500">
              Нажимая "Отправить", вы соглашаетесь с{' '}
              <Link href="/privacy" className="underline hover:text-neutral-700 dark:hover:text-neutral-300">
                политикой конфиденциальности
              </Link>
            </p>
          </div>
        </div>
      )}

          </div> {/* End animation wrapper */}
        </div> {/* End scrollable content */}

        {/* Fixed Footer with Navigation */}
        <div className="border-t border-neutral-100 dark:border-neutral-800 p-5 md:p-7 bg-white dark:bg-neutral-900">
          <div className="flex items-center justify-between">
            {currentStep !== 'dates' && QUIZ_STEPS[currentStep].prev && (
              <button
                type="button"
                onClick={goToPrevStep}
                className="px-4 md:px-5 py-2.5 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 font-medium transition-colors active:scale-95"
              >
                ← Назад
              </button>
            )}
            
            {currentStep === 'dates' && <div />}

            {currentStep === 'contacts' ? (
              <button
                type="submit"
                disabled={isSubmitting}
                className="ml-auto px-7 md:px-8 py-3 md:py-3 bg-neutral-900 dark:bg-neutral-100 hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 font-medium rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm active:scale-95"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2.5 md:gap-2">
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Отправка...
                  </span>
                ) : 'Отправить заявку'}
              </button>
            ) : currentStep === 'priorities' ? (
              <button
                type="button"
                onClick={goToNextStep}
                disabled={formData.priorities.length === 0}
                className="ml-auto px-7 md:px-8 py-3 bg-neutral-900 dark:bg-neutral-100 hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 font-medium rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm active:scale-95"
              >
                Далее →
              </button>
            ) : null}
          </div>
        </div>

      </WrapperComponent>
    </div>
  );
}
