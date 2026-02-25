"use client";

import Link from "next/link";
import { useRef } from "react";
import { HeroVideo } from "@/features/hero-video";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const scrollToWidget = () => {
    document.getElementById("widget")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} className="relative h-screen min-h-150 overflow-hidden">
      {/* 🎥 Видео-фон — вся логика инкапсулирована в фиче */}
      <HeroVideo sectionRef={sectionRef} />

      {/* 📝 CONTENT */}
      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-4xl px-6 text-center">
          {/* Премиум-линия */}
          <div className="mb-8 animate-fade-in flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-linear-to-r from-transparent to-white/40" />
            <span className="text-xs tracking-[0.3em] text-white/60 font-light uppercase">
              Vontamona Cruises
            </span>
            <div className="h-px w-12 bg-linear-to-l from-transparent to-white/40" />
          </div>

          {/* Заголовок */}
          <div className="mb-12 animate-fade-in">
            <h1
              className="text-6xl font-bold tracking-tight text-white sm:text-7xl md:text-8xl mb-6"
              style={{ textShadow: "0 4px 20px rgba(0,0,0,0.8)" }}
            >
              Круизы по всему миру
            </h1>
            <p
              className="text-xl sm:text-2xl md:text-3xl text-white font-light max-w-3xl mx-auto"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.6)" }}
            >
              Подберём идеальный круиз под ваши даты, бюджет и желания
            </p>
          </div>

          {/* CTA */}
          <div className="animate-fade-in-delay flex flex-col items-center gap-6">
            <Link
              href="/quiz"
              className="group relative inline-flex items-center justify-center px-16 py-8 text-xl font-semibold overflow-hidden rounded-full transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: "rgba(255,255,255,0.95)",
                color: "#0f172a",
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              }}
            >
              Подобрать круиз с экспертом
            </Link>

            <p className="text-white/70 text-sm font-light">
              ✓ 15 лет опыта · MSC Explora · Подбор вручную
            </p>

            <button
              onClick={scrollToWidget}
              className="text-white/60 hover:text-white text-sm transition-colors mt-2 flex items-center gap-2 group"
            >
              <span className="border-b border-white/30 group-hover:border-white/60 transition-colors">
                Или посмотрите варианты самостоятельно
              </span>
              <svg
                className="w-4 h-4 transform group-hover:translate-y-1 transition-transform"
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
            </button>
          </div>
        </div>
      </div>

      {/* ⬇️ Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <button
          onClick={scrollToWidget}
          className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-110"
          aria-label="Прокрутить вниз"
        >
          <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
