"use client";

import { ChevronDown, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { CRUISE_REGIONS } from "../model/cruise-catalog";
import { formatRangeLabel } from "../model/dates";
import { type CruiseSearchQuery, NIGHTS_OPTIONS } from "../model/search";
import { type DateRange, DateRangeCalendar } from "./date-range-calendar";

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

  const [region, setRegion] = useState(defaults?.region ?? ANY);
  const [range, setRange] = useState<DateRange>({ from: defaults?.from, to: defaults?.to });
  const [nights, setNights] = useState(defaults?.nights ?? ANY);
  const [guests, setGuests] = useState(defaults?.guests ?? "2");
  const [datesOpen, setDatesOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (region !== ANY) params.set("region", region);
    if (range.from) params.set("from", range.from);
    if (range.to) params.set("to", range.to);
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
        <Popover open={datesOpen} onOpenChange={setDatesOpen}>
          <PopoverTrigger
            aria-label="Даты отправления"
            className="flex w-full items-center justify-between gap-2 rounded-lg text-left text-[15px] font-medium outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/10"
          >
            <span className={cn("truncate", !range.from && "text-neutral-900")}>
              {formatRangeLabel(range.from, range.to)}
            </span>
            <ChevronDown
              className={cn(
                "h-4 w-4 shrink-0 text-neutral-400 transition-transform duration-200",
                datesOpen && "rotate-180",
              )}
            />
          </PopoverTrigger>
          <PopoverContent align="start" className="w-auto">
            <DateRangeCalendar
              value={range}
              onChange={(next) => {
                setRange(next);
                // Диапазон собран — закрываем, чтобы не мешал
                if (next.from && next.to) setDatesOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
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
