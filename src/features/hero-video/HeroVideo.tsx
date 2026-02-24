"use client";

import { useRef } from "react";
import { useHeroVideo } from "./useHeroVideo";

interface HeroVideoProps {
  sectionRef: React.RefObject<HTMLElement | null>;
}

export function HeroVideo({ sectionRef }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useHeroVideo({ videoRef, sectionRef });

  return (
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
          animation: "slowZoom 30s ease-in-out infinite alternate",
        }}
      >
        <source src="/video/hero-trim.mp4" type="video/mp4" />
      </video>

      {/* Линейный оверлей */}
      <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/45 to-black/70" />

      {/* Радиальный градиент под текст */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 700px 500px at 50% 42%, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.52) 25%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.18) 65%, rgba(0,0,0,0.08) 80%, rgba(0,0,0,0) 100%)",
        }}
      />
    </div>
  );
}
