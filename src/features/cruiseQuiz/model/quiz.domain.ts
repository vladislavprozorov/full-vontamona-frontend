/**
 * Domain Types — Principal-level
 *
 * Принципы:
 * - UI НИКОГДА не работает со строками напрямую
 * - Нет парсинга label → value
 * - Type-safe от начала до конца
 */

// ========== Budget ==========
export type Budget = "LOW" | "MID" | "HIGH" | "PREMIUM" | "UNKNOWN";

export interface DomainOption<T> {
  value: T;
  label: string;
}

export const BUDGET_OPTIONS: DomainOption<Budget>[] = [
  { value: "LOW", label: "До 100 000 ₽" },
  { value: "MID", label: "100 000 – 200 000 ₽" },
  { value: "HIGH", label: "200 000 – 400 000 ₽" },
  { value: "PREMIUM", label: "400 000 ₽+" },
  { value: "UNKNOWN", label: "Пока не знаю" },
];

// ========== Travelers ==========
export type Travelers = "SOLO" | "COUPLE" | "FAMILY" | "FRIENDS" | "GROUP";

export const TRAVELERS_OPTIONS: DomainOption<Travelers>[] = [
  { value: "SOLO", label: "Один/одна" },
  { value: "COUPLE", label: "Пара или семья без детей" },
  { value: "FAMILY", label: "Семья с детьми" },
  { value: "FRIENDS", label: "Компания друзей" },
  { value: "GROUP", label: "Группа" },
];

// ========== Region ==========
export type Region =
  | "MEDITERRANEAN"
  | "NORTHERN_EUROPE"
  | "CARIBBEAN"
  | "ASIA"
  | "EXOTIC"
  | "UNKNOWN";

export const REGION_OPTIONS: DomainOption<Region>[] = [
  { value: "MEDITERRANEAN", label: "Средиземное море" },
  { value: "NORTHERN_EUROPE", label: "Северная Европа и фьорды" },
  { value: "CARIBBEAN", label: "Карибы" },
  { value: "ASIA", label: "Азия" },
  { value: "EXOTIC", label: "Экзотика (Австралия, Южная Америка, Африка, Океания)" },
  { value: "UNKNOWN", label: "Пока не определился" },
];

// ========== Dates ==========
export type DateRange = "SOON" | "ONE_TO_THREE" | "THREE_TO_SIX" | "MORE_THAN_SIX" | "UNKNOWN";

export const DATE_RANGE_OPTIONS: DomainOption<DateRange>[] = [
  { value: "SOON", label: "В ближайший месяц" },
  { value: "ONE_TO_THREE", label: "Через 1-3 месяца" },
  { value: "THREE_TO_SIX", label: "Через 3-6 месяцев" },
  { value: "MORE_THAN_SIX", label: "Более чем через полгода" },
  { value: "UNKNOWN", label: "Пока не определился" },
];

// ========== Priorities ==========
export type Priority =
  | "COMFORT"
  | "RELAX"
  | "EXCURSIONS"
  | "ENTERTAINMENT"
  | "NO_KIDS"
  | "PRICE"
  | "UNKNOWN";

export const PRIORITY_OPTIONS: DomainOption<Priority>[] = [
  { value: "COMFORT", label: "Комфорт и сервис" },
  { value: "RELAX", label: "Спокойный отдых" },
  { value: "EXCURSIONS", label: "Экскурсии" },
  { value: "ENTERTAINMENT", label: "Развлечения" },
  { value: "NO_KIDS", label: "Минимум детей" },
  { value: "PRICE", label: "Цена" },
  { value: "UNKNOWN", label: "Пока не определился" },
];

// ========== Helpers для получения label по value (для отображения) ==========
export function getLabelForBudget(value: Budget): string {
  return BUDGET_OPTIONS.find((opt) => opt.value === value)?.label ?? "";
}

export function getLabelForTravelers(value: Travelers): string {
  return TRAVELERS_OPTIONS.find((opt) => opt.value === value)?.label ?? "";
}

export function getLabelForRegion(value: Region): string {
  return REGION_OPTIONS.find((opt) => opt.value === value)?.label ?? "";
}

export function getLabelForDateRange(value: DateRange): string {
  return DATE_RANGE_OPTIONS.find((opt) => opt.value === value)?.label ?? "";
}

export function getLabelForPriority(value: Priority): string {
  return PRIORITY_OPTIONS.find((opt) => opt.value === value)?.label ?? "";
}
