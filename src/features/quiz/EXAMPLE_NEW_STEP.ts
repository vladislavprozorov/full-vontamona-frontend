// 🎯 ПРИМЕР: Как добавить новый шаг "Особые пожелания"
// Копируй этот файл и адаптируй под свои нужды

// ========== 1. quiz.types.ts ==========
// export type QuizStep = 
//   | 'dates' 
//   | 'budget'
//   | 'travelers'
//   | 'region'
//   | 'priorities'
//   | 'specialRequests' // ← НОВЫЙ ШАГ
//   | 'contacts' 
//   | 'success';

// ========== 2. quiz.constants.ts ==========
// export const QUIZ_STEPS = {
//   // ...existing steps
//   specialRequests: { next: 'contacts', prev: 'priorities', number: 6 },
//   contacts: { next: 'success', prev: 'specialRequests', number: 7 }, // обновить prev
// };
//
// export const TOTAL_STEPS = 7; // было 6
//
// export const OPTIONS = {
//   // ...existing options
//   specialRequests: [
//     'Диетическое меню',
//     'Тихая каюта',
//     'Близко к лифту',
//     'Высокий этаж',
//     'Нет особых пожеланий',
//   ],
// };

// ========== 3. steps/SpecialRequestsStep.tsx ==========
/*
import { OPTIONS } from '../quiz.constants';

interface SpecialRequestsStepProps {
  selectedRequests: string[];
  onToggle: (request: string) => void;
  onNext: () => void;
}

export function SpecialRequestsStep({ selectedRequests, onToggle, onNext }: SpecialRequestsStepProps) {
  return (
    <div className="space-y-4 md:space-y-5">
      <div>
        <h3 className="text-lg md:text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-2 leading-tight">
          Есть ли особые пожелания?
        </h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Мы учтём ваши предпочтения при подборе
        </p>
      </div>
      
      <div className="grid gap-3">
        {OPTIONS.specialRequests.map((option) => {
          const isSelected = selectedRequests.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => onToggle(option)}
              className={`p-3.5 md:p-3 text-left border rounded-xl transition-all active:scale-[0.98] ${
                isSelected
                  ? 'border-neutral-900 bg-neutral-50 ring-1 ring-neutral-900'
                  : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[15px] text-neutral-900">{option}</span>
                {isSelected && (
                  <svg className="w-6 h-6 text-neutral-900" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {selectedRequests.length > 0 && (
        <p className="text-xs text-emerald-600 text-center pt-2">
          ✓ Пожелания учтены
        </p>
      )}
    </div>
  );
}
*/

// ========== 4. quiz.hooks.ts (добавить логику) ==========
// interface QuizFormData {
//   // ...existing fields
//   specialRequests?: string[]; // ← НОВОЕ ПОЛЕ
// }
//
// const [formData, setFormData] = useState<QuizFormData>({
//   priorities: [],
//   specialRequests: [], // ← ИНИЦИАЛИЗАЦИЯ
// });
//
// const toggleSpecialRequest = (request: string) => {
//   setFormData(prev => {
//     const current = prev.specialRequests || [];
//     const newRequests = current.includes(request)
//       ? current.filter(r => r !== request)
//       : [...current, request];
//     return { ...prev, specialRequests: newRequests };
//   });
// };
//
// return {
//   // ...existing returns
//   toggleSpecialRequest, // ← ЭКСПОРТ
// };

// ========== 5. quiz-form.tsx (добавить в map) ==========
/*
import { SpecialRequestsStep } from './steps/SpecialRequestsStep';

const {
  // ...
  toggleSpecialRequest,
} = useQuiz();

const stepsMap = {
  // ...existing steps
  specialRequests: (
    <SpecialRequestsStep 
      selectedRequests={formData.specialRequests || []}
      onToggle={toggleSpecialRequest}
      onNext={goToNextStep}
    />
  ),
  // ...
};
*/

// ========== 6. steps/index.ts ==========
// export { SpecialRequestsStep } from './SpecialRequestsStep';

// ========== 7. API route (если нужна отправка) ==========
// interface QuizData {
//   // ...existing fields
//   specialRequests?: string[]; // ← НОВОЕ ПОЛЕ
// }

// ✅ ГОТОВО! Новый шаг работает за 5 минут

export {};
