/**
 * 🚢 Каталог круизов (ведётся вручную)
 *
 * ⚠️ ВАЖНО ПЕРЕД ПУБЛИКАЦИЕЙ:
 * Реальные предложения здесь только два — `msc-bellissima-asia` и `msc-world-asia`
 * (данные взяты из существующих страниц круизов).
 * Все остальные записи помечены `isExample: true` — это ПРИМЕРЫ для демонстрации
 * поиска, цены и даты в них условные. Замените их настоящими предложениями
 * или удалите, прежде чем показывать клиентам.
 *
 * Позже каталог переедет в CMS/БД — структура полей специально сделана такой,
 * чтобы перенос был механическим.
 */

export const CRUISE_REGIONS = [
  "Средиземное море",
  "Карибы",
  "Скандинавия",
  "Аляска",
  "Азия",
] as const;

export type CruiseRegion = (typeof CRUISE_REGIONS)[number];

export interface CruiseOffer {
  slug: string;
  title: string;
  /** Лайнер */
  ship: string;
  /** Круизная компания */
  line: string;
  region: CruiseRegion;
  /** Порт отправления */
  departurePort: string;
  countries: string;
  /** Дата отправления в формате ISO (YYYY-MM-DD) */
  departureDate: string;
  nights: number;
  /** Цена от, ₽ за человека. Не указана — покажем «Цена по запросу» */
  priceFrom?: number;
  image: string;
  /** Ссылка на детальную страницу, если она есть */
  href?: string;
  badges?: string[];
  /** true — демонстрационная запись с условными данными */
  isExample?: boolean;
}

/** Картинка по региону (локальные файлы уже есть в /public) */
const REGION_IMAGE: Record<CruiseRegion, string> = {
  "Средиземное море": "/images/destinations/mediterranean.jpg",
  Карибы: "/images/destinations/caribbean.jpg",
  Скандинавия: "/images/destinations/scandinavia.jpg",
  Аляска: "/images/destinations/alaska.jpg",
  Азия: "/images/destinations/asia.jpg",
};

export const CRUISE_CATALOG: readonly CruiseOffer[] = [
  // ✅ Реальные предложения
  {
    slug: "msc-bellissima-asia",
    title: "Китай, Корея и Япония из Шанхая",
    ship: "MSC Bellissima",
    line: "MSC Cruises",
    region: "Азия",
    departurePort: "Шанхай",
    countries: "Китай, Корея, Япония",
    departureDate: "2026-08-05",
    nights: 9,
    priceFrom: 126893,
    image: REGION_IMAGE["Азия"],
    href: "/cruises/msc-bellissima-asia",
    badges: ["Безвизовый въезд", "Прямой перелёт"],
  },
  {
    slug: "msc-world-asia",
    title: "Средиземное море на новом лайнере",
    ship: "MSC World Asia",
    line: "MSC Cruises",
    region: "Средиземное море",
    departurePort: "Барселона",
    countries: "Италия, Греция, Испания, Франция",
    departureDate: "2026-12-04",
    nights: 7,
    // цена не опубликована — покажем «Цена по запросу»
    image: REGION_IMAGE["Средиземное море"],
    href: "/cruises/msc-world-asia",
    badges: ["Новинка", "MSC Yacht Club"],
  },

  // ⚠️ Примеры — заменить реальными данными
  {
    slug: "example-mediterranean-italy-greece",
    title: "Италия и Греция из Рима",
    ship: "MSC Seaside",
    line: "MSC Cruises",
    region: "Средиземное море",
    departurePort: "Рим (Чивитавеккья)",
    countries: "Италия, Греция, Мальта",
    departureDate: "2026-09-12",
    nights: 7,
    priceFrom: 89000,
    image: REGION_IMAGE["Средиземное море"],
    isExample: true,
  },
  {
    slug: "example-caribbean-bahamas",
    title: "Багамы и Восточные Карибы",
    ship: "MSC Divina",
    line: "MSC Cruises",
    region: "Карибы",
    departurePort: "Майами",
    countries: "США, Багамы, Ямайка",
    departureDate: "2026-11-07",
    nights: 7,
    priceFrom: 112000,
    image: REGION_IMAGE.Карибы,
    isExample: true,
  },
  {
    slug: "example-caribbean-long",
    title: "Большое карибское кольцо",
    ship: "Costa Pacifica",
    line: "Costa Cruises",
    region: "Карибы",
    departurePort: "Гваделупа",
    countries: "Гваделупа, Барбадос, Сент-Люсия",
    departureDate: "2027-01-16",
    nights: 12,
    priceFrom: 168000,
    image: REGION_IMAGE.Карибы,
    isExample: true,
  },
  {
    slug: "example-scandinavia-fjords",
    title: "Норвежские фьорды",
    ship: "MSC Preziosa",
    line: "MSC Cruises",
    region: "Скандинавия",
    departurePort: "Копенгаген",
    countries: "Норвегия, Дания",
    departureDate: "2027-06-05",
    nights: 6,
    priceFrom: 97000,
    image: REGION_IMAGE.Скандинавия,
    isExample: true,
  },
  {
    slug: "example-alaska-glaciers",
    title: "Ледники Аляски",
    ship: "Norwegian Bliss",
    line: "Norwegian Cruise Line",
    region: "Аляска",
    departurePort: "Сиэтл",
    countries: "США, Канада",
    departureDate: "2027-07-10",
    nights: 7,
    priceFrom: 154000,
    image: REGION_IMAGE.Аляска,
    isExample: true,
  },
  {
    slug: "example-asia-japan",
    title: "Япония и Южная Корея",
    ship: "MSC Bellissima",
    line: "MSC Cruises",
    region: "Азия",
    departurePort: "Иокогама",
    countries: "Япония, Южная Корея",
    departureDate: "2027-04-18",
    nights: 10,
    priceFrom: 143000,
    image: REGION_IMAGE.Азия,
    isExample: true,
  },
] as const;
