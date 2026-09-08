"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  addMonths,
  formatMonthTitle,
  getMonthMatrix,
  isSameDay,
  startOfMonth,
  today,
  toISODate,
  WEEKDAY_LABELS,
} from "../model/dates";

export interface DateRange {
  from?: string;
  to?: string;
}

interface DateRangeCalendarProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
}

/** Одна сетка месяца */
function MonthGrid({
  monthStart,
  value,
  hovered,
  onHover,
  onPick,
}: {
  monthStart: Date;
  value: DateRange;
  hovered?: string;
  onHover: (iso?: string) => void;
  onPick: (iso: string) => void;
}) {
  const cells = getMonthMatrix(monthStart);
  const minDate = today();

  // Конец диапазона для подсветки: выбранный «до» или наведённый день
  const rangeEnd =
    value.to ?? (value.from && hovered && hovered > value.from ? hovered : undefined);

  return (
    <div className="w-64">
      <p className="mb-2 text-center text-[15px] font-medium text-neutral-900 dark:text-neutral-100">
        {formatMonthTitle(monthStart)}
      </p>

      <div className="mb-1 grid grid-cols-7">
        {WEEKDAY_LABELS.map((label) => (
          <span key={label} className="py-1 text-center text-[11px] text-neutral-400">
            {label}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((date, index) => {
          if (!date) {
            // biome-ignore lint/suspicious/noArrayIndexKey: пустые ячейки статичны
            return <span key={`blank-${index}`} />;
          }

          const iso = toISODate(date);
          const isPast = date < minDate;
          const isFrom = value.from === iso;
          const isTo = value.to === iso;
          const isEdge = isFrom || isTo;
          const inRange = Boolean(
            value.from && rangeEnd && iso > value.from && iso < rangeEnd && !isEdge,
          );
          const isToday = isSameDay(date, minDate);

          return (
            <button
              key={iso}
              type="button"
              disabled={isPast}
              onClick={() => onPick(iso)}
              onMouseEnter={() => onHover(iso)}
              onMouseLeave={() => onHover(undefined)}
              className={cn(
                "relative mx-auto flex h-8 w-8 items-center justify-center rounded-full text-sm transition-colors duration-150",
                isPast && "cursor-not-allowed text-neutral-300 dark:text-neutral-700",
                !isPast && !isEdge && "hover:bg-neutral-100 dark:hover:bg-neutral-800",
                inRange && "bg-neutral-100 dark:bg-neutral-800",
                isEdge &&
                  "bg-neutral-900 font-medium text-white dark:bg-neutral-100 dark:text-neutral-900",
                !isPast && !isEdge && "text-neutral-800 dark:text-neutral-200",
              )}
            >
              {date.getDate()}
              {isToday && !isEdge && (
                <span className="absolute bottom-1 h-1 w-1 rounded-full bg-neutral-400" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function DateRangeCalendar({ value, onChange }: DateRangeCalendarProps) {
  const [baseMonth, setBaseMonth] = useState(() => startOfMonth(today()));
  const [direction, setDirection] = useState(0);
  const [hovered, setHovered] = useState<string | undefined>();

  const goToMonth = (step: number) => {
    setDirection(step);
    setBaseMonth((current) => addMonths(current, step));
  };

  const handlePick = (iso: string) => {
    // Нет начала или диапазон уже полный — начинаем заново
    if (!value.from || (value.from && value.to)) {
      onChange({ from: iso, to: undefined });
      return;
    }
    // Клик раньше начала — переносим начало
    if (iso < value.from) {
      onChange({ from: iso, to: undefined });
      return;
    }
    onChange({ from: value.from, to: iso });
  };

  const canGoBack = baseMonth > startOfMonth(today());

  return (
    <div>
      <div className="relative mb-1 flex items-center justify-between px-1">
        <button
          type="button"
          onClick={() => goToMonth(-1)}
          disabled={!canGoBack}
          aria-label="Предыдущий месяц"
          className="rounded-full p-2 text-neutral-600 transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-30 dark:text-neutral-300 dark:hover:bg-neutral-800"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => goToMonth(1)}
          aria-label="Следующий месяц"
          className="rounded-full p-2 text-neutral-600 transition-colors hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/*
        overflow-hidden — чтобы новый месяц «въезжал» из-за края.
        CSS-анимация по смене key: перемонтирование запускает animate-in заново.
      */}
      <div className="overflow-hidden">
        <div
          key={toISODate(baseMonth)}
          className={cn(
            "fade-in-0 flex animate-in gap-6 duration-200",
            direction > 0 ? "slide-in-from-right-8" : "slide-in-from-left-8",
          )}
        >
          <MonthGrid
            monthStart={baseMonth}
            value={value}
            hovered={hovered}
            onHover={setHovered}
            onPick={handlePick}
          />
          {/* Второй месяц — только на десктопе */}
          <div className="hidden sm:block">
            <MonthGrid
              monthStart={addMonths(baseMonth, 1)}
              value={value}
              hovered={hovered}
              onHover={setHovered}
              onPick={handlePick}
            />
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-neutral-100 pt-3 dark:border-neutral-800">
        <p className="text-xs text-neutral-500">
          {value.from && !value.to ? "Выберите дату окончания" : "Диапазон дат отправления"}
        </p>
        <button
          type="button"
          onClick={() => onChange({ from: undefined, to: undefined })}
          className="rounded-full px-3 py-1.5 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
        >
          Сбросить
        </button>
      </div>
    </div>
  );
}
