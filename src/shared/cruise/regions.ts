/**
 * 🌍 Регионы круизов — единый источник правды
 *
 * Лежит в shared, потому что нужен и поиску (фильтр), и админке (выпадающий
 * список в форме). Значения совпадают посимвольно с тем, что хранится в колонке
 * cruises.region: сравнение в SQL строгое, разночтения молча ломают поиск.
 */

export const CRUISE_REGIONS = [
  "Средиземное море",
  "Карибы",
  "Скандинавия",
  "Аляска",
  "Азия",
] as const;

export type CruiseRegion = (typeof CRUISE_REGIONS)[number];

/** Картинка по региону: персональных изображений у круизов пока нет */
export const REGION_IMAGE: Record<CruiseRegion, string> = {
  "Средиземное море": "/images/destinations/mediterranean.jpg",
  Карибы: "/images/destinations/caribbean.jpg",
  Скандинавия: "/images/destinations/scandinavia.jpg",
  Аляска: "/images/destinations/alaska.jpg",
  Азия: "/images/destinations/asia.jpg",
};
