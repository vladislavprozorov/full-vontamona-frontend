// ========== FSM States ==========
export type QuizStep = 
  | 'dates' 
  | 'budget' 
  | 'travelers' 
  | 'region' 
  | 'priorities' 
  | 'contacts' 
  | 'success';

export interface QuizStepConfig {
  next: QuizStep | null;
  prev: QuizStep | null;
  number: number;
}

export interface QuizFormData {
  dates?: string;
  budget?: string;
  travelers?: string;
  region?: string;
  priorities: string[];
  name?: string;
  phone?: string;
  email?: string;
}
