"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { CRUISE_REGIONS } from "../model/cruise-catalog";
import { type CruiseSearchQuery, getMonthOptions, NIGHTS_OPTIONS } from "../model/search";

interface CruiseSearchBarProps {
  className?: string;
  /** Начальные значения — чтобы на странице результатов поля были заполнены */
  defaults?: CruiseSearchQuery;
  /** true — компактный вид для страницы результатов (без тени и на светлом фоне) */
  compact?: boolean;
}

const selectClass =
  "w-full cursor-pointer appearance-none bg-transparent text-[15px] font-medium text-neutral-900 outline-none";

const labelClass = "block text-[11px] uppercase tracking-wider text-neutral-500";

export function CruiseSearchBar({ className, defaults, compact = false }: CruiseSearchBarProps) {
  const router = useRouter();
  const monthOptions = useMemo(() => getMonthOptions(), []);

  const [region, setRegion] = useState(defaults?.region ?? "");
  const [month, setMonth] = useState(defaults?.month ?? "");
  const [nights, setNights] = useState(defaults?.nights ?? "");
  const [guests, setGuests] = useState(defaults?.guests ?? "2");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (region) params.set("region", region);
    if (month) params.set("month", month);
    if (nights) params.set("nights", nights);
    if (guests) params.set("guests", guests);

    router.push(`/cruises/search?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "w-full rounded-2xl bg-white/95 p-2 backdrop-blur md:rounded-full",
        "flex flex-col gap-1 md:flex-row md:items-stretch md:gap-0",
        compact ? "border border-neutral-200 shadow-sm" : "shadow-2xl",
        className,
      )}
    >
      {/* Направление */}
      <div className="flex-1 px-4 py-2.5">
        {/** biome-ignore lint/a11y/noLabelWithoutControl: label оборачивает select ниже */}
        <label className="cursor-pointer">
          <span className={labelClass}>Направление</span>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className={selectClass}
          >
            <option value="">Любое</option>
            {CRUISE_REGIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Когда */}
      <div className="flex-1 border-neutral-200 px-4 py-2.5 md:border-l">
        {/** biome-ignore lint/a11y/noLabelWithoutControl: label оборачивает select ниже */}
        <label className="cursor-pointer">
          <span className={labelClass}>Когда</span>
          <select value={month} onChange={(e) => setMonth(e.target.value)} className={selectClass}>
            <option value="">Любая дата</option>
            {monthOptions.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Длительность */}
      <div className="flex-1 border-neutral-200 px-4 py-2.5 md:border-l">
        {/** biome-ignore lint/a11y/noLabelWithoutControl: label оборачивает select ниже */}
        <label className="cursor-pointer">
          <span className={labelClass}>Длительность</span>
          <select
            value={nights}
            onChange={(e) => setNights(e.target.value)}
            className={selectClass}
          >
            <option value="">Любая</option>
            {NIGHTS_OPTIONS.map((n) => (
              <option key={n.value} value={n.value}>
                {n.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Гости */}
      <div className="border-neutral-200 px-4 py-2.5 md:w-36 md:border-l">
        {/** biome-ignore lint/a11y/noLabelWithoutControl: label оборачивает select ниже */}
        <label className="cursor-pointer">
          <span className={labelClass}>Гостей</span>
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className={selectClass}
          >
            {[1, 2, 3, 4].map((g) => (
              <option key={g} value={String(g)}>
                {g}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Кнопка */}
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 px-8 py-4 text-[15px] font-medium text-white transition-all hover:bg-neutral-800 active:scale-[0.98] md:my-0 md:px-9"
      >
        <Search className="h-4 w-4" />
        Найти круиз
      </button>
    </form>
  );
}
