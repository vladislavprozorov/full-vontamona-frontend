import type { Destination } from "../types";

export const DESTINATIONS: readonly Destination[] = [
  {
    id: 1,
    name: "Средиземное море",
    slug: "sredizemnoe-more",
    description: "Италия, Греция, Испания — жемчужины Европы",
    image: "/images/destinations/mediterranean.jpg",
    featured: true,
    cruisesCount: 48,
  },
  {
    id: 2,
    name: "Карибы",
    slug: "kariby",
    description: "Тропический рай с бирюзовой водой",
    image: "/images/destinations/caribbean.jpg",
    featured: false,
    cruisesCount: 32,
  },
  {
    id: 3,
    name: "Скандинавия",
    slug: "skandinaviya",
    description: "Фьорды, полярное сияние, северная магия",
    image: "/images/destinations/scandinavia.jpg",
    featured: false,
    cruisesCount: 24,
  },
  {
    id: 4,
    name: "Аляска",
    slug: "alyaska",
    description: "Ледники, киты и дикая природа",
    image: "/images/destinations/alaska.jpg",
    featured: false,
    cruisesCount: 18,
  },
  {
    id: 5,
    name: "Азия",
    slug: "aziya",
    description: "Япония, Таиланд, Сингапур",
    image: "/images/destinations/asia.jpg",
    featured: false,
    cruisesCount: 21,
  },
] as const;
