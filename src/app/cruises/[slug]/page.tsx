import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header/header";
import {
  formatDepartureDate,
  formatNights,
  formatPrice,
  getPublishedCruiseBySlug,
} from "@/features/cruise-search";

/**
 * Страница круиза из базы: /cruises/<slug>
 *
 * Статические лендинги (/cruises/msc-world-asia) и /cruises/search продолжают
 * работать — Next.js отдаёт приоритет точным сегментам перед динамическим [slug].
 */

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cruise = await getPublishedCruiseBySlug(slug);

  if (!cruise) return { title: "Круиз не найден | Vontamona" };

  const nights = formatNights(cruise.nights);

  return {
    title: `${cruise.title} | Vontamona`,
    description:
      cruise.description?.split("\n")[0] ??
      `${nights} на ${cruise.ship}. Отправление ${formatDepartureDate(cruise.departureDate)} из порта ${cruise.departurePort}.`,
  };
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-neutral-200 pt-4 dark:border-neutral-800">
      <dt className="text-xs uppercase tracking-wider text-neutral-500">{label}</dt>
      <dd className="mt-1 text-neutral-900 dark:text-neutral-100">{value}</dd>
    </div>
  );
}

export default async function CruisePage({ params }: PageProps) {
  const { slug } = await params;
  const cruise = await getPublishedCruiseBySlug(slug);

  if (!cruise) notFound();

  const paragraphs = cruise.description?.split("\n").filter((line) => line.trim().length > 0) ?? [];
  const quizHref = `/quiz?region=${encodeURIComponent(cruise.region)}`;

  return (
    <>
      <Header variant="transparent" />

      <main className="min-h-screen bg-white dark:bg-neutral-950">
        {/* ─── HERO ─── */}
        <section className="relative flex h-[60vh] min-h-[420px] items-end pt-20">
          <div className="absolute inset-0 z-0">
            <Image
              src={cruise.image}
              alt={cruise.region}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-[1100px] px-4 pb-12">
            <p className="text-xs font-semibold uppercase tracking-[3px] text-white/80">
              {cruise.region}
            </p>
            <h1 className="mt-3 max-w-3xl text-[clamp(2rem,5vw,3.5rem)] font-medium leading-tight text-white">
              {cruise.title}
            </h1>
            <p className="mt-4 text-lg text-white/90">
              {formatNights(cruise.nights)} · {cruise.ship}
              {cruise.line ? ` · ${cruise.line}` : ""}
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-[1100px] px-4 py-14">
          <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
            {/* ─── ОСНОВНОЕ ─── */}
            <div>
              <dl className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3">
                <Fact label="Отправление" value={formatDepartureDate(cruise.departureDate)} />
                <Fact label="Порт" value={cruise.departurePort} />
                <Fact label="Длительность" value={formatNights(cruise.nights)} />
                <Fact label="Лайнер" value={cruise.ship} />
                {cruise.line && <Fact label="Круизная компания" value={cruise.line} />}
                {cruise.countries && <Fact label="Страны маршрута" value={cruise.countries} />}
              </dl>

              {paragraphs.length > 0 && (
                <section className="mt-12">
                  <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
                    О круизе
                  </h2>
                  <div className="mt-4 space-y-4 text-neutral-700 dark:text-neutral-300">
                    {paragraphs.map((paragraph) => (
                      <p key={paragraph} className="leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              )}

              {cruise.itinerary.length > 0 && (
                <section className="mt-12">
                  <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
                    Маршрут
                  </h2>
                  <ol className="mt-4 space-y-3">
                    {cruise.itinerary.map((step, index) => (
                      <li key={step} className="flex gap-4">
                        <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-xs font-medium text-white dark:bg-neutral-100 dark:text-neutral-900">
                          {index + 1}
                        </span>
                        <span className="text-neutral-700 dark:text-neutral-300">{step}</span>
                      </li>
                    ))}
                  </ol>
                </section>
              )}
            </div>

            {/* ─── ЦЕНА И ЗАЯВКА ─── */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-2xl border border-neutral-200 p-6 dark:border-neutral-800">
                <p className="text-2xl font-medium text-neutral-900 dark:text-neutral-100">
                  {formatPrice(cruise.priceFrom)}
                </p>
                {cruise.priceFrom && <p className="mt-1 text-sm text-neutral-500">за человека</p>}

                <Link
                  href={quizHref}
                  className="mt-6 block rounded-full bg-neutral-900 px-6 py-3.5 text-center text-sm font-medium text-white transition-all hover:bg-neutral-800 active:scale-95 dark:bg-neutral-100 dark:text-neutral-900"
                >
                  Оставить заявку
                </Link>

                <p className="mt-4 text-xs leading-relaxed text-neutral-500">
                  Ответьте на несколько вопросов — эксперт подберёт каюту и свяжется в течение 2–3
                  часов.
                </p>
              </div>

              <Link
                href="/cruises/search"
                className="mt-4 block text-center text-sm text-neutral-500 underline-offset-4 hover:underline"
              >
                ← Ко всем круизам
              </Link>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
