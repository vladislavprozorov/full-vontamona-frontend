"use client";

import { ChevronDown, Minus, Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { CRUISE_REGIONS } from "../model/cruise-catalog";
import { formatRangeLabel } from "../model/dates";
import { type CruiseSearchQuery, formatGuests, NIGHTS_OPTIONS } from "../model/search";
import { type DateRange, DateRangeCalendar } from "./date-range-calendar";
import { OptionList } from "./option-list";

/** «Любое значение» — пустая строка занята под сброс в URL-параметрах */
const ANY = "any";

const MIN_GUESTS = 1;
const MAX_GUESTS = 5;

type ActiveField = "region" | "dates" | "nights" | "guests";

interface CruiseSearchBarProps {
  className?: string;
  /** Начальные значения — чтобы на странице результатов поля были заполнены */
  defaults?: CruiseSearchQuery;
  /** true — компактный вид для страницы результатов */
  compact?: boolean;
}

const labelClass = "block text-[11px] uppercase tracking-wider text-neutral-500";

/** Кликабельная секция строки. Вся область — кнопка, открывающая общую панель */
function FieldButton({
  label,
  ariaLabel,
  value,
  active,
  onClick,
}: {
  label: string;
  ariaLabel: string;
  value: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      aria-expanded={active}
      onClick={onClick}
      className={cn(
        "w-full rounded-2xl px-4 py-2.5 text-left outline-none transition-all duration-200",
        "focus-visible:ring-2 focus-visible:ring-neutral-900/10",
        active
          ? "bg-neutral-100 ring-1 ring-neutral-200/70 ring-inset"
          : "[@media(hover:hover)]:hover:bg-neutral-50",
      )}
    >
      <span className={labelClass}>{label}</span>
      <span className="mt-0.5 flex items-center justify-between gap-2 font-medium text-[15px] text-neutral-900">
        <span className="truncate">{value}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-neutral-400 transition-transform duration-200",
            active && "rotate-180",
          )}
        />
      </span>
    </button>
  );
}

/** Содержимое панели для «Гостей» — степпер −/+ */
function GuestsPanel({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const stepperButton = (disabled: boolean) =>
    cn(
      "flex h-9 w-9 items-center justify-center rounded-full border transition-all",
      "border-neutral-300 text-neutral-700 dark:border-neutral-600 dark:text-neutral-200",
      !disabled &&
        "hover:border-neutral-900 hover:text-neutral-900 active:scale-90 dark:hover:border-neutral-100 dark:hover:text-neutral-100",
      disabled && "cursor-not-allowed border-neutral-200 text-neutral-300 dark:border-neutral-800",
    );

  return (
    <div className="w-full p-4 md:w-72">
      <div className="flex items-center justify-between gap-6">
        <div>
          <p className="font-medium text-[15px] text-neutral-900 dark:text-neutral-100">Гости</p>
          <p className="mt-0.5 text-neutral-500 text-xs">Взрослых в каюте</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Убрать гостя"
            disabled={value <= MIN_GUESTS}
            onClick={() => onChange(Math.max(MIN_GUESTS, value - 1))}
            className={stepperButton(value <= MIN_GUESTS)}
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-6 text-center font-medium text-[15px] text-neutral-900 tabular-nums dark:text-neutral-100">
            {value}
          </span>
          <button
            type="button"
            aria-label="Добавить гостя"
            disabled={value >= MAX_GUESTS}
            onClick={() => onChange(Math.min(MAX_GUESTS, value + 1))}
            className={stepperButton(value >= MAX_GUESTS)}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
      <p className="mt-3 border-neutral-100 border-t pt-3 text-neutral-500 text-xs dark:border-neutral-800">
        Максимум {MAX_GUESTS} гостей в каюте. Больше — подберём несколько кают.
      </p>
    </div>
  );
}

const REGION_OPTIONS = [
  { value: ANY, label: "Любое" },
  ...CRUISE_REGIONS.map((r) => ({ value: r, label: r })),
];

const NIGHTS_PANEL_OPTIONS = [{ value: ANY, label: "Любая" }, ...NIGHTS_OPTIONS];

export function CruiseSearchBar({ className, defaults, compact = false }: CruiseSearchBarProps) {
  const router = useRouter();

  const [region, setRegion] = useState(defaults?.region ?? ANY);
  const [range, setRange] = useState<DateRange>({ from: defaults?.from, to: defaults?.to });
  const [nights, setNights] = useState(defaults?.nights ?? ANY);
  const [guests, setGuests] = useState(() => Number(defaults?.guests) || 2);
  const [activeField, setActiveField] = useState<ActiveField | null>(null);

  const formRef = useRef<HTMLFormElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const fieldRefs = useRef<Partial<Record<ActiveField, HTMLDivElement | null>>>({});

  const prevFieldRef = useRef<ActiveField | null>(null);
  // Позиция десктопной панели (React владеет стилем — без гонок с реконциляцией)
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  // Плавный переезд включаем только при переходе между уже открытыми секциями
  const [animateMove, setAnimateMove] = useState(false);

  /** Позиция под активной секцией, прижата к краям строки */
  const measure = useCallback((field: ActiveField) => {
    const form = formRef.current;
    const el = fieldRefs.current[field];
    const panel = panelRef.current;
    if (!form || !el || !panel) return;
    if (window.matchMedia("(max-width: 767px)").matches) return; // на мобильном панель в потоке

    const maxX = Math.max(0, form.clientWidth - panel.offsetWidth);
    setPos({
      x: Math.min(el.offsetLeft, maxX),
      y: el.offsetTop + el.offsetHeight + 8,
    });
  }, []);

  // Пересчёт позиции до отрисовки кадра — без мигания
  useLayoutEffect(() => {
    if (activeField) {
      setAnimateMove(prevFieldRef.current !== null && prevFieldRef.current !== activeField);
      measure(activeField);
    } else {
      setPos(null);
    }
    prevFieldRef.current = activeField;
  }, [activeField, measure]);

  // Закрытие по клику снаружи и Escape; позиция — при ресайзе
  useEffect(() => {
    if (!activeField) return;

    const onPointerDown = (e: PointerEvent) => {
      if (!formRef.current?.contains(e.target as Node)) setActiveField(null);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveField(null);
    };
    const onResize = () => measure(activeField);

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [activeField, measure]);

  const toggleField = (field: ActiveField) =>
    setActiveField((prev) => (prev === field ? null : field));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (region !== ANY) params.set("region", region);
    if (range.from) params.set("from", range.from);
    if (range.to) params.set("to", range.to);
    if (nights !== ANY) params.set("nights", nights);
    params.set("guests", String(guests));

    router.push(`/cruises/search?${params.toString()}`);
  };

  const nightsLabel = NIGHTS_PANEL_OPTIONS.find((o) => o.value === nights)?.label ?? "Любая";

  /** Общее содержимое панели (десктоп-поповер и мобильный аккордеон).
      key={activeField} перемонтирует блок — CSS-анимация входа отыгрывает заново */
  const panelContent = activeField && (
    <div key={activeField} className="fade-in-0 slide-in-from-bottom-1 animate-in duration-150">
      {activeField === "region" && (
        <OptionList
          options={REGION_OPTIONS}
          value={region}
          onSelect={(value) => {
            setRegion(value);
            setActiveField(null); // выбрал — панель закрылась, без сюрпризов
          }}
        />
      )}

      {activeField === "dates" && (
        <div className="p-3 md:p-4">
          <DateRangeCalendar
            value={range}
            onChange={(next) => {
              setRange(next);
              if (next.from && next.to) setActiveField(null);
            }}
          />
        </div>
      )}

      {activeField === "nights" && (
        <OptionList
          options={NIGHTS_PANEL_OPTIONS}
          value={nights}
          onSelect={(value) => {
            setNights(value);
            setActiveField(null);
          }}
        />
      )}

      {activeField === "guests" && <GuestsPanel value={guests} onChange={setGuests} />}
    </div>
  );

  /** Мобильный аккордеон: панель в потоке сразу под активным полем */
  const inlinePanel = (field: ActiveField) =>
    activeField === field && (
      <div className="fade-in-0 slide-in-from-top-1 animate-in overflow-hidden duration-200 md:hidden">
        <div className="my-1 rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
          {panelContent}
        </div>
      </div>
    );

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={cn(
        "relative z-30 w-full rounded-2xl bg-white/95 p-2 backdrop-blur md:rounded-full",
        "flex flex-col gap-1 md:flex-row md:items-stretch md:gap-0",
        compact ? "border border-neutral-200 shadow-sm" : "shadow-2xl",
        className,
      )}
    >
      <div
        ref={(el) => {
          fieldRefs.current.region = el;
        }}
        className="text-left md:flex-1"
      >
        <FieldButton
          label="Направление"
          ariaLabel="Направление"
          value={region === ANY ? "Любое" : region}
          active={activeField === "region"}
          onClick={() => toggleField("region")}
        />
      </div>
      {inlinePanel("region")}

      <div
        ref={(el) => {
          fieldRefs.current.dates = el;
        }}
        className="border-neutral-200 text-left md:flex-1 md:border-l"
      >
        <FieldButton
          label="Когда"
          ariaLabel="Даты отправления"
          value={formatRangeLabel(range.from, range.to)}
          active={activeField === "dates"}
          onClick={() => toggleField("dates")}
        />
      </div>
      {inlinePanel("dates")}

      <div
        ref={(el) => {
          fieldRefs.current.nights = el;
        }}
        className="border-neutral-200 text-left md:flex-1 md:border-l"
      >
        <FieldButton
          label="Длительность"
          ariaLabel="Длительность"
          value={nightsLabel}
          active={activeField === "nights"}
          onClick={() => toggleField("nights")}
        />
      </div>
      {inlinePanel("nights")}

      <div
        ref={(el) => {
          fieldRefs.current.guests = el;
        }}
        className="border-neutral-200 text-left md:w-40 md:border-l"
      >
        <FieldButton
          label="Гостей"
          ariaLabel="Количество гостей"
          value={formatGuests(guests)}
          active={activeField === "guests"}
          onClick={() => toggleField("guests")}
        />
      </div>
      {inlinePanel("guests")}

      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 px-8 py-4 font-medium text-[15px] text-white transition-all hover:bg-neutral-800 active:scale-[0.98] md:px-9"
      >
        <Search className="h-4 w-4" />
        Найти круиз
      </button>

      {/* Десктоп: единая панель, переезжающая между секциями без закрытия.
          Transform двигает саму панель целиком (вместе с зоной кликов) —
          никакой обёртки-фантома над кнопками, поэтому секции всегда кликабельны.
          Стилем владеет React (pos/animateMove) — без императивной записи в DOM */}
      {activeField && (
        <div
          ref={panelRef}
          style={{
            transform: pos ? `translate(${pos.x}px, ${pos.y}px)` : undefined,
            transition: animateMove ? "transform 0.28s cubic-bezier(0.22, 1, 0.36, 1)" : "none",
            visibility: pos ? "visible" : "hidden",
          }}
          className="absolute top-0 left-0 z-50 hidden overflow-hidden rounded-3xl border border-neutral-200/80 bg-white shadow-[0_24px_64px_-16px_rgba(0,0,0,0.28)] md:block dark:border-neutral-800 dark:bg-neutral-900"
        >
          <div className="fade-in-0 animate-in duration-150">{panelContent}</div>
        </div>
      )}
    </form>
  );
}
