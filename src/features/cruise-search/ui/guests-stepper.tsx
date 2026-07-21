"use client";

import { ChevronDown, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { formatGuests } from "../model/search";

/** Ограничения как у круизных операторов: минимум 1, максимум 5 в каюте */
const MIN_GUESTS = 1;
const MAX_GUESTS = 5;

interface GuestsStepperProps {
  value: number;
  onChange: (value: number) => void;
  /** Сообщаем наружу — чтобы строка поиска подсветила активную секцию */
  onOpenChange?: (open: boolean) => void;
}

function StepperButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full border transition-all",
        "border-neutral-300 text-neutral-700 dark:border-neutral-600 dark:text-neutral-200",
        !disabled && "hover:border-neutral-900 hover:text-neutral-900 active:scale-90",
        !disabled && "dark:hover:border-neutral-100 dark:hover:text-neutral-100",
        disabled &&
          "cursor-not-allowed border-neutral-200 text-neutral-300 dark:border-neutral-800",
      )}
    >
      {children}
    </button>
  );
}

export function GuestsStepper({ value, onChange, onOpenChange }: GuestsStepperProps) {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    onOpenChange?.(next);
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger
        aria-label="Количество гостей"
        className="flex w-full items-center justify-between gap-2 rounded-lg text-left text-[15px] font-medium outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/10"
      >
        <span className="truncate">{formatGuests(value)}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-neutral-400 transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </PopoverTrigger>

      <PopoverContent align="end" className="w-72">
        <div className="flex items-center justify-between gap-6">
          <div>
            <p className="text-[15px] font-medium text-neutral-900 dark:text-neutral-100">Гости</p>
            <p className="mt-0.5 text-xs text-neutral-500">Взрослых в каюте</p>
          </div>

          <div className="flex items-center gap-3">
            <StepperButton
              label="Убрать гостя"
              disabled={value <= MIN_GUESTS}
              onClick={() => onChange(Math.max(MIN_GUESTS, value - 1))}
            >
              <Minus className="h-4 w-4" />
            </StepperButton>

            <span className="w-6 text-center text-[15px] font-medium tabular-nums text-neutral-900 dark:text-neutral-100">
              {value}
            </span>

            <StepperButton
              label="Добавить гостя"
              disabled={value >= MAX_GUESTS}
              onClick={() => onChange(Math.min(MAX_GUESTS, value + 1))}
            >
              <Plus className="h-4 w-4" />
            </StepperButton>
          </div>
        </div>

        <p className="mt-3 border-t border-neutral-100 pt-3 text-xs text-neutral-500 dark:border-neutral-800">
          Максимум {MAX_GUESTS} гостей в каюте. Больше — подберём несколько кают.
        </p>
      </PopoverContent>
    </Popover>
  );
}
