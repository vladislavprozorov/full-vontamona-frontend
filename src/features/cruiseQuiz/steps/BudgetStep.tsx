/**
 * 💎 BudgetStep — Principal-level
 * 
 * Использует DomainOptions вместо строк
 * Никакого парсинга
 */

import { memo } from 'react';
import { BUDGET_OPTIONS, type Budget } from '../model';

interface BudgetStepProps {
  onSelect: (value: Budget) => void;
  selectedValue?: Budget;
  selectingValue?: Budget | null; // 🔥 Было string | null
}

export const BudgetStep = memo(function BudgetStep({ onSelect, selectedValue, selectingValue }: BudgetStepProps) {
  return (
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
        {BUDGET_OPTIONS.map((option) => {
          const isSelected = selectedValue === option.value;
          const isSelecting = selectingValue === option.value; // 🔥 Было option.label
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelect(option.value)}
              disabled={!!selectingValue}
              className={`
                group relative cursor-pointer
                p-3.5 md:p-3 text-left border rounded-xl
                transform-gpu will-change-transform
                ${
                isSelecting
                  ? 'border-neutral-900 dark:border-neutral-100 bg-neutral-900 dark:bg-neutral-100 scale-[0.97] shadow-2xl'
                  : isSelected
                  ? 'border-neutral-900 dark:border-neutral-100 bg-neutral-50 dark:bg-neutral-800/50 ring-2 ring-neutral-900/20 dark:ring-neutral-100/20 shadow-sm'
                  : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-sm hover:border-neutral-300 dark:hover:border-neutral-600 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98]'
              }`}
              style={{
                transitionProperty: 'transform, box-shadow, background-color, border-color',
                transitionDuration: isSelecting ? '0.075s' : '0.2s', // 🔥 200ms - золотая середина
                transitionTimingFunction: isSelecting 
                  ? 'cubic-bezier(0.34, 1.56, 0.64, 1)' // Spring bounce на клик
                  : 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' // 🔥 ease-out-quad (плавный, не медленный)
              }}
            >
              <div className="flex items-center justify-between">
                <span className={`
                  text-[15px] font-medium transition-colors ${
                  isSelecting ? 'duration-75' : 'duration-200'
                } ${
                  isSelecting 
                    ? 'text-white dark:text-neutral-900' 
                    : 'text-neutral-900 dark:text-neutral-100'
                }`}>{option.label}</span>
                {(isSelected || isSelecting) && (
                  <svg className={`
                    w-5 h-5 transition-all ${
                    isSelecting ? 'duration-75' : 'duration-200'
                  } ${
                    isSelecting 
                      ? 'text-white dark:text-neutral-900 scale-125 rotate-12' 
                      : 'text-neutral-900 dark:text-neutral-100 scale-100'
                  }`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
});
