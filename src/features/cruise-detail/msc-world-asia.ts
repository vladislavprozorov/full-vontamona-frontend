// src/features/cruise-detail/data/msc-world-asia.data.ts

export interface CruiseBadge {
  label: string;
}

export const mscWorldAsia = {
  slug: "msc-world-asia",
  title: "MSC World Asia",
  region: "Средиземное море",
  startDate: "4 декабря 2026",
  countries: "Италия, Греция, Испания, Франция",
  imageUrl: "https://img.pac.ru/cruise/ships_gallery/World_Asia/01.jpg",
  imageAlt: "Лайнер MSC World Asia",

  badges: [{ label: "НОВИНКА" }, { label: "МОРСКИЕ КРУИЗЫ" }] satisfies CruiseBadge[],

  hero: {
    eyebrow: "VONTAMONA · НОВИНКИ СЕЗОНА",
    headline: "MSC World Asia",
    subheadline:
      "Новый лайнер в Средиземном море с 4 декабря 2026. 22 палубы, аквапарк, 13 ресторанов и MSC Yacht Club.",
    hint: "✓ Отплытие 4 декабря 2026 · Средиземное море · Ограниченные места",
  },

  about: {
    eyebrow: "О ЛАЙНЕРЕ",
    headline: "Революция на море",
    body: "MSC World Asia — четвёртый лайнер флота MSC на сжиженном газе. Судно оснащено системой управления подводным шумом и усовершенствованными системами очистки, минимизируя воздействие на морскую флору и фауну.",
  },

  features: [
    "22 палубы",
    "Более 40 000 м² общественных пространств",
    "6 бассейнов и 14 джакузи",
    "Горка высотой 11 палуб",
    "13 ресторанов и 20 баров",
    "Детские клубы от 0 до 17 лет",
    "MSC Yacht Club — сьюты и дворецкий",
    "Работает на сжиженном газе (LNG)",
  ] satisfies string[],

  yachtClub: {
    badge: "ЭКСКЛЮЗИВ",
    headline: "MSC Yacht Club",
    body: "Просторные сьюты, собственный лаунж и ресторан, бассейн с террасой для загара, круглосуточные услуги консьержа и дворецкого.",
    cta: "Запросить стоимость →",
  },

  seo: {
    title: "MSC World Asia — круизы по Средиземному морю 2026 | Vontamona",
    description:
      "Забронируйте круиз на MSC World Asia — новом лайнере в Средиземном море с 4 декабря 2026. 22 палубы, аквапарк, MSC Yacht Club. Подбор через Vontamona.",
  },
} as const;

export type MscWorldAsiaData = typeof mscWorldAsia;
