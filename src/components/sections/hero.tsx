// src/components/sections/hero.tsx
'use client';

import { HeroWidget } from '@/features/pac-widget/hero-widget';
import { useEffect, useRef } from 'react';

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

  const scrollToResults = () => {
    const el = document.getElementById('cruises');
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
        <div className="mx-auto w-full max-w-7xl px-4">
          {/* Заголовок */}
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl drop-shadow-2xl">
              Круизы по всему миру
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90 sm:text-xl drop-shadow-lg">
              Подберём идеальный морской круиз под ваши даты, бюджет и желания
            </p>
          </div>

          {/* 🎯 ФОРМА ПОИСКА (вместо кнопок) */}
          <div className="animate-fade-in-delay">
            <HeroWidget />
          </div>
        </div>
      </div>

      {/* ⬇️ SCROLL INDICATOR (стрелка вниз) */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <button
          onClick={scrollToResults}
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
