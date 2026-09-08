import { Header } from "@/components/layout/header/header";

/**
 * Показывается, пока страница поиска ждёт ответ базы.
 *
 * Next.js рендерит этот файл мгновенно, ещё до запроса — поэтому переход
 * ощущается как «страница уже открылась и наполняется», а не как зависание.
 * Разметка повторяет каркас результатов, чтобы контент не прыгал при подстановке.
 */

const SKELETON_CARDS = 6;

function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
      <div className="aspect-[16/10] animate-pulse bg-neutral-200 dark:bg-neutral-800" />
      <div className="space-y-3 p-5">
        <div className="h-3 w-24 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
        <div className="h-5 w-4/5 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
        <div className="space-y-2 pt-2">
          <div className="h-4 w-40 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-4 w-32 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
        </div>
        <div className="mt-5 h-10 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-800" />
      </div>
    </div>
  );
}

export default function SearchLoading() {
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
              Подбираем подходящие предложения…
            </p>
          </header>

          <div className="mb-10 h-[76px] animate-pulse rounded-3xl bg-white dark:bg-neutral-900" />

          <div className="mb-6 h-4 w-48 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: SKELETON_CARDS }, (_, index) => (
              <CardSkeleton key={`skeleton-${index}`} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
