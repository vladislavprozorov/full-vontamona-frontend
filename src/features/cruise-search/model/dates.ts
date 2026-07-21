/** Работа с датами без внешних библиотек — нативные Date + Intl */

const pad = (n: number) => String(n).padStart(2, "0");

/** Date → "YYYY-MM-DD" (в локальной зоне, без сдвига UTC) */
export function toISODate(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/** "YYYY-MM-DD" → Date (полночь локального времени) */
export function fromISODate(iso: string): Date {
  return new Date(`${iso}T00:00:00`);
}

export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function addMonths(date: Date, count: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + count, 1);
}

export function isSameDay(a: Date, b: Date): boolean {
  return toISODate(a) === toISODate(b);
}

/** Сегодня в полночь — для отсечения прошедших дат */
export function today(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

/**
 * Сетка месяца, неделя начинается с понедельника.
 * null — пустая ячейка до первого числа.
 */
export function getMonthMatrix(monthStart: Date): (Date | null)[] {
  const year = monthStart.getFullYear();
  const month = monthStart.getMonth();

  // getDay(): 0=вс..6=сб → переводим в понедельник-первый
  const leadingBlanks = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (Date | null)[] = Array.from({ length: leadingBlanks }, () => null);
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(new Date(year, month, day));
  }
  return cells;
}

export const WEEKDAY_LABELS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"] as const;

const monthTitleFormatter = new Intl.DateTimeFormat("ru-RU", { month: "long", year: "numeric" });

export function formatMonthTitle(date: Date): string {
  const title = monthTitleFormatter.format(date).replace(" г.", "");
  return title.charAt(0).toUpperCase() + title.slice(1);
}

const shortDateFormatter = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "short" });

/** Подпись диапазона для триггера: «12 сен — 20 сен» */
export function formatRangeLabel(from?: string, to?: string): string {
  if (!from) return "Любая дата";
  const fromLabel = shortDateFormatter.format(fromISODate(from)).replace(".", "");
  if (!to) return `с ${fromLabel}`;
  const toLabel = shortDateFormatter.format(fromISODate(to)).replace(".", "");
  return `${fromLabel} — ${toLabel}`;
}
