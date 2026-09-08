/**
 * 🐘 Postgres connection pool
 *
 * Ответственность: одно соединение с БД на весь процесс.
 * Только для серверного кода (Server Components, Server Actions, route handlers).
 *
 * Почему кеш в globalThis: в dev-режиме Next.js пересобирает модули на каждое
 * сохранение файла. Без кеша каждый hot reload открывал бы новый пул, соединения
 * копились бы, и Postgres в какой-то момент ответил бы "too many connections".
 */

import { Pool } from "pg";

const globalForDb = globalThis as unknown as { cruisePool?: Pool };

function createPool(): Pool {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      "DATABASE_URL не задан. Локально — добавьте его в .env.local, на сервере — в окружение контейнера.",
    );
  }

  return new Pool({
    connectionString,
    // Больше и не нужно: страницы читают базу короткими запросами
    max: 10,
    // Не держим простаивающие соединения открытыми вечно
    idleTimeoutMillis: 30_000,
    // Лучше быстро упасть с внятной ошибкой, чем висеть на мёртвой базе
    connectionTimeoutMillis: 5_000,
  });
}

/**
 * Пул создаётся лениво — при первом запросе, а не при импорте модуля.
 * Иначе сборка падала бы на машине, где DATABASE_URL не задан.
 */
export function getDb(): Pool {
  globalForDb.cruisePool ??= createPool();
  return globalForDb.cruisePool;
}
