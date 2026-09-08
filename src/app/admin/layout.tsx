import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Админка | Vontamona",
  // Служебный раздел не должен попадать в поисковую выдачу
  robots: { index: false, follow: false },
};

/**
 * Админка всегда рендерится на запросе: показывать закешированный список
 * круизов после правки — худшее, что можно сделать с панелью управления.
 */
export const dynamic = "force-dynamic";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <header className="border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between px-4 py-4">
          <Link href="/admin" className="text-sm font-medium tracking-tight">
            Vontamona · управление круизами
          </Link>
          <Link
            href="/"
            className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
          >
            На сайт →
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[1100px] px-4 py-10">{children}</main>
    </div>
  );
}
