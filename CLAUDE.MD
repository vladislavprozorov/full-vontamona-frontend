Премиум-платформа бронирования круизов: интеллектуальный FSM-квиз, поиск, лендинги круизов, юридические страницы. Аудитория — клиенты, подбирающие круиз.

Команды (проверять этим, прежде чем считать задачу готовой)
npm run dev — dev-сервер (localhost:3000)
npm run test:run — прогон тестов один раз (Vitest); npm test — watch-режим
npm run check — проверка форматирования Biome (это же гоняет CI перед деплоем)
npm run build — прод-сборка (CI запускает после check)
npm run lint / npm run format — автофикс форматирования Biome

Перед пушем зелёными должны быть npm run check и npm run build — CI падает на любом из них.

Стек
Next.js 16.1.1 (App Router) · React 19 · TypeScript 5 (strict)
Node 22.22.0 (см. .nvmrc)
Tailwind CSS v4 + shadcn/ui (Radix)
Zod v4 — валидация · react-hook-form — формы
Vitest — тесты · nodemailer — отправка email из /api/quiz
framer-motion — анимации · embla-carousel — карусели
Архитектура: Feature-Sliced Design

Слои: src/features/<domain>/ (фичи) → src/shared/ (переиспользуемое) → src/components/ (ui + layout + sections). Импортируй через алиас @/* → ./src/*.

Внутри фичи: model/ (логика, чистый TS) отделён от ui/ и steps/ (React). Публичный API фичи — через model/index.ts, не тяни напрямую из внутренних файлов.

FSM-квиз (src/features/cruise-quiz/) — ядро проекта

Ключевой паттерн, соблюдай его при любых правках квиза:

Состояние — конечный автомат. Переходы централизованы в model/quiz.machine.ts (типы) и model/quiz.reducer.ts (чистая функция).
Reducer тестируется без React (quiz.reducer.test.ts) — бизнес-логику держи чистой, изолированной от UI.
Impossible states исключаются на уровне типов. Не добавляй флаги, разрешающие невалидные состояния.
Шаги описаны данными в quiz.steps.config.tsx — новый шаг добавляется туда, а не хардкодом в компонентах.
Конвенции
Никаких any. Типы выводим через Zod-схемы и доменные типы (quiz.domain.ts).
Форматирование делает Biome (2 пробела, ширина 100, двойные кавычки, точки с запятой, trailing commas). Не расставляй стиль вручную — гоняй npm run lint. Линтер Biome отключён намеренно, включён только форматтер.
Бизнес-логику пиши чистыми функциями в model/, побочные эффекты (persistence, submit, email) — в отдельных файлах (quiz.persistence.ts, quiz.submit.ts).
Коммиты — Conventional Commits, тип строго из: feat, fix, refactor, chore, docs, test, perf. Иначе commitlint отклонит коммит.
pre-commit гоняет lint-staged (Biome автофикс по staged-файлам) — не обходи хуки без причины.
Деплой

Push в main → GitHub Actions (check + build) → SSH на сервер → docker compose up -d --build. Секреты (HOST/USERNAME/SSH_KEY) в GitHub Secrets. Локально прод-образ: docker-compose.yml + Dockerfile, реверс-прокси — Caddyfile.

Где искать детали (не дублировать сюда)
Юридические страницы и требования — src/docs/LEGAL.md, src/docs/LEGAL-CHECKLIST.md
Данные компании — src/config/company.ts
Дизайн-токены и темы — src/design-system/
Публичный API квиза — src/features/cruise-quiz/model/index.ts
Как работать со мной
Перед крупным рефакторингом или изменением FSM-логики — сначала предложи план, потом код.
Меняешь квиз — сразу обновляй/добавляй тесты в quiz.reducer.test.ts.
Не апгрейди мажорные версии зависимостей без явной просьбы.