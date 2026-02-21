import { RefObject, useEffect } from "react";

interface UseHeroVideoOptions {
  videoRef: RefObject<HTMLVideoElement | null>;
  sectionRef: RefObject<HTMLElement | null>;
}

export function useHeroVideo({ videoRef, sectionRef }: UseHeroVideoOptions) {
  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;

    if (!video || !section) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
      } else {
        video.play().catch(() => {});
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          video.pause();
        } else if (!document.hidden) {
          video.play().catch(() => {});
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(section);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      observer.disconnect();
    };
  }, [videoRef, sectionRef]);
}
