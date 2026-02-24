"use client";

import Image from "next/image";
import { CRUISE_DESTINATIONS } from "./cruise-destinations.data";

export function CruiseDestinationsSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="relative overflow-hidden rounded-[32px] h-[480px] flex items-center justify-center">
        {/* Фон с лёгким zoom для “дорогого” кадра */}
        <Image
          src="/images/section.jpg"
          alt="Морские круизы"
          fill
          quality={90}
          className="object-cover scale-[1.05]"
        />

        {/* Глубокий кинематографичный overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,20,40,0.45)] via-[rgba(10,20,40,0.6)] to-[rgba(10,20,40,0.75)]" />

        {/* Мягкий световой акцент сверху (едва заметный luxury-штрих) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.08),transparent_60%)]" />

        <div className="relative z-10 text-center max-w-3xl px-6">
          {/* Минимал бейджи */}
          <div className="flex justify-center gap-3 mb-8">
            <span className="px-4 py-1.5 text-[11px] tracking-[0.2em] uppercase rounded-full bg-white/10 backdrop-blur-lg text-white/80 border border-white/20">
              Новинка
            </span>
            <span className="px-4 py-1.5 text-[11px] tracking-[0.2em] uppercase rounded-full bg-white/10 backdrop-blur-lg text-white/80 border border-white/20">
              Морские круизы
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-5xl font-semibold text-white leading-tight mb-6">
            Откройте мир морских круизов
          </h2>

          <p className="text-lg md:text-xl text-white/75 font-light mb-10">
            Путешествуйте по морям с комфортом 5★ <br />
            Незабываемые впечатления и премиальный сервис
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {CRUISE_DESTINATIONS.map((destination) => (
              <button
                key={destination.id}
                className="px-8 py-3 rounded-full bg-white/95 text-slate-900 text-sm font-medium tracking-wide transition-all duration-300 hover:bg-white hover:scale-[1.02] hover:shadow-lg"
              >
                {destination.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
