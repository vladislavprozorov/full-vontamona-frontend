"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LEGAL_LINKS } from "@/config/company";

/**
 * Навигация по юридическим документам
 * Подсвечивает активную страницу
 */
export function LegalNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap gap-2">
      {LEGAL_LINKS.map((doc: { url: string; title: string }) => {
        const isActive = pathname === doc.url;

        return (
          <Link
            key={doc.url}
            href={doc.url}
            className={`
              px-4 py-2 rounded-md text-sm font-medium transition-colors
              ${
                isActive
                  ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900"
                  : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
              }
            `}
          >
            {doc.title}
          </Link>
        );
      })}
    </nav>
  );
}
