import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { DESTINATIONS } from "../../data/destinations";
import type { Destination } from "../../types";

// ─── Featured card (большая левая карточка) ─────────────────────────────────
function FeaturedCard({ destination }: { destination: Destination }) {
  return (
    <article className="relative rounded-2xl overflow-hidden bg-slate-900 row-span-2">
      <Link
        href={`/destinations/${destination.slug}`}
        className="group block h-full"
        aria-label={`${destination.name} — ${destination.description}`}
      >
        {/* Image */}
        <div className="relative h-140 md:h-full min-h-105 w-full overflow-hidden">
          <Image
            src={destination.image}
            alt={`Круизы в ${destination.name}`}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/30 to-black/80" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-between p-6">
          <Badge
            variant="secondary"
            className="self-start bg-white/15 text-white/90 border border-white/20 backdrop-blur-md hover:bg-white/20"
          >
            {destination.cruisesCount} круизов
          </Badge>

          <div className="flex flex-col gap-2">
            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
              {destination.name}
            </h3>
            <p className="text-sm text-white/70 leading-relaxed">{destination.description}</p>
            <span className="mt-2 inline-block text-sm font-semibold text-white opacity-0 translate-y-1.5 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
              Смотреть круизы →
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

// ─── Small card (правая сетка) ───────────────────────────────────────────────
function SmallCard({ destination }: { destination: Destination }) {
  return (
    <article className="relative rounded-2xl overflow-hidden bg-slate-900">
      <Link
        href={`/destinations/${destination.slug}`}
        className="group block"
        aria-label={`${destination.name} — ${destination.description}`}
      >
        {/* Image */}
        <div className="relative h-65 w-full overflow-hidden">
          <Image
            src={destination.image}
            alt={`Круизы в ${destination.name}`}
            fill
            loading="lazy"
            sizes="(max-width: 900px) 100vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/20 to-black/75" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-between p-5">
          <Badge
            variant="secondary"
            className="self-start bg-white/15 text-white/90 border border-white/20 backdrop-blur-md hover:bg-white/20"
          >
            {destination.cruisesCount} круизов
          </Badge>

          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-bold text-white tracking-tight">{destination.name}</h3>
            {/* Описание скрыто на мобилке, показывается на md+ */}
            <p className="hidden md:block text-sm text-white/65 leading-snug">
              {destination.description}
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────
export function DestinationsGrid() {
  const featured = DESTINATIONS.find((d) => d.featured);
  const rest = DESTINATIONS.filter((d) => !d.featured);

  return (
    <section
      aria-labelledby="destinations-heading"
      className="bg-white px-4 py-16 sm:px-6 sm:py-24"
    >
      {/* Header */}
      <div className="mx-auto mb-14 max-w-7xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
          Куда отправиться
        </p>
        <h2
          id="destinations-heading"
          className="mb-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl"
          style={{ lineHeight: 1.1 }}
        >
          Популярные направления
        </h2>
        <p className="max-w-lg text-base leading-relaxed text-slate-500 sm:text-[17px]">
          Откройте мир вместе с нашими экспертами — от средиземноморских побережий до арктических
          фьордов
        </p>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-7xl" role="list">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {featured && <FeaturedCard destination={featured} />}

          {/* Subgrid 2×2 для остальных */}
          <div className="grid grid-cols-2 gap-4" role="list">
            {rest.map((dest) => (
              <SmallCard key={dest.id} destination={dest} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
