# Quiz Feature - Clean Architecture

## 📁 Структура файлов

```
src/features/quiz/
├── quiz.types.ts          # TypeScript типы и интерфейсы
├── quiz.constants.ts      # Статичная конфигурация (шаги, опции)
├── quiz.schema.ts         # Zod схемы валидации
├── quiz.hooks.ts          # Бизнес-логика (useQuiz hook)
├── QuizLayout.tsx         # Layout компонент (header/body/footer)
├── SuccessScreen.tsx      # Экран успешной отправки
├── quiz-form.tsx          # 🎯 Главный компонент-сборщик (65 строк)
└── steps/                 # Отдельные шаги квиза
    ├── index.ts
    ├── DatesStep.tsx
    ├── BudgetStep.tsx
    ├── TravelersStep.tsx
    ├── RegionStep.tsx
    ├── PrioritiesStep.tsx
    └── ContactsStep.tsx
```

## 🎯 Принципы архитектуры

### 1. Разделение ответственности

- **Types** (`quiz.types.ts`) - что это за данные
- **Constants** (`quiz.constants.ts`) - статичные данные
- **Schema** (`quiz.schema.ts`) - правила валидации
- **Hooks** (`quiz.hooks.ts`) - бизнес-логика
- **Components** - только UI

### 2. Каждый шаг независим

```tsx
// Каждый шаг получает только то, что ему нужно
<DatesStep onSelect={(value) => handleOptionSelect('dates', value)} />
<PrioritiesStep
  selectedPriorities={formData.priorities}
  onToggle={togglePriority}
  onNext={goToNextStep}
/>
```

### 3. QuizForm как сборщик

```tsx
// Вся логика вынесена в useQuiz hook
const quiz = useQuiz();

// Шаги декларативно маппятся
const stepsMap = {
  dates: <DatesStep onSelect={...} />,
  budget: <BudgetStep onSelect={...} />,
  // ...
};

// Рендер тривиален
return (
  <QuizLayout {...layoutProps}>
    {stepsMap[currentStep]}
  </QuizLayout>
);
```

## 🚀 Как добавить новый шаг

### 1. Добавить тип в `quiz.types.ts`

```typescript
export type QuizStep =
  | "dates"
  | "budget"
  | "newStep" // ← новый шаг
  | "...";
```

### 2. Добавить конфигурацию в `quiz.constants.ts`

```typescript
export const QUIZ_STEPS = {
  // ...
  newStep: { next: "contacts", prev: "priorities", number: 6 },
};

export const OPTIONS = {
  // ...
  newStep: ["Вариант 1", "Вариант 2"],
};
```

### 3. Создать компонент в `steps/NewStep.tsx`

```tsx
interface NewStepProps {
  onSelect: (value: string) => void;
}

export function NewStep({ onSelect }: NewStepProps) {
  return (
    <div className="space-y-4 md:space-y-5">
      <h3>Заголовок нового шага</h3>
      {OPTIONS.newStep.map((option) => (
        <button onClick={() => onSelect(option)}>{option}</button>
      ))}
    </div>
  );
}
```

### 4. Добавить в `quiz-form.tsx`

```tsx
import { NewStep } from "./steps/NewStep";

const stepsMap = {
  // ...
  newStep: (
    <NewStep onSelect={(value) => handleOptionSelect("newStep", value)} />
  ),
};
```

**Всё!** Никакой логики внутри JSX, никакой мутации состояния в компонентах.

## 🎨 Luxury UX Features

### Responsive Design

- Mobile-first подход с адаптивными отступами
- Тактильный feedback: `active:scale-[0.98]`
- Увеличенные тач-таргеты на mobile: `p-3.5 md:p-3`

### Анимации

- Плавные переходы между шагами: `animate-in fade-in slide-in-from-right-4`
- Прогресс-бар с анимацией: `transition-all duration-500`
- Кнопка loading с спиннером

### Micro-interactions

- Динамические подсказки в PrioritiesStep
- Автофокус на первом поле контактов
- Улучшенные focus states: `focus:ring-1 focus:ring-neutral-900`

## 🧪 Тестирование

Легко тестировать изолированно:

```tsx
// Тестируем hook отдельно
const { result } = renderHook(() => useQuiz());
act(() => result.current.handleOptionSelect("dates", "В ближайший месяц"));

// Тестируем компонент шага отдельно
render(<DatesStep onSelect={mockFn} />);
fireEvent.click(screen.getByText("В ближайший месяц"));
expect(mockFn).toHaveBeenCalled();
```

## 📦 Преимущества новой архитектуры

✅ **Читаемость**: Каждый файл решает одну задачу  
✅ **Масштабируемость**: Добавление шага = 5 минут  
✅ **Поддержка**: Легко передать другому разработчику  
✅ **Тестируемость**: Можно тестировать каждую часть отдельно  
✅ **Типобезопасность**: TypeScript знает всё на этапе компиляции  
✅ **Переиспользование**: Компоненты можно использовать в других формах

## 🔄 Миграция со старой версии

Старый файл сохранён как `quiz-form-old.tsx.backup`.  
Все функции работают идентично, API не изменился.
