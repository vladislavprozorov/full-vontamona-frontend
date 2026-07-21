import { Anchor, CalendarDays, Moon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { CruiseOffer } from "../model/cruise-catalog";
import { formatDepartureDate, formatNights, formatPrice } from "../model/search";

export function CruiseCard({ cruise }: { cruise: CruiseOffer }) {
  // Если детальной страницы нет — ведём на подбор с предзаполненным регионом
  const href = cruise.href ?? `/quiz?region=${encodeURIComponent(cruise.region)}`;

  return (
    <article className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all hover:border-neutral-300 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={cruise.image}
          alt={cruise.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {cruise.isExample && (
            <span className="rounded-full bg-amber-500/95 px-2.5 py-1 text-[11px] font-medium text-white">
              Пример
            </span>
          )}
          {cruise.badges?.map((badge) => (
            <span
              key={badge}
              className="rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium text-neutral-900 backdrop-blur"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>

      <div className="p-5">
        <p className="text-xs uppercase tracking-wider text-neutral-500">{cruise.region}</p>
        <h3 className="mt-1.5 text-lg font-medium leading-snug text-neutral-900 dark:text-neutral-100">
          {cruise.title}
        </h3>
        <p className="mt-1 text-sm text-neutral-500">
          {cruise.ship} · {cruise.countries}
        </p>

        <dl className="mt-4 space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 shrink-0 text-neutral-400" />
            <dd>{formatDepartureDate(cruise.departureDate)}</dd>
          </div>
          <div className="flex items-center gap-2">
            <Moon className="h-4 w-4 shrink-0 text-neutral-400" />
            <dd>{formatNights(cruise.nights)}</dd>
          </div>
          <div className="flex items-center gap-2">
            <Anchor className="h-4 w-4 shrink-0 text-neutral-400" />
            <dd>Отправление: {cruise.departurePort}</dd>
          </div>
        </dl>

        <div className="mt-5 flex items-center justify-between border-t border-neutral-100 pt-4 dark:border-neutral-800">
          <div>
            <p className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
              {formatPrice(cruise.priceFrom)}
            </p>
            {cruise.priceFrom && <p className="text-xs text-neutral-500">за человека</p>}
          </div>
          <Link
            href={href}
            className="rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-neutral-800 active:scale-95 dark:bg-neutral-100 dark:text-neutral-900"
          >
            Подробнее
          </Link>
        </div>
      </div>
    </article>
  );
}
