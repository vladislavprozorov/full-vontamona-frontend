import type { CruiseOffer } from "./cruise-catalog";

export interface CruiseSearchQuery {
  /** Регион круиза */
  region?: string;
  /** Начало диапазона дат отправления, YYYY-MM-DD */
  from?: string;
  /** Конец диапазона дат отправления, YYYY-MM-DD */
  to?: string;
  /** Длительность: "0-7" | "8-10" | "11+" */
  nights?: string;
  /**
   * Количество гостей. НЕ фильтрует каталог (данных о вместимости кают нет) —
   * передаётся дальше в заявку, чтобы менеджер видел состав.
   */
  guests?: string;
}

export const NIGHTS_OPTIONS = [
  { value: "0-7", label: "До 7 ночей" },
  { value: "8-10", label: "8–10 ночей" },
  { value: "11+", label: "11 ночей и больше" },
] as const;

function matchesNights(nights: number, range: string): boolean {
  if (range === "0-7") return nights <= 7;
  if (range === "8-10") return nights >= 8 && nights <= 10;
  if (range === "11+") return nights >= 11;
  return true;
}

export function filterCruises(
  catalog: readonly CruiseOffer[],
  query: CruiseSearchQuery,
): CruiseOffer[] {
  return catalog
    .filter((cruise) => {
      if (query.region && cruise.region !== query.region) return false;
      // Даты в ISO (YYYY-MM-DD) сравниваются лексикографически корректно
      if (query.from && cruise.departureDate < query.from) return false;
      if (query.to && cruise.departureDate > query.to) return false;
      if (query.nights && !matchesNights(cruise.nights, query.nights)) return false;
      return true;
    })
    .sort((a, b) => a.departureDate.localeCompare(b.departureDate));
}

export function formatPrice(priceFrom?: number): string {
  if (!priceFrom) return "Цена по запросу";
  return `от ${priceFrom.toLocaleString("ru-RU")} ₽`;
}

export function formatDepartureDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00`);
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

/** Склонение: 1 гость / 2 гостя / 5 гостей */
export function formatGuests(guests: number): string {
  const lastTwo = guests % 100;
  const last = guests % 10;
  if (lastTwo >= 11 && lastTwo <= 14) return `${guests} гостей`;
  if (last === 1) return `${guests} гость`;
  if (last >= 2 && last <= 4) return `${guests} гостя`;
  return `${guests} гостей`;
}

/** Склонение: 1 ночь / 2 ночи / 5 ночей */
export function formatNights(nights: number): string {
  const lastTwo = nights % 100;
  const last = nights % 10;
  if (lastTwo >= 11 && lastTwo <= 14) return `${nights} ночей`;
  if (last === 1) return `${nights} ночь`;
  if (last >= 2 && last <= 4) return `${nights} ночи`;
  return `${nights} ночей`;
}
