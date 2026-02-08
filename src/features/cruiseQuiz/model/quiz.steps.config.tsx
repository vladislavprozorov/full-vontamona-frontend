/**
 * Quiz Steps Configuration
 * 
 * Централизованная конфигурация всех шагов квиза.
 * UI больше не знает про шаги — просто рендерит stepConfig.render()
 * 
 * Staff-level: FSM владеет конфигурацией, UI — тупой рендерер
 */

import { JSX } from 'react';
import type { QuizState, QuizStep, QuizEvent } from './quiz.machine';
import type { Priority, DateRange, Travelers, Region } from './quiz.domain';
import { suggestPriorities } from './quiz.suggestions';
import { DatesStep } from '../steps/DatesStep';
import { TravelersStep } from '../steps/TravelersStep';
import { RegionStep } from '../steps/RegionStep';
import { PrioritiesStep } from '../steps/PrioritiesStep';
import { ContactsStep } from '../steps/ContactsStep';

// ========== Step Configuration Interface ==========
export interface QuizStepConfig {
  next: QuizStep | null;
  prev: QuizStep | null;
  number: number;
  title: string;
  render: (props: QuizStepRenderProps) => JSX.Element;
}

// ========== Selecting Option Type (type-safe union) ==========
export type SelectingOption = DateRange | Travelers | Region | Priority | null;

// ========== Render Props (все что нужно степу от UI) ==========
export interface QuizStepRenderProps {
  state: QuizState;
  onOptionSelect: (eventType: QuizEvent['type'], value: any) => void;
  onTogglePriority: (priority: Priority) => void;
  onNext: () => void;
  onSubmit: (contactsData: any) => void;
  onRetry: (contactsData: any) => void;
  onBack: () => void;
  selectingOption: SelectingOption;
}

// ========== Steps Configuration ==========
export const QUIZ_STEPS: Record<QuizStep, QuizStepConfig> = {
  dates: {
    next: 'travelers',
    prev: null,
    number: 1,
    title: 'Даты',
    render: ({ state, onOptionSelect, selectingOption }) => (
      <DatesStep
        onSelect={(value) => onOptionSelect('SELECT_DATE_RANGE', value)}
        selectedValue={state.formData.dateRange}
        selectingValue={selectingOption as DateRange | null | undefined}
      />
    ),
  },
  
  travelers: {
    next: 'region',
    prev: 'dates',
    number: 2,
    title: 'Путешественники',
    render: ({ state, onOptionSelect, selectingOption }) => (
      <TravelersStep
        onSelect={(value) => onOptionSelect('SELECT_TRAVELERS', value)}
        selectedValue={state.formData.travelers}
        selectingValue={selectingOption as Travelers | null | undefined}
      />
    ),
  },
  
  region: {
    next: 'priorities',
    prev: 'travelers',
    number: 3,
    title: 'Регион',
    render: ({ state, onOptionSelect, selectingOption }) => (
      <RegionStep
        onSelect={(value) => onOptionSelect('SELECT_REGION', value)}
        selectedValue={state.formData.region}
        selectingValue={selectingOption as Region | null | undefined}
      />
    ),
  },
  
  priorities: {
    next: 'contacts',
    prev: 'region',
    number: 4,
    title: 'Приоритеты',
    render: ({ state, onTogglePriority, onNext }) => (
      <PrioritiesStep
        selectedPriorities={state.formData.priorities}
        onToggle={onTogglePriority}
        onNext={onNext}
        suggestedPriorities={suggestPriorities(state.formData)}
      />
    ),
  },
  
  contacts: {
    next: 'success',
    prev: 'priorities',
    number: 5,
    title: 'Контакты',
    render: ({ state, onSubmit, onRetry, onBack }) => (
      <ContactsStep
        onSubmit={onSubmit}
        isSubmitting={state.isSubmitting}
        error={state.submitError || ''}
        onRetry={onRetry}
        onBack={onBack}
      />
    ),
  },
  
  success: {
    next: null,
    prev: null,
    number: 6,
    title: 'Готово',
    render: () => <></>, // Success screen handled separately in quiz-form
  },
};

export const TOTAL_STEPS = 5; // без success
