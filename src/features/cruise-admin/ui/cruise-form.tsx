"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CRUISE_REGIONS } from "@/shared/cruise/regions";
import { createCruiseAction, updateCruiseAction } from "../model/cruise-admin.actions";
import type { AdminCruise } from "../model/cruise-admin.repository";
import {
  type CruiseFormValues,
  cruiseFormSchema,
  toCruiseInput,
} from "../model/cruise-admin.schema";

function toFormValues(cruise?: AdminCruise): CruiseFormValues {
  return {
    title: cruise?.title ?? "",
    ship: cruise?.ship ?? "",
    departurePort: cruise?.departurePort ?? "",
    // Пустая строка не пройдёт валидацию — направление придётся выбрать осознанно
    region: (cruise?.region ?? "") as CruiseFormValues["region"],
    departureDate: cruise?.departureDate ?? "",
    nights: cruise ? String(cruise.nights) : "",
    priceFrom: cruise?.priceFrom != null ? String(cruise.priceFrom) : "",
    line: cruise?.line ?? "",
    countries: cruise?.countries ?? "",
    description: cruise?.description ?? "",
    itinerary: cruise?.itinerary.join("\n") ?? "",
    isPublished: cruise?.isPublished ?? false,
  };
}

const fieldWrap = "space-y-1.5";
const errorClass = "text-sm text-red-600 dark:text-red-400";

export function CruiseForm({ cruise }: { cruise?: AdminCruise }) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CruiseFormValues>({
    resolver: zodResolver(cruiseFormSchema),
    defaultValues: toFormValues(cruise),
  });

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);

    const input = toCruiseInput(values);
    const result = cruise
      ? await updateCruiseAction(cruise.id, input)
      : await createCruiseAction(input);

    if (!result.ok) {
      setServerError(result.error);
      return;
    }

    router.push("/admin");
    router.refresh();
  });

  return (
    <form onSubmit={onSubmit} className="max-w-2xl space-y-6">
      <div className={fieldWrap}>
        <Label htmlFor="title">Название</Label>
        <Input id="title" placeholder="Китай, Корея и Япония из Шанхая" {...register("title")} />
        {errors.title && <p className={errorClass}>{errors.title.message}</p>}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className={fieldWrap}>
          <Label htmlFor="ship">Лайнер</Label>
          <Input id="ship" placeholder="MSC Bellissima" {...register("ship")} />
          {errors.ship && <p className={errorClass}>{errors.ship.message}</p>}
        </div>

        <div className={fieldWrap}>
          <Label htmlFor="departurePort">Порт отправления</Label>
          <Input id="departurePort" placeholder="Шанхай" {...register("departurePort")} />
          {errors.departurePort && <p className={errorClass}>{errors.departurePort.message}</p>}
        </div>
      </div>

      <div className={fieldWrap}>
        <Label htmlFor="region">Направление</Label>
        {/* Только выбор из списка: значение сравнивается с фильтром поиска посимвольно */}
        <select
          id="region"
          {...register("region")}
          className="border-input h-9 w-full rounded-md border bg-transparent px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
        >
          <option value="">Выберите направление</option>
          {CRUISE_REGIONS.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
        {errors.region && <p className={errorClass}>{errors.region.message}</p>}
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <div className={fieldWrap}>
          <Label htmlFor="departureDate">Дата отправления</Label>
          <Input id="departureDate" type="date" {...register("departureDate")} />
          {errors.departureDate && <p className={errorClass}>{errors.departureDate.message}</p>}
        </div>

        <div className={fieldWrap}>
          <Label htmlFor="nights">Ночей</Label>
          <Input id="nights" inputMode="numeric" placeholder="7" {...register("nights")} />
          {errors.nights && <p className={errorClass}>{errors.nights.message}</p>}
        </div>

        <div className={fieldWrap}>
          <Label htmlFor="priceFrom">Цена от, ₽</Label>
          <Input
            id="priceFrom"
            inputMode="numeric"
            placeholder="Не указывать"
            {...register("priceFrom")}
          />
          {errors.priceFrom ? (
            <p className={errorClass}>{errors.priceFrom.message}</p>
          ) : (
            <p className="text-xs text-neutral-500">Пусто — «Цена по запросу»</p>
          )}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className={fieldWrap}>
          <Label htmlFor="line">Круизная компания</Label>
          <Input id="line" placeholder="MSC Cruises" {...register("line")} />
          {errors.line && <p className={errorClass}>{errors.line.message}</p>}
        </div>

        <div className={fieldWrap}>
          <Label htmlFor="countries">Страны маршрута</Label>
          <Input id="countries" placeholder="Италия, Греция, Мальта" {...register("countries")} />
          {errors.countries && <p className={errorClass}>{errors.countries.message}</p>}
        </div>
      </div>

      <div className={fieldWrap}>
        <Label htmlFor="description">Описание</Label>
        <Textarea
          id="description"
          rows={5}
          placeholder="Несколько абзацев о круизе. Пустая строка разделяет абзацы."
          {...register("description")}
        />
        {errors.description && <p className={errorClass}>{errors.description.message}</p>}
      </div>

      <div className={fieldWrap}>
        <Label htmlFor="itinerary">Маршрут по дням</Label>
        <Textarea
          id="itinerary"
          rows={6}
          placeholder={"День 1 — Барселона\nДень 2 — Марсель\nДень 4 — Генуя"}
          {...register("itinerary")}
        />
        {errors.itinerary ? (
          <p className={errorClass}>{errors.itinerary.message}</p>
        ) : (
          <p className="text-xs text-neutral-500">По одной строке на день. Можно оставить пустым</p>
        )}
      </div>

      {cruise && (
        <p className="text-xs text-neutral-500">
          Адрес страницы:{" "}
          <code className="text-neutral-700 dark:text-neutral-300">/cruises/{cruise.slug}</code>
          {" — не меняется, чтобы отправленные ссылки продолжали работать"}
        </p>
      )}

      <label className="flex items-center gap-2.5 text-sm">
        <input
          type="checkbox"
          className="size-4 rounded border-input"
          {...register("isPublished")}
        />
        <span>
          Опубликовать на сайте
          <span className="block text-xs text-neutral-500">
            Без галочки круиз сохранится черновиком и не появится в поиске
          </span>
        </span>
      </label>

      {serverError && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
          {serverError}
        </p>
      )}

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Сохраняем…" : cruise ? "Сохранить" : "Добавить круиз"}
        </Button>
        <Button type="button" variant="ghost" asChild>
          <Link href="/admin">Отмена</Link>
        </Button>
      </div>
    </form>
  );
}
