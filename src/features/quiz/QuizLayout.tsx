import { ReactNode } from 'react';
import { QUIZ_STEPS, TOTAL_STEPS } from './quiz.constants';
import { QuizStep } from './quiz.types';

interface QuizLayoutProps {
  currentStep: QuizStep;
  onBack?: () => void;
  onNext?: () => void;
  children: ReactNode;
  isReturning?: boolean;
}

export function QuizLayout({ currentStep, onBack, onNext, children, isReturning }: QuizLayoutProps) {
  const currentStepNumber = QUIZ_STEPS[currentStep].number;
  const progress = (currentStepNumber / TOTAL_STEPS) * 100;
  const hasPrev = currentStep !== 'dates' && QUIZ_STEPS[currentStep].prev;
  const isContactsStep = currentStep === 'contacts';

  return (
    <div className="w-full max-w-135 mx-auto">
      <div 
        className="rounded-2xl border border-neutral-100 dark:border-neutral-800 flex flex-col bg-linear-to-b from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-950"
        style={{ 
          boxShadow: '0 30px 80px rgba(0,0,0,0.06), 0 8px 20px rgba(0,0,0,0.03)', 
          height: '70vh', 
          maxHeight: '650px', 
          minHeight: '500px' 
        }}
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

          {/* Подзаголовок luxury - только на первых 2-3 шагах и только если пользователь не возвращается */}
          {currentStepNumber <= 3 && !isReturning && (
            <p className="text-xs text-neutral-500 dark:text-neutral-400 text-center">
              Это займёт меньше минуты
            </p>
          )}
        </div>

        {/* Scrollable Content - быстрее анимация при возврате */}
        <div className="flex-1 overflow-y-auto px-5 md:px-9 py-5 md:py-6">
          <div className={`animate-in fade-in slide-in-from-right-4 ${isReturning ? 'duration-150' : 'duration-300'}`}>
            {children}
          </div>
        </div>

        {/* Footer с кнопками */}
        {!isContactsStep && (
          <div className="border-t border-neutral-100 dark:border-neutral-800 p-5 md:p-7 bg-white dark:bg-neutral-900">
            <div className="flex items-center justify-between">
              {hasPrev && onBack ? (
                <button
                  type="button"
                  onClick={onBack}
                  className="px-4 md:px-5 py-2.5 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 font-medium transition-colors active:scale-95"
                >
                  ← Назад
                </button>
              ) : (
                <div />
              )}
              
              {onNext && currentStep === 'priorities' && (
                <button
                  type="button"
                  onClick={onNext}
                  className="ml-auto px-7 md:px-8 py-3 bg-neutral-900 dark:bg-neutral-100 hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 font-medium rounded-full transition-all text-sm active:scale-95"
                >
                  Далее →
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
