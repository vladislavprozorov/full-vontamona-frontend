/**
 * 🗄 Доступ к таблице cruises для админки
 *
 * Побочные эффекты — только здесь. В отличие от публичного поиска, админка
 * видит ВСЁ: и черновики, и уже отплывшие рейсы, иначе их нельзя было бы
 * отредактировать.
 *
 * Все значения передаются параметрами ($1, $2, ...), не склейкой строк.
 */

import { z } from "zod";
import { getDb } from "@/shared/db/client";
import type { CruiseInput } from "./cruise-admin.schema";

/**
 * region здесь просто string, а не enum регионов: если в базе окажется
 * значение не из списка, администратор должен увидеть такой круиз в таблице
 * и починить его, а не потерять из виду.
 */
const adminCruiseSchema = z.object({
  id: z.string(),
  title: z.string(),
  ship: z.string(),
  departure_port: z.string(),
  region: z.string(),
  departure_date: z.string(),
  nights: z.number().int(),
  price_from: z.number().int().nullable(),
  is_published: z.boolean(),
  slug: z.string(),
  line: z.string().nullable(),
  countries: z.string().nullable(),
  description: z.string().nullable(),
  itinerary: z.array(z.string()),
});

export interface AdminCruise {
  id: string;
  title: string;
  ship: string;
  departurePort: string;
  region: string;
  departureDate: string;
  nights: number;
  priceFrom: number | null;
  isPublished: boolean;
  slug: string;
  line: string | null;
  countries: string | null;
  description: string | null;
  itinerary: string[];
}

const SELECT_FIELDS = `id,
          title,
          ship,
          departure_port,
          region,
          to_char(departure_date, 'YYYY-MM-DD') AS departure_date,
          nights,
          price_from,
          is_published,
          slug,
          line,
          countries,
          description,
          itinerary`;

function toAdminCruise(row: unknown): AdminCruise {
  const parsed = adminCruiseSchema.parse(row);
  return {
    id: parsed.id,
    title: parsed.title,
    ship: parsed.ship,
    departurePort: parsed.departure_port,
    region: parsed.region,
    departureDate: parsed.departure_date,
    nights: parsed.nights,
    priceFrom: parsed.price_from,
    isPublished: parsed.is_published,
    slug: parsed.slug,
    line: parsed.line,
    countries: parsed.countries,
    description: parsed.description,
    itinerary: parsed.itinerary,
  };
}

/** Все круизы: сначала ближайшие отправления */
export async function listCruises(): Promise<AdminCruise[]> {
  const { rows } = await getDb().query(
    `SELECT ${SELECT_FIELDS} FROM cruises ORDER BY departure_date DESC`,
  );
  return rows.map(toAdminCruise);
}

export async function getCruise(id: string): Promise<AdminCruise | null> {
  const { rows } = await getDb().query(`SELECT ${SELECT_FIELDS} FROM cruises WHERE id = $1`, [id]);
  return rows.length > 0 ? toAdminCruise(rows[0]) : null;
}

export async function insertCruise(input: CruiseInput, slug: string): Promise<string> {
  const { rows } = await getDb().query(
    `INSERT INTO cruises (title, ship, departure_port, region, departure_date, nights, price_from,
                          is_published, slug, line, countries, description, itinerary)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
     RETURNING id`,
    [
      input.title,
      input.ship,
      input.departurePort,
      input.region,
      input.departureDate,
      input.nights,
      input.priceFrom,
      input.isPublished,
      slug,
      input.line,
      input.countries,
      input.description,
      input.itinerary,
    ],
  );
  return z.string().parse(rows[0].id);
}

/** slug сознательно не обновляется: адрес страницы выдаётся один раз и не меняется */
export async function updateCruise(id: string, input: CruiseInput): Promise<boolean> {
  const { rowCount } = await getDb().query(
    `UPDATE cruises
        SET title = $2,
            ship = $3,
            departure_port = $4,
            region = $5,
            departure_date = $6,
            nights = $7,
            price_from = $8,
            is_published = $9,
            line = $10,
            countries = $11,
            description = $12,
            itinerary = $13
      WHERE id = $1`,
    [
      id,
      input.title,
      input.ship,
      input.departurePort,
      input.region,
      input.departureDate,
      input.nights,
      input.priceFrom,
      input.isPublished,
      input.line,
      input.countries,
      input.description,
      input.itinerary,
    ],
  );
  return rowCount === 1;
}

export async function deleteCruise(id: string): Promise<boolean> {
  const { rowCount } = await getDb().query("DELETE FROM cruises WHERE id = $1", [id]);
  return rowCount === 1;
}

/** Переключить публикацию, не открывая форму. Возвращает новое состояние. */
export async function toggleCruisePublished(id: string): Promise<boolean | null> {
  const { rows } = await getDb().query(
    "UPDATE cruises SET is_published = NOT is_published WHERE id = $1 RETURNING is_published",
    [id],
  );
  return rows.length > 0 ? z.boolean().parse(rows[0].is_published) : null;
}
