"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CRUISE_NOVELTIES } from "@/features/cruise-detail/model/novelties";

type Novelty = (typeof CRUISE_NOVELTIES)[number];

function getTopBadges(cruise: Novelty) {
  const labels = cruise.badges.map((b) => b.label).filter((label) => label !== "НОВИНКА");

  const regionLabel = cruise.region === "Азия" ? "Китай" : cruise.region;

  return ["Новинка", regionLabel, ...labels].slice(0, 4);
}

function NoveltyCard({ cruise }: { cruise: Novelty }) {
  const topBadges = getTopBadges(cruise);

  return (
    <article className="relative overflow-hidden rounded-2xl border bg-card">
      <Link href={`/cruises/${cruise.slug}`} className="group block" aria-label={cruise.title}>
        <div className="relative h-72 md:h-80">
          <Image
            src={cruise.imageUrl}
            alt={cruise.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 640px"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            unoptimized
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
        </div>

        <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-2">
            {topBadges.map((label) => (
              <Badge
                key={label}
                variant="secondary"
                className="bg-white/15 text-white/90 border border-white/20 backdrop-blur-md hover:bg-white/20"
              >
                {label}
              </Badge>
            ))}
          </div>

          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
              {cruise.hero.headline}
            </h3>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed line-clamp-2">
              {cruise.hero.subheadline}
            </p>

            <p className="text-xs sm:text-sm text-white/70">
              {"details" in cruise
                ? `Даты: ${cruise.details.dates.join(", ")} · ${cruise.details.priceFrom}`
                : `Старт: ${cruise.startDate} · ${cruise.countries}`}
            </p>

            <span className="inline-flex items-center gap-2 text-sm font-semibold text-white">
              Узнать подробнее{" "}
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                →
              </span>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

function NoveltiesCarousel() {
  return (
    <Carousel opts={{ align: "start" }} className="md:hidden" aria-label="Новинки круизов">
      <CarouselContent className="-ml-3">
        {CRUISE_NOVELTIES.map((cruise) => (
          <CarouselItem key={cruise.slug} className="pl-3 basis-[88%] sm:basis-[70%]">
            <NoveltyCard cruise={cruise} />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur" />
      <CarouselNext className="right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur" />
    </Carousel>
  );
}

export function CruiseNoveltiesSection() {
  return (
    <section aria-labelledby="novelties-heading" className="py-12 sm:py-18 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 sm:mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
              Новинки
            </p>
            <h2 id="novelties-heading" className="text-3xl sm:text-4xl font-bold tracking-tight">
              Новинки круизов, которые нельзя пропустить
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Сохранили всё важное: даты, маршрут и стоимость — переходите к деталям.
            </p>
          </div>

          <Button asChild variant="outline" className="w-fit">
            <Link href="/consultation">Подобрать круиз</Link>
          </Button>
        </div>

        <NoveltiesCarousel />

        <div className="hidden md:grid gap-4 md:grid-cols-2">
          {CRUISE_NOVELTIES.map((cruise) => (
            <NoveltyCard key={cruise.slug} cruise={cruise} />
          ))}
        </div>
      </div>
    </section>
  );
}
