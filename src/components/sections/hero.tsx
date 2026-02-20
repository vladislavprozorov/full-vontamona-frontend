// src/components/sections/hero.tsx
'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const observer = new IntersectionObserver((entries) => {
    const entry = entries[0];
    if (videoRef.current) {
      if (entry.isIntersecting) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  })
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
    // ЖИВОЙ СИГНАЛ: медленный zoom (море "дышит")
    // 1.0 → 1.04 за 30 секунд
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
      {/* 🎥 VIDEO BACKGROUND (с медленным zoom эффектом) */}
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
          style={{
            animation: 'slowZoom 30s ease-in-out infinite alternate'
          }}
        >
          <source src="/video/hero-trim.mp4" type="video/mp4" />
          {/* Fallback для старых браузеров */}
          Ваш браузер не поддерживает видео.
        </video>
        
        {/* 🌫️ OVERLAY (сильнее затемнение для премиум-вида) */}
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/45 to-black/70" />
        
        {/* 🎯 RADIAL GRADIENT (сильнее под текст) */}
        <div 
          className="absolute inset-0 z-1"
          style={{
            background: 'radial-gradient(ellipse 700px 500px at 50% 42%, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.52) 25%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.18) 65%, rgba(0,0,0,0.08) 80%, rgba(0,0,0,0) 100%)'
          }}
        />
      </div>

      {/* 📝 CONTENT (Netflix/Apple стиль — чистый центр) */}
      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-4xl px-6 text-center">
          {/* 💎 ДИЗАЙНЕРСКИЙ АКЦЕНТ (премиум-линия) */}
          <div className="mb-8 animate-fade-in flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-linear-to-r from-transparent to-white/40" />
            <span className="text-xs tracking-[0.3em] text-white/60 font-light uppercase">
              Vontamona Cruises
            </span>
            <div className="h-px w-12 bg-linear-to-l from-transparent to-white/40" />
          </div>
          
          {/* 🏆 ЗАГОЛОВОК (Netflix стиль — мощно, чисто) */}
          <div className="mb-12 animate-fade-in">
            <h1 className="text-6xl font-bold tracking-tight text-white sm:text-7xl md:text-8xl mb-6"
                style={{ 
                  textShadow: '0 4px 20px rgba(0,0,0,0.8)'
                }}>
              Круизы по всему миру
            </h1>
            {/*  Подзаголовок (Apple стиль — легкий, читаемый) */}
            <p className="text-xl sm:text-2xl md:text-3xl text-white font-light max-w-3xl mx-auto"
               style={{ 
                 textShadow: '0 2px 10px rgba(0,0,0,0.6)'
               }}>
              Подберём идеальный круиз под ваши даты, бюджет и желания
            </p>
          </div>

          {/* 🎯 CTA ZONE (Luxury Concierge) */}
          <div className="animate-fade-in-delay flex flex-col items-center gap-6">
            {/* 💼 ГЛАВНАЯ КНОПКА (Concierge Premium — спокойствие и уверенность) */}
            <Link
              href="/quiz"
              className="group relative inline-flex items-center justify-center px-16 py-8 text-xl font-semibold overflow-hidden rounded-full transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: 'rgba(255,255,255,0.95)',
                color: '#0f172a',
                boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
              }}
            >
              Подобрать круиз с экспертом
            </Link>
            
            {/* Trust signal (тихо, снизу) */}
            <p className="text-white/70 text-sm font-light">
              ✓ 15 лет опыта · MSC Explora · Подбор вручную
            </p>
            
            {/* Вторичная ссылка */}
            <button
              onClick={scrollToWidget}
              className="text-white/60 hover:text-white text-sm transition-colors mt-2 flex items-center gap-2 group"
            >
              <span className="border-b border-white/30 group-hover:border-white/60 transition-colors">
                Или посмотрите варианты самостоятельно
              </span>
              <svg className="w-4 h-4 transform group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
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
