/**
 * Cruise Destinations
 * Направления для морских круизов
 */

export interface CruiseDestination {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export const CRUISE_DESTINATIONS: readonly CruiseDestination[] = [
  {
    id: "mediterranean",
    name: "Средиземное море",
    slug: "mediterranean",
    description: "Италия, Греция, Испания - жемчужины Средиземноморья",
  },
  {
    id: "caribbean",
    name: "Карибы",
    slug: "caribbean",
    description: "Тропический рай с белоснежными пляжами",
  },
  {
    id: "scandinavia",
    name: "Скандинавия",
    slug: "scandinavia",
    description: "Фьорды Норвегии и северная красота",
  },
  {
    id: "alaska",
    name: "Аляска",
    slug: "alaska",
    description: "Ледники, киты и дикая природа севера",
  },
] as const;
