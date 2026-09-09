/**
 * 📋 Схемы админки круизов
 *
 * Две схемы намеренно:
 *
 * 1. formSchema  — то, что реально лежит в полях формы. Все значения строковые,
 *    потому что <input> всегда отдаёт строку. Здесь проверяем формат.
 * 2. inputSchema — то, что уходит в базу: с числами и null. Ею же Server Action
 *    проверяет payload повторно.
 *
 * Почему проверяем дважды: клиентская валидация — это удобство пользователя,
 * а не защита. Запрос к Server Action можно отправить в обход формы, поэтому
 * сервер обязан проверять всё сам и никогда не доверять присланному.
 */

import { z } from "zod";
import { CRUISE_REGIONS } from "@/shared/cruise/regions";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const DIGITS_RE = /^\d+$/;

export const cruiseFormSchema = z.object({
  title: z.string().trim().min(1, "Укажите название").max(200, "Слишком длинное название"),
  ship: z.string().trim().min(1, "Укажите лайнер").max(120, "Слишком длинное название"),
  departurePort: z.string().trim().min(1, "Укажите порт отправления").max(120, "Слишком длинно"),
  region: z.enum(CRUISE_REGIONS, { message: "Выберите направление" }),
  departureDate: z.string().regex(DATE_RE, "Укажите дату отправления"),
  nights: z
    .string()
    .regex(DIGITS_RE, "Только целое число")
    .refine((v) => Number(v) >= 1 && Number(v) <= 365, "От 1 до 365 ночей"),
  /** Пустая строка = цена не указана, на сайте будет «Цена по запросу» */
  priceFrom: z
    .string()
    .refine((v) => v === "" || DIGITS_RE.test(v), "Только целое число рублей")
    .refine((v) => v === "" || Number(v) > 0, "Цена должна быть больше нуля"),
  /** Необязательные поля страницы круиза — пустая строка значит «не заполнено» */
  line: z.string().trim().max(120, "Слишком длинно"),
  countries: z.string().trim().max(300, "Слишком длинно"),
  description: z.string().trim().max(4000, "Слишком длинное описание"),
  /** Маршрут: по строке на день, разделены переводом строки */
  itinerary: z.string().max(4000, "Слишком длинный маршрут"),
  isPublished: z.boolean(),
});

export type CruiseFormValues = z.infer<typeof cruiseFormSchema>;

export const cruiseInputSchema = z.object({
  title: z.string().trim().min(1).max(200),
  ship: z.string().trim().min(1).max(120),
  departurePort: z.string().trim().min(1).max(120),
  region: z.enum(CRUISE_REGIONS),
  departureDate: z.string().regex(DATE_RE),
  nights: z.number().int().min(1).max(365),
  priceFrom: z.number().int().positive().nullable(),
  line: z.string().max(120).nullable(),
  countries: z.string().max(300).nullable(),
  description: z.string().max(4000).nullable(),
  itinerary: z.array(z.string().min(1)).max(60),
  isPublished: z.boolean(),
});

export type CruiseInput = z.infer<typeof cruiseInputSchema>;

/** Значения формы → payload для базы */
export function toCruiseInput(values: CruiseFormValues): CruiseInput {
  return {
    title: values.title.trim(),
    ship: values.ship.trim(),
    departurePort: values.departurePort.trim(),
    region: values.region,
    departureDate: values.departureDate,
    nights: Number(values.nights),
    priceFrom: values.priceFrom === "" ? null : Number(values.priceFrom),
    line: emptyToNull(values.line),
    countries: emptyToNull(values.countries),
    description: emptyToNull(values.description),
    // Пустые строки и лишние пробелы между днями маршрута отбрасываем
    itinerary: values.itinerary
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0),
    isPublished: values.isPublished,
  };
}

/** В базе «не заполнено» — это NULL, а не пустая строка */
function emptyToNull(value: string): string | null {
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}
