"use client";

import Image from "next/image";
import { CRUISE_DESTINATIONS } from "./cruise-destinations.data";

export function CruiseDestinationsSection() {
  return (
    <section className="mx-auto max-w-7xl px-3 sm:px-6 py-10 sm:py-20">
      <div className="relative overflow-hidden rounded-2xl sm:rounded-[32px] min-h-120 sm:h-120 flex items-center justify-center">
        {/* Фон с лёгким zoom для "дорогого" кадра */}
        <Image
          src="/images/section.jpg"
          alt="Морские круизы"
          fill
          quality={90}
          sizes="(max-width: 768px) 100vw, 1280px"
          className="object-cover scale-[1.05]"
        />

        {/* Глубокий кинематографичный overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-[rgba(10,20,40,0.45)] via-[rgba(10,20,40,0.6)] to-[rgba(10,20,40,0.75)]" />

        {/* Мягкий световой акцент сверху */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.08),transparent_60%)]" />

        <div className="relative z-10 text-center w-full max-w-3xl px-4 sm:px-6 py-10 sm:py-0">
          {/* Минимал бейджи */}
          <div className="flex justify-center gap-2 sm:gap-3 mb-5 sm:mb-8">
            <span className="px-3 sm:px-4 py-1 sm:py-1.5 text-[11px] tracking-[0.18em] uppercase rounded-full bg-white/10 backdrop-blur-lg text-white/80 border border-white/20">
              Новинка
            </span>
            <span className="px-3 sm:px-4 py-1 sm:py-1.5 text-[11px] tracking-[0.18em] uppercase rounded-full bg-white/10 backdrop-blur-lg text-white/80 border border-white/20">
              Морские круизы
            </span>
          </div>

          <h2 className="text-[26px] sm:text-4xl md:text-5xl font-semibold text-white leading-tight mb-4 sm:mb-6">
            Откройте мир морских круизов
          </h2>

          <p className="text-sm sm:text-lg md:text-xl text-white/75 font-light mb-7 sm:mb-10 px-1 leading-relaxed">
            Путешествуйте по морям с комфортом 5★ Незабываемые впечатления и премиальный сервис
          </p>

          {/* Кнопки: 2 колонки на мобилке, flex wrap на sm+ */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-2.5 sm:gap-4 [&>*:last-child:nth-child(odd)]:col-span-2">
            {CRUISE_DESTINATIONS.map((destination) => (
              <button
                key={destination.id}
                className="px-3 sm:px-8 py-2.5 sm:py-3 rounded-full bg-white/95 text-slate-900 text-sm font-medium tracking-wide transition-all duration-300 hover:bg-white hover:scale-[1.02] hover:shadow-lg"
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
