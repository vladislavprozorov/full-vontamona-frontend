"use client";

import { useEffect, useRef, useState } from "react";
import { HERO_VIDEO_URL } from "../constants";
import { useHeroVideo } from "../useHeroVideo";

export function HeroVideoPlayer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldRenderVideo, setShouldRenderVideo] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    setShouldRenderVideo(mql.matches);

    const handler = (e: MediaQueryListEvent) => setShouldRenderVideo(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  useHeroVideo({ videoRef, sectionRef: containerRef, enabled: shouldRenderVideo });

  if (!shouldRenderVideo) return null;

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 hidden md:block">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="h-full w-full object-cover"
        preload="metadata"
        style={{ animation: "slowZoom 30s ease-in-out infinite alternate" }}
      >
        <source src={HERO_VIDEO_URL} type="video/mp4" />
      </video>
    </div>
  );
}
