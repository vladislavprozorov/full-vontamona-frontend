"use server";

/**
 * ⚡️ Server Actions админки
 *
 * Это единственная точка, через которую данные попадают в базу из браузера.
 * Каждое действие заново валидирует payload схемой: форму можно обойти,
 * поэтому клиентской проверке доверять нельзя.
 *
 * ⚠️ Доступ к этим действиям закрывается паролем на уровне Caddy по пути
 * /admin*. Server Actions отправляют POST на URL текущей страницы, поэтому
 * защита пути закрывает и их. Не выносите вызовы этих действий на страницы
 * вне /admin — они окажутся снаружи защиты.
 */

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { makeSlug } from "@/shared/cruise/slug";
import {
  deleteCruise,
  insertCruise,
  toggleCruisePublished,
  updateCruise,
} from "./cruise-admin.repository";
import { type CruiseInput, cruiseInputSchema } from "./cruise-admin.schema";

export type ActionResult = { ok: true } | { ok: false; error: string };

const idSchema = z.uuid("Некорректный идентификатор круиза");

/** Публичные страницы читают те же данные — сбрасываем их кеш после изменения */
function revalidateAffected(): void {
  revalidatePath("/admin");
  revalidatePath("/cruises/search");
}

function describe(error: unknown): string {
  console.error("Ошибка в админке круизов:", error);
  return "Не удалось сохранить. Проверьте, что база данных доступна.";
}

export async function createCruiseAction(payload: CruiseInput): Promise<ActionResult> {
  const parsed = cruiseInputSchema.safeParse(payload);
  if (!parsed.success) return { ok: false, error: "Данные не прошли проверку" };

  try {
    // Адрес страницы выдаётся здесь, на сервере: администратору его вводить не нужно
    await insertCruise(parsed.data, makeSlug(parsed.data.title));
    revalidateAffected();
    return { ok: true };
  } catch (error) {
    return { ok: false, error: describe(error) };
  }
}

export async function updateCruiseAction(id: string, payload: CruiseInput): Promise<ActionResult> {
  const parsedId = idSchema.safeParse(id);
  if (!parsedId.success) return { ok: false, error: parsedId.error.issues[0].message };

  const parsed = cruiseInputSchema.safeParse(payload);
  if (!parsed.success) return { ok: false, error: "Данные не прошли проверку" };

  try {
    const updated = await updateCruise(parsedId.data, parsed.data);
    if (!updated) return { ok: false, error: "Круиз не найден — возможно, его уже удалили" };

    revalidateAffected();
    return { ok: true };
  } catch (error) {
    return { ok: false, error: describe(error) };
  }
}

export async function deleteCruiseAction(id: string): Promise<ActionResult> {
  const parsedId = idSchema.safeParse(id);
  if (!parsedId.success) return { ok: false, error: parsedId.error.issues[0].message };

  try {
    const deleted = await deleteCruise(parsedId.data);
    if (!deleted) return { ok: false, error: "Круиз не найден" };

    revalidateAffected();
    return { ok: true };
  } catch (error) {
    return { ok: false, error: describe(error) };
  }
}

export async function togglePublishedAction(id: string): Promise<ActionResult> {
  const parsedId = idSchema.safeParse(id);
  if (!parsedId.success) return { ok: false, error: parsedId.error.issues[0].message };

  try {
    const state = await toggleCruisePublished(parsedId.data);
    if (state === null) return { ok: false, error: "Круиз не найден" };

    revalidateAffected();
    return { ok: true };
  } catch (error) {
    return { ok: false, error: describe(error) };
  }
}
