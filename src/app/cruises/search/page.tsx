import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header/header";
import {
  CRUISE_CATALOG,
  CruiseCard,
  CruiseSearchBar,
  type CruiseSearchQuery,
  filterCruises,
} from "@/features/cruise-search";

export const metadata: Metadata = {
  title: "Поиск круизов | Vontamona",
  description:
    "Подберите круиз по направлению, дате и длительности. Персональный подбор от экспертов Vontamona.",
};

export default async function CruiseSearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;

  const query: CruiseSearchQuery = {
    region: typeof params.region === "string" ? params.region : undefined,
    month: typeof params.month === "string" ? params.month : undefined,
    nights: typeof params.nights === "string" ? params.nights : undefined,
    guests: typeof params.guests === "string" ? params.guests : undefined,
  };

  const results = filterCruises(CRUISE_CATALOG, query);

  return (
    <>
      <Header variant="solid" />

      <main className="min-h-screen bg-neutral-50 pt-28 pb-20 dark:bg-neutral-950">
        <div className="mx-auto max-w-[1280px] px-4">
          <header className="mb-8">
            <h1 className="text-3xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl">
              Поиск круизов
            </h1>
            <p className="mt-2 text-neutral-600 dark:text-neutral-400">
              Уточните параметры — или доверьте подбор нашему эксперту
            </p>
          </header>

          <CruiseSearchBar defaults={query} compact className="mb-10" />

          <div className="mb-6 flex items-baseline justify-between">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {results.length > 0
                ? `Найдено предложений: ${results.length}`
                : "По вашим параметрам ничего не нашлось"}
            </p>
          </div>

          {results.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((cruise) => (
                <CruiseCard key={cruise.slug} cruise={cruise} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-neutral-200 bg-white p-10 text-center dark:border-neutral-800 dark:bg-neutral-900">
              <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
                Не нашли подходящий круиз?
              </h2>
              <p className="mx-auto mt-2 max-w-md text-neutral-600 dark:text-neutral-400">
                В нашей базе гораздо больше вариантов, чем на витрине. Ответьте на 5 вопросов — и
                эксперт подберёт круиз лично под вас.
              </p>
              <Link
                href="/quiz"
                className="mt-6 inline-flex rounded-full bg-neutral-900 px-7 py-3.5 text-sm font-medium text-white transition-all hover:bg-neutral-800 active:scale-95 dark:bg-neutral-100 dark:text-neutral-900"
              >
                Подобрать круиз с экспертом
              </Link>
            </div>
          )}

          {/* Всегда предлагаем персональный подбор — это основной продукт */}
          {results.length > 0 && (
            <section className="mt-14 rounded-2xl bg-neutral-900 p-8 text-center dark:bg-neutral-900 sm:p-12">
              <h2 className="text-2xl font-medium text-white">Нужен вариант точнее?</h2>
              <p className="mx-auto mt-3 max-w-lg text-neutral-300">
                Мы подбираем круизы вручную и видим предложения, которых нет на витрине. Расскажите
                о пожеланиях — эксперт свяжется в течение 2–3 часов.
              </p>
              <Link
                href="/quiz"
                className="mt-7 inline-flex rounded-full bg-white px-7 py-3.5 text-sm font-medium text-neutral-900 transition-all hover:bg-neutral-100 active:scale-95"
              >
                Подобрать с экспертом
              </Link>
            </section>
          )}
        </div>
      </main>
    </>
  );
}
