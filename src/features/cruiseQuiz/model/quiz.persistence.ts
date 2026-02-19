/**
 * 💎 Quiz Persistence Layer — Principal-level
 *
 * Ответственность: localStorage operations
 * Не знает про React, только про State
 *
 * Versioning: Автоматический clearDraft при несовпадении версий
 */

import type { QuizState } from "./quiz.machine";

const STORAGE_KEY = "quiz-draft";
const EXPIRY_MS = 3600000; // 1 час
const VERSION = 1; // 🔥 Инкрементируй при изменении структуры State

let saveTimeout: NodeJS.Timeout | null = null;

export interface SavedDraft {
  version: number;
  state: QuizState;
  timestamp: number;
}

/**
 * Сохранить черновик (debounced)
 * Используй эту функцию в useEffect
 */
export function saveDraftDebounced(state: QuizState): void {
  // Отменяем предыдущий таймер
  if (saveTimeout) {
    clearTimeout(saveTimeout);
  }

  // Ставим новый таймер
  saveTimeout = setTimeout(() => {
    saveDraftImmediate(state);
    saveTimeout = null;
  }, 500); // 500ms debounce
}

/**
 * Сохранить черновик немедленно
 * Используй при unmount или критических моментах
 */
export function saveDraftImmediate(state: QuizState): void {
  // Отменяем pending debounce
  if (saveTimeout) {
    clearTimeout(saveTimeout);
    saveTimeout = null;
  }

  saveDraft(state);
}

/**
 * Внутренняя функция сохранения
 */
function saveDraft(state: QuizState): void {
  // Не сохраняем success screen
  if (state.currentStep === "success") {
    clearDraft();
    return;
  }

  // 🔥 Не сохраняем начальный state (dates без выбора)
  if (state.currentStep === "dates" && !state.formData.dateRange) {
    return;
  }

  const draft: SavedDraft = {
    version: VERSION,
    state,
    timestamp: Date.now(),
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  } catch (error) {
    console.warn("Failed to save quiz draft:", error);
  }
}

/**
 * Загрузить черновик (если не истёк и версия совпадает)
 */
export function loadDraft(): SavedDraft | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const draft: SavedDraft = JSON.parse(raw);

    // 🔥 Version check — автоматический clearDraft при несовпадении
    if (draft.version !== VERSION) {
      console.info(`Quiz draft version mismatch (${draft.version} → ${VERSION}), clearing...`);
      clearDraft();
      return null;
    }

    // Проверяем expiry
    if (Date.now() - draft.timestamp > EXPIRY_MS) {
      clearDraft();
      return null;
    }

    // Не показываем restore для success
    if (draft.state.currentStep === "success") {
      clearDraft();
      return null;
    }

    return draft;
  } catch (error) {
    console.warn("Failed to load quiz draft:", error);
    return null;
  }
}

/**
 * Очистить черновик
 */
export function clearDraft(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn("Failed to clear quiz draft:", error);
  }
}
