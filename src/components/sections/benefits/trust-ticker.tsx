'use client';

import { motion } from 'framer-motion';
import { TRUST_MARKERS } from './benefits.data';

export function TrustTicker() {
  // Дублируем markers для бесшовного loop
  const markers = [...TRUST_MARKERS, ...TRUST_MARKERS];

  return (
    <div className="relative overflow-hidden py-10 border-y border-border/20">
      <motion.div
        className="flex items-center gap-20 md:gap-32"
        animate={{
          x: [0, -50 + '%'],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 50, // очень медленно (50 секунд)
            ease: "linear",
          },
        }}
      >
        {markers.map((marker, index) => (
          <div 
            key={`${marker.label}-${index}`}
            className="shrink-0 text-center min-w-45"
          >
            <div className="text-[26px] md:text-[32px] font-bold text-foreground/60 tracking-tight">
              {marker.label}
            </div>
            <div className="text-[13px] text-[hsl(215_20%_50%)] mt-1.5 uppercase tracking-wide opacity-60">
              {marker.sublabel}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-background to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-background to-transparent pointer-events-none" />
    </div>
  );
}
