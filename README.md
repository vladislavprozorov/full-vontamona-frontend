# Vontamona Cruise Platform — Frontend

**EN** | [🇷🇺 RU](#ru)

---

## Overview

Premium cruise booking platform with intelligent quiz system, real-time search, and luxury UX. Built with Next.js 15, TypeScript, and modern architectural patterns.

## Architecture

**FSM-Based Quiz** — State machine with centralized step configuration  
**Feature-Sliced** — Domain-driven structure (`/features/cruiseQuiz`, `/features/search`)  
**Type-Safe** — Zod schemas, strict TypeScript, no `any` types  
**Component Library** — shadcn/ui with Tailwind CSS  
**Smart Suggestions** — AI-powered priority recommendations

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS + shadcn/ui
- **Validation:** Zod
- **State:** React hooks + FSM reducer
- **Testing:** Vitest (25/25 tests passing)
- **Email:** Resend API

## Quick Start

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000)

## Key Features

- **Intelligent Quiz:** 8-step FSM with smart suggestions
- **Real-time Search:** Debounced API calls, optimistic UI
- **Responsive Design:** Mobile-first, luxury aesthetics
- **Type Safety:** End-to-end type checking
- **Clean Architecture:** SOLID principles, separation of concerns

---

## 🇷🇺 <a name="ru"></a>Vontamona — Платформа круизов

Премиум-платформа бронирования круизов с интеллектуальным квизом, поиском в реальном времени и люксовым UX. Построена на Next.js 15, TypeScript и современных архитектурных паттернах.

## Архитектура

**FSM-квиз** — Конечный автомат с централизованной конфигурацией шагов  
**Feature-Sliced** — Доменная структура (`/features/cruiseQuiz`, `/features/search`)  
**Типобезопасность** — Zod-схемы, строгий TypeScript, никаких `any`  
**Библиотека компонентов** — shadcn/ui + Tailwind CSS  
**Умные рекомендации** — AI-подсказки приоритетов

## Технологии

- **Фреймворк:** Next.js 15 (App Router)
- **Язык:** TypeScript 5
- **Стили:** Tailwind CSS + shadcn/ui
- **Валидация:** Zod
- **Состояние:** React hooks + FSM reducer
- **Тесты:** Vitest (25/25 проходят)
- **Email:** Resend API

## Быстрый старт

```bash
# Установка зависимостей
npm install

# Запуск dev-сервера
npm run dev

# Запуск тестов
npm test

# Сборка для продакшена
npm run build
```

Открой [http://localhost:3000](http://localhost:3000)

## Ключевые фичи

- **Интеллектуальный квиз:** 8-шаговый FSM с умными подсказками
- **Поиск в реальном времени:** Дебаунсинг, оптимистичный UI
- **Адаптивный дизайн:** Mobile-first, люксовая эстетика
- **Типобезопасность:** End-to-end проверка типов
- **Чистая архитектура:** SOLID-принципы, разделение ответственности

---

**License:** MIT | **Author:** Vladislav Prozorov
