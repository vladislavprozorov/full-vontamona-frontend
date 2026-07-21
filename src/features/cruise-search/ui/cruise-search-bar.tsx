"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { CRUISE_REGIONS } from "../model/cruise-catalog";
import { type CruiseSearchQuery, getMonthOptions, NIGHTS_OPTIONS } from "../model/search";

/** Radix не допускает пустую строку как значение — используем сентинел */
const ANY = "any";

interface CruiseSearchBarProps {
  className?: string;
  /** Начальные значения — чтобы на странице результатов поля были заполнены */
  defaults?: CruiseSearchQuery;
  /** true — компактный вид для страницы результатов */
  compact?: boolean;
}

const labelClass = "block text-[11px] uppercase tracking-wider text-neutral-500";

/** Одна секция строки поиска */
function Field({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("px-4 py-2.5", className)}>
      <span className={labelClass}>{label}</span>
      <div className="mt-0.5">{children}</div>
    </div>
  );
}

export function CruiseSearchBar({ className, defaults, compact = false }: CruiseSearchBarProps) {
  const router = useRouter();
  const monthOptions = useMemo(() => getMonthOptions(), []);

  const [region, setRegion] = useState(defaults?.region ?? ANY);
  const [month, setMonth] = useState(defaults?.month ?? ANY);
  const [nights, setNights] = useState(defaults?.nights ?? ANY);
  const [guests, setGuests] = useState(defaults?.guests ?? "2");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (region !== ANY) params.set("region", region);
    if (month !== ANY) params.set("month", month);
    if (nights !== ANY) params.set("nights", nights);
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
      <Field label="Направление" className="flex-1">
        <Select value={region} onValueChange={setRegion}>
          <SelectTrigger aria-label="Направление">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ANY}>Любое</SelectItem>
            {CRUISE_REGIONS.map((r) => (
              <SelectItem key={r} value={r}>
                {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <Field label="Когда" className="flex-1 border-neutral-200 md:border-l">
        <Select value={month} onValueChange={setMonth}>
          <SelectTrigger aria-label="Месяц отправления">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ANY}>Любая дата</SelectItem>
            {monthOptions.map((m) => (
              <SelectItem key={m.value} value={m.value}>
                {m.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <Field label="Длительность" className="flex-1 border-neutral-200 md:border-l">
        <Select value={nights} onValueChange={setNights}>
          <SelectTrigger aria-label="Длительность">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ANY}>Любая</SelectItem>
            {NIGHTS_OPTIONS.map((n) => (
              <SelectItem key={n.value} value={n.value}>
                {n.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <Field label="Гостей" className="border-neutral-200 md:w-32 md:border-l">
        <Select value={guests} onValueChange={setGuests}>
          <SelectTrigger aria-label="Количество гостей">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4].map((g) => (
              <SelectItem key={g} value={String(g)}>
                {g}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 px-8 py-4 text-[15px] font-medium text-white transition-all hover:bg-neutral-800 active:scale-[0.98] md:px-9"
      >
        <Search className="h-4 w-4" />
        Найти круиз
      </button>
    </form>
  );
}
