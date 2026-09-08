"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Option {
  value: string;
  label: string;
}

interface OptionListProps {
  options: readonly Option[];
  value: string;
  onSelect: (value: string) => void;
}

/** Список опций для «Направления» и «Длительности» внутри общей панели */
export function OptionList({ options, value, onSelect }: OptionListProps) {
  return (
    <div className="w-full p-2 md:w-60">
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onSelect(option.value)}
            className={cn(
              "flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-left text-[15px] transition-colors",
              "hover:bg-neutral-100 dark:hover:bg-neutral-800",
              active
                ? "font-medium text-neutral-900 dark:text-neutral-100"
                : "text-neutral-700 dark:text-neutral-300",
            )}
          >
            {option.label}
            {active && (
              <Check className="h-4 w-4 shrink-0 text-neutral-900 dark:text-neutral-100" />
            )}
          </button>
        );
      })}
    </div>
  );
}
