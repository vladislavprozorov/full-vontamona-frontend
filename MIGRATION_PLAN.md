# 🚀 Migration Plan: Senior → Staff Architecture

## 📋 Current Status

✅ **Model Layer Created** (Staff-level):

- `/features/quiz/model/` — все business logic изолирована
- `quiz.reducer.ts` — формализованная FSM
- `quiz.domain.ts` — типы с compile-time гарантиями
- `quiz.persistence.ts` — localStorage layer
- `quiz.submit.ts` — API layer
- `quiz.selectors.ts` — derived state
- `quiz.suggestions.ts` — smart defaults
- `success.copy.ts` — personalized messages
- `quiz.motion.ts` — animation tokens

⏳ **TODO: Integrate with Existing Code**

---

## 🎯 Migration Steps

### Step 1: Update `quiz.hooks.ts` ✨ PRIORITY

**Current:** useState hell

```typescript
const [currentStep, setCurrentStep] = useState("dates");
const [formData, setFormData] = useState({});
// ... 10 useState
```

**Target:** useReducer + layers

```typescript
import { useReducer, useEffect } from "react";
import {
  quizReducer,
  initialState,
  loadDraft,
  saveDraft,
  submitQuiz,
  type QuizState,
  type QuizEvent,
} from "./model";

export function useQuiz() {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  // Load draft on mount
  useEffect(() => {
    const draft = loadDraft();
    if (draft) {
      dispatch({ type: "RESTORE_DRAFT", state: draft.state });
    }
  }, []);

  // Auto-save
  useEffect(() => {
    saveDraft(state);
  }, [state]);

  // Submit handler
  const submitContacts = async () => {
    dispatch({ type: "SUBMIT_REQUEST" });
    const result = await submitQuiz(state.formData);

    if (result.success) {
      dispatch({
        type: "SUBMIT_SUCCESS",
        applicationId: result.applicationId!,
      });
    } else {
      dispatch({ type: "SUBMIT_ERROR", message: result.error! });
    }
  };

  return {
    state,
    dispatch,
    submitContacts,
  };
}
```

---

### Step 2: Update Steps (UI Components)

#### Before:

```typescript
// BudgetStep.tsx
const { selectBudget } = useQuiz();
<button onClick={() => selectBudget('400 000 ₽+')}>
```

#### After:

```typescript
import { dispatch } from './quiz.hooks';
import { BUDGET_LABELS, type Budget } from './model';

<button onClick={() => dispatch({ type: 'SELECT_BUDGET', value: 'PREMIUM' })}>
  {BUDGET_LABELS.PREMIUM}
</button>
```

**Files to update:**

- `DatesStep.tsx` → `SELECT_DATE_RANGE`
- `BudgetStep.tsx` → `SELECT_BUDGET`
- `TravelersStep.tsx` → `SELECT_TRAVELERS`
- `RegionStep.tsx` → `SELECT_REGION`
- `PrioritiesStep.tsx` → `TOGGLE_PRIORITY`
- `ContactsStep.tsx` → `UPDATE_CONTACTS`

---

### Step 3: Update `SuccessScreen.tsx`

#### Before:

```typescript
const getPersonalizedMessage = (formData) => { ... }
```

#### After:

```typescript
import { getPersonalizedSuccessMessage } from "./model";

const message = getPersonalizedSuccessMessage(state.formData);
```

---

### Step 4: Update `quiz-form.tsx`

#### Before:

```typescript
const stepsMap = {
  dates: <DatesStep ... />,
  budget: <BudgetStep ... />,
};
```

#### After (Optional — UI cleanup):

```typescript
const STEP_COMPONENTS = {
  dates: DatesStep,
  budget: BudgetStep,
  // ...
};

const StepComponent = STEP_COMPONENTS[state.currentStep];
return <StepComponent state={state} dispatch={dispatch} />;
```

---

### Step 5: Update `QuizLayout.tsx`

Use `getDuration` from `quiz.motion.ts`:

```typescript
import { getDuration } from './model';

<div className={getDuration(state.isReturning)}>
```

---

## 🛡️ Safety Checks

Before going live:

1. ✅ **Type Check**: `npm run build` (no errors)
2. ✅ **Test Flow**: dates → budget → travelers → region → priorities → contacts → success
3. ✅ **Test Restore**: refresh in middle → dialog appears → restore works
4. ✅ **Test Submit**: form submits → applicationId generated → Telegram sent
5. ✅ **Test Personalization**: different choices → different success messages

---

## 📊 Benefits After Migration

| Before (Senior)        | After (Staff)  |
| ---------------------- | -------------- |
| useState × 10          | useReducer × 1 |
| Logic in UI            | Logic in model |
| No compile-time safety | FSM + types    |
| Hard to test           | Pure functions |
| Mixed concerns         | Clean layers   |

---

## 🎓 What We Learned

1. **FSM → Reducer** — формализация интуитивных паттернов
2. **Layers** — orchestration / logic / effects разделены
3. **Domain Types** — бизнес ≠ UI
4. **Pure Logic** — тестируется без React
5. **Staff Mindset** — "через 6 месяцев будет приятно читать"

---

## 🔄 Rollback Plan

If something breaks:

1. Keep `/model/` folder (no harm)
2. Don't delete old `quiz.hooks.ts` yet
3. Migrate step-by-step, test each file
4. Commit after each successful step

---

## ✅ Completion Checklist

- [ ] `quiz.hooks.ts` migrated to useReducer
- [ ] All steps use `dispatch({ type, value })`
- [ ] `SuccessScreen` uses `getPersonalizedSuccessMessage`
- [ ] Motion tokens integrated
- [ ] Type errors resolved
- [ ] Full flow tested
- [ ] Restore dialog tested
- [ ] Submit tested
- [ ] Personalization tested
- [ ] Production build succeeds

---

**Current Status:** Model layer complete, ready for integration  
**Next Action:** Update `quiz.hooks.ts` with useReducer  
**Risk Level:** Low (model layer is isolated, can rollback easily)
