// src/components/sections/hero.tsx
'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Оптимизация: приостанавливаем видео когда вкладка неактивна
    const handleVisibilityChange = () => {
      if (videoRef.current) {
        if (document.hidden) {
          videoRef.current.pause();
        } else {
          videoRef.current.play();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const scrollToWidget = () => {
    const el = document.getElementById('widget');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen min-h-150 overflow-hidden">
      {/* 🎥 VIDEO BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="/video/hero-poster.jpg"
          className="h-full w-full object-cover"
          preload="metadata"
        >
          <source src="/video/hero-trim.mp4" type="video/mp4" />
          {/* Fallback для старых браузеров */}
          Ваш браузер не поддерживает видео.
        </video>
        
        {/* 🌫️ OVERLAY (затемнение для читаемости текста) */}
        <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/30 to-black/60" />
      </div>

      {/* 📝 CONTENT (поверх видео) */}
      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-4xl px-4 text-center">
          {/* Заголовок */}
          <div className="mb-12 animate-fade-in">
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl drop-shadow-2xl mb-6">
              Круизы по всему миру
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-xl text-white/90 sm:text-2xl drop-shadow-lg mb-4">
              Подберём идеальный круиз под ваши даты, бюджет и желания
            </p>
            <p className="text-white/80 text-lg drop-shadow-lg">
              Ответьте на 5 вопросов — и получите персональную подборку
            </p>
          </div>

          {/* 🎯 ГЛАВНАЯ КНОПКА */}
          <div className="animate-fade-in-delay flex flex-col items-center gap-4">
            <Link
              href="/quiz"
              className="inline-flex items-center gap-3 bg-white text-neutral-900 px-10 py-5 rounded-full text-xl font-semibold hover:bg-neutral-100 transition-all hover:scale-105 shadow-2xl"
            >
              <span>👉</span>
              <span>Подобрать круиз с экспертом</span>
            </Link>
            
            {/* Вторичная ссылка */}
            <button
              onClick={scrollToWidget}
              className="text-white/80 hover:text-white text-sm underline underline-offset-4 transition-colors"
            >
              Или посмотрите варианты самостоятельно ↓
            </button>
          </div>
        </div>
      </div>

      {/* ⬇️ SCROLL INDICATOR (стрелка вниз) */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <button
          onClick={scrollToWidget}
          className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-110"
          aria-label="Прокрутить вниз"
        >
          <svg
            className="h-6 w-6 text-white"
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
    </section>
  );
}
