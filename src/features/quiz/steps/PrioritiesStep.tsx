import { memo } from 'react';
import { PRIORITY_OPTIONS, type Priority } from '../model';

interface PrioritiesStepProps {
  selectedPriorities: Priority[];
  onToggle: (priority: Priority) => void;
  onNext: () => void;
  suggestedPriorities: Priority[];
}

export const PrioritiesStep = memo(function PrioritiesStep({ selectedPriorities, onToggle, onNext, suggestedPriorities }: PrioritiesStepProps) {
  return (
    <div className="space-y-4 md:space-y-5">
      <div>
        <h3 className="text-lg md:text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-2 leading-tight">
          Что для вас особенно важно в путешествии?
        </h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Вы можете выбрать несколько вариантов
        </p>
      </div>
      
      <div className="grid gap-3 md:grid-cols-2">
        {PRIORITY_OPTIONS.map((option) => {
          const isSelected = selectedPriorities.includes(option.value);
          const isSuggested = suggestedPriorities.includes(option.value);
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onToggle(option.value)}
              className={`p-3.5 md:p-3 text-left border rounded-xl transition-all active:scale-[0.98] ${
                isSelected
                  ? 'border-neutral-900 dark:border-neutral-100 bg-neutral-50 dark:bg-neutral-800/50 ring-1 ring-neutral-900 dark:ring-neutral-100'
                  : isSuggested
                  ? 'border-neutral-400 dark:border-neutral-500 hover:border-neutral-500 dark:hover:border-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/30'
                  : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-800/30'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[15px] text-neutral-900 dark:text-neutral-100">{option.label}</span>
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

      {/* Динамический фидбек */}
      <div className="text-center pt-2">
        {selectedPriorities.length === 0 ? (
          <p className="text-xs text-neutral-400 dark:text-neutral-500">
            Выберите подходящие варианты
          </p>
        ) : selectedPriorities.length === 1 && selectedPriorities[0] !== 'UNKNOWN' ? (
          <p className="text-xs text-emerald-600 dark:text-emerald-400">
            ✓ Отлично! Можно выбрать ещё
          </p>
        ) : selectedPriorities[0] === 'UNKNOWN' ? (
          <p className="text-xs text-emerald-600 dark:text-emerald-400">
            ✓ Поможем определиться при консультации
          </p>
        ) : (
          <p className="text-xs text-emerald-600 dark:text-emerald-400">
            ✓ Прекрасно, этого достаточно
          </p>
        )}
      </div>
    </div>
  );
});
