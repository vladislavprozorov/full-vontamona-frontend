import Link from "next/link";
import { formatDepartureDate, formatPrice } from "@/features/cruise-search";
import type { AdminCruise } from "../model/cruise-admin.repository";
import { CruiseRowActions } from "./cruise-row-actions";

const cellClass = "px-4 py-3 align-top text-sm";

export function CruiseTable({ cruises }: { cruises: AdminCruise[] }) {
  if (cruises.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-neutral-300 p-12 text-center dark:border-neutral-700">
        <p className="text-neutral-600 dark:text-neutral-400">Круизов пока нет</p>
        <p className="mt-1 text-sm text-neutral-500">
          Нажмите «Добавить круиз», чтобы создать первое предложение
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800">
      <table className="w-full min-w-[860px] border-collapse">
        <thead className="bg-neutral-50 text-left text-xs uppercase tracking-wider text-neutral-500 dark:bg-neutral-900">
          <tr>
            <th className="px-4 py-3 font-medium">Круиз</th>
            <th className="px-4 py-3 font-medium">Направление</th>
            <th className="px-4 py-3 font-medium">Отправление</th>
            <th className="px-4 py-3 font-medium">Цена</th>
            <th className="px-4 py-3 font-medium">Статус</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
          {cruises.map((cruise) => (
            <tr key={cruise.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-900/50">
              <td className={cellClass}>
                <Link
                  href={`/admin/${cruise.id}`}
                  className="font-medium text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-100"
                >
                  {cruise.title}
                </Link>
                <p className="mt-0.5 text-neutral-500">
                  {cruise.ship} · {cruise.nights} ноч. · {cruise.departurePort}
                </p>
              </td>
              <td className={`${cellClass} text-neutral-600 dark:text-neutral-400`}>
                {cruise.region}
              </td>
              <td
                className={`${cellClass} whitespace-nowrap text-neutral-600 dark:text-neutral-400`}
              >
                {formatDepartureDate(cruise.departureDate)}
              </td>
              <td
                className={`${cellClass} whitespace-nowrap text-neutral-600 dark:text-neutral-400`}
              >
                {formatPrice(cruise.priceFrom ?? undefined)}
              </td>
              <td className={cellClass}>
                {cruise.isPublished ? (
                  <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    На сайте
                  </span>
                ) : (
                  <span className="rounded-full bg-neutral-200 px-2.5 py-1 text-xs font-medium text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                    Черновик
                  </span>
                )}
              </td>
              <td className={cellClass}>
                <CruiseRowActions id={cruise.id} title={cruise.title} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
