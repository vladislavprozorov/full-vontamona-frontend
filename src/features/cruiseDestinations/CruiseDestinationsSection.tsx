"use client";

import Image from "next/image";
import type { CruiseDestination } from "./cruise-destinations.data";
import { CRUISE_DESTINATIONS } from "./cruise-destinations.data";

interface CruiseDestinationsSectionProps {
  className?: string;
}

export function CruiseDestinationsSection({ className }: CruiseDestinationsSectionProps) {
  const handleDestinationClick = (destination: CruiseDestination) => {
    console.log("Selected cruise destination:", destination.slug);
    // TODO: Navigate to destination page or open modal
  };

  return (
    <section className={`relative mx-auto max-w-7xl px-4 py-12 ${className || ""}`}>
      {/* Rounded container with background image */}
      <div className="relative overflow-hidden rounded-3xl min-h-100 flex items-center justify-center">
        {/* Next.js optimized background image */}
        <Image
          src="/images/section-image.jpg"
          alt="Круизные направления"
          fill
          quality={80}
          priority
          className="object-cover"
        />

        {/* Overlay - градиент слева направо для лучшей читаемости */}
        <div
          className="absolute inset-0 z-1"
          style={{
            background:
              "linear-gradient(90deg, rgba(10,20,40,0.75) 0%, rgba(10,20,40,0.45) 40%, rgba(10,20,40,0.15) 70%, rgba(0,0,0,0.05) 100%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 text-center px-6 py-12 max-w-4xl">
          {/* Badges - стеклянный эффект */}
          <div className="flex gap-3 justify-center mb-6">
            <span
              className="inline-block px-4 py-1.5 text-orange-600 text-sm font-medium rounded-full border border-white/30"
              style={{
                backdropFilter: "blur(8px)",
                background: "rgba(255,255,255,0.9)",
              }}
            >
              Новинка
            </span>
            <span
              className="inline-block px-4 py-1.5 text-white text-sm font-medium rounded-full border border-white/30"
              style={{
                backdropFilter: "blur(8px)",
                background: "rgba(255,255,255,0.15)",
              }}
            >
              Морские круизы
            </span>
          </div>

          {/* Heading - более премиальный заголовок */}
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Откройте мир морских круизов
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Путешествуйте по морям с комфортом 5★
            <br />
            Незабываемые впечатления и премиальный сервис
          </p>

          {/* Destination buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
            {CRUISE_DESTINATIONS.map((destination) => (
              <button
                key={destination.id}
                onClick={() => handleDestinationClick(destination)}
                className="px-6 py-3 bg-white hover:bg-white/90 text-blue-600 font-medium rounded-full transition-all duration-200 hover:scale-105 shadow-lg"
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
