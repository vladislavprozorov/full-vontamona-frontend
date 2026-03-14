import Image from "next/image";
import Link from "next/link";
import { HERO_POSTER_URL, HeroVideoPlayer, ScrollToWidgetButton } from "@/features/hero-video";

export function Hero() {
  return (
    <section className="relative h-screen min-h-150 overflow-hidden bg-black/90">
      {/* 
        СЕРВЕРНАЯ ЧАСТЬ (мгновенный рендер):
        Картинка для мобильных устройств, которая отображается до загрузки видео.
      */}
      <div className="absolute inset-0 z-0">
        <Image
          src={HERO_POSTER_URL}
          alt="Круизы Vontamona"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* 
        КЛИЕНТСКАЯ ЧАСТЬ (Island Architecture):
        Добавляется поверх картинки только на десктопе, "оживляя" страницу интерактивным видео.
      */}
      <HeroVideoPlayer />

      {/* 
        ГРАДИЕНТЫ И ОВЕРЛЕИ
        Они должны быть ПОСЛЕ видео-плеера в DOM, чтобы перекрывать его (создавать затемнение).
        Всё это серверные компоненты.
      */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-linear-to-b from-black/60 via-black/45 to-black/70" />
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 700px 500px at 50% 42%, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.52) 25%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.18) 65%, rgba(0,0,0,0.08) 80%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/*  КОНТЕНТ (тоже полностью серверный!) */}
      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-4xl px-6 text-center">
          {/* Премиум-линия */}
          <div className="mb-8 flex animate-fade-in items-center justify-center gap-4">
            <div className="h-px w-12 bg-linear-to-r from-transparent to-white/40" />
            <span className="text-xs font-light tracking-[0.3em] text-white/60 uppercase">
              Vontamona Cruises
            </span>
            <div className="h-px w-12 bg-linear-to-l from-transparent to-white/40" />
          </div>

          {/* Заголовок */}
          <div className="mb-12 animate-fade-in">
            <h1
              className="mb-6 text-6xl font-bold tracking-tight text-white sm:text-7xl md:text-8xl"
              style={{ textShadow: "0 4px 20px rgba(0,0,0,0.8)" }}
            >
              Круизы по всему миру
            </h1>
            <p
              className="mx-auto max-w-3xl text-xl font-light text-white sm:text-2xl md:text-3xl"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.6)" }}
            >
              Подберём идеальный круиз под ваши даты, бюджет и желания
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-col items-center gap-6 animate-fade-in-delay">
            <Link
              href="/quiz"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full w-full sm:w-auto px-8 sm:px-16 py-5 sm:py-8 text-lg sm:text-xl font-semibold transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: "rgba(255,255,255,0.95)",
                color: "#0f172a",
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              }}
            >
              Подобрать круиз с экспертом
            </Link>

            <p className="text-sm font-light text-white/70">
              ✓ 15 лет опыта · MSC Explora · Подбор вручную
            </p>

            <ScrollToWidgetButton className="group mt-2 flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white">
              <span className="border-b border-white/30 transition-colors group-hover:border-white/60">
                Или посмотрите варианты самостоятельно
              </span>
              <svg
                className="h-4 w-4 transform transition-transform group-hover:translate-y-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </ScrollToWidgetButton>
          </div>
        </div>
      </div>

      {/* ⬇️ Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <ScrollToWidgetButton
          className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-110"
          ariaLabel="Прокрутить вниз к поиску круизов"
        >
          <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </ScrollToWidgetButton>
      </div>
    </section>
  );
}
