/**
 * 🚢 Cruise Queries — чтение круизов из БД
 *
 * Побочные эффекты (походы в базу) вынесены сюда и не смешиваются с чистой
 * логикой в search.ts — как quiz.persistence.ts у квиза.
 *
 * Все значения из query подставляются параметрами ($1, $2, ...), а не склейкой
 * строк: драйвер отправляет их отдельно от текста запроса, поэтому SQL-инъекция
 * невозможна в принципе.
 *
 * Публичные правила видимости — в одном месте, в PUBLIC_CONDITIONS: черновики
 * администратора и уже отплывшие рейсы наружу не показываются.
 */

import { z } from "zod";
import { CRUISE_REGIONS, REGION_IMAGE } from "@/shared/cruise/regions";
import { getDb } from "@/shared/db/client";
import type { CruiseOffer } from "./cruise-catalog";
import type { CruiseSearchQuery } from "./search";

/** Круиз со всем, что нужно странице круиза */
export interface CruiseDetails extends CruiseOffer {
  description: string | null;
  itinerary: string[];
}

const cruiseRowSchema = z.object({
  slug: z.string(),
  title: z.string(),
  ship: z.string(),
  line: z.string().nullable(),
  departure_port: z.string(),
  countries: z.string().nullable(),
  region: z.enum(CRUISE_REGIONS),
  /** to_char в запросе отдаёт дату строкой YYYY-MM-DD, а не объектом Date */
  departure_date: z.string(),
  nights: z.number().int(),
  price_from: z.number().int().nullable(),
  description: z.string().nullable(),
  itinerary: z.array(z.string()),
});

type CruiseRow = z.infer<typeof cruiseRowSchema>;

/**
 * Длительность приходит из UI как "0-7" | "8-10" | "11+".
 * Условия заданы таблицей, а не собираются из пришедшей строки —
 * в SQL попадает только то, что написано здесь.
 */
const NIGHTS_CONDITION: Record<string, string> = {
  "0-7": "nights <= 7",
  "8-10": "nights BETWEEN 8 AND 10",
  "11+": "nights >= 11",
};

const PUBLIC_CONDITIONS = ["is_published = true", "departure_date >= current_date"];

const SELECT_FIELDS = `slug,
          title,
          ship,
          line,
          departure_port,
          countries,
          region,
          to_char(departure_date, 'YYYY-MM-DD') AS departure_date,
          nights,
          price_from,
          description,
          itinerary`;

function toCruiseDetails(row: CruiseRow): CruiseDetails {
  return {
    slug: row.slug,
    title: row.title,
    ship: row.ship,
    line: row.line ?? undefined,
    region: row.region,
    departurePort: row.departure_port,
    countries: row.countries ?? undefined,
    departureDate: row.departure_date,
    nights: row.nights,
    priceFrom: row.price_from ?? undefined,
    image: REGION_IMAGE[row.region],
    href: `/cruises/${row.slug}`,
    description: row.description,
    itinerary: row.itinerary,
  };
}

export async function searchCruises(query: CruiseSearchQuery): Promise<CruiseDetails[]> {
  const conditions = [...PUBLIC_CONDITIONS];
  const values: (string | number)[] = [];

  const addParam = (value: string | number): string => {
    values.push(value);
    return `$${values.length}`;
  };

  if (query.region) conditions.push(`region = ${addParam(query.region)}`);
  if (query.from) conditions.push(`departure_date >= ${addParam(query.from)}`);
  if (query.to) conditions.push(`departure_date <= ${addParam(query.to)}`);

  const nightsCondition = query.nights ? NIGHTS_CONDITION[query.nights] : undefined;
  if (nightsCondition) conditions.push(nightsCondition);

  const { rows } = await getDb().query(
    `SELECT ${SELECT_FIELDS}
       FROM cruises
      WHERE ${conditions.join("\n        AND ")}
      ORDER BY departure_date`,
    values,
  );

  const offers: CruiseDetails[] = [];

  for (const row of rows) {
    const parsed = cruiseRowSchema.safeParse(row);

    if (parsed.success) {
      offers.push(toCruiseDetails(parsed.data));
      continue;
    }

    // Одна кривая строка не должна ронять всю страницу поиска.
    // Чаще всего это регион, которого нет в CRUISE_REGIONS.
    console.error("Круиз не прошёл валидацию и пропущен:", row, parsed.error.issues);
  }

  return offers;
}

/** Круиз для публичной страницы. null — не найден, снят с публикации или уже отплыл */
export async function getPublishedCruiseBySlug(slug: string): Promise<CruiseDetails | null> {
  const { rows } = await getDb().query(
    `SELECT ${SELECT_FIELDS}
       FROM cruises
      WHERE ${PUBLIC_CONDITIONS.join("\n        AND ")}
        AND slug = $1`,
    [slug],
  );

  if (rows.length === 0) return null;

  const parsed = cruiseRowSchema.safeParse(rows[0]);
  if (!parsed.success) {
    console.error("Круиз не прошёл валидацию:", rows[0], parsed.error.issues);
    return null;
  }

  return toCruiseDetails(parsed.data);
}
