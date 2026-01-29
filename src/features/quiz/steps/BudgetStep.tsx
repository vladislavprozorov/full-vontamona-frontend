import { OPTIONS } from '../quiz.constants';

interface BudgetStepProps {
  onSelect: (value: string) => void;
  selectedValue?: string;
  selectingValue?: string | null;
}

export function BudgetStep({ onSelect, selectedValue, selectingValue }: BudgetStepProps) {
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
        {OPTIONS.budget.map((option) => {
          const isSelected = selectedValue === option;
          const isSelecting = selectingValue === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onSelect(option)}
              disabled={!!selectingValue}
              className={`p-3.5 md:p-3 text-left border rounded-xl transition-all duration-200 ${
                isSelecting
                  ? 'border-neutral-900 dark:border-neutral-100 bg-neutral-900 dark:bg-neutral-100 scale-[0.98] shadow-lg'
                  : isSelected
                  ? 'border-neutral-900 dark:border-neutral-100 bg-neutral-50 dark:bg-neutral-800/50 ring-1 ring-neutral-900 dark:ring-neutral-100'
                  : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-300 hover:bg-neutral-50 dark:hover:bg-blue-950/20 active:scale-[0.98]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[15px] transition-colors duration-200 ${
                  isSelecting 
                    ? 'text-white dark:text-neutral-900' 
                    : 'text-neutral-900 dark:text-neutral-100'
                }`}>{option}</span>
                {(isSelected || isSelecting) && (
                  <svg className={`w-6 h-6 transition-all duration-200 ${
                    isSelecting 
                      ? 'text-white dark:text-neutral-900 scale-110' 
                      : 'text-neutral-900 dark:text-neutral-100'
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
}
