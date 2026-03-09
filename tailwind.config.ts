// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slowZoom: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.04)" },
        },
        lightOcean: {
          "0%": { backgroundPosition: "0% 50%" },
          "33%": { backgroundPosition: "100% 70%" },
          "66%": { backgroundPosition: "50% 30%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        textShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        shimmerSweep: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        particles: {
          "0%, 100%": { opacity: "0.3", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(1.2)" },
        },
      },
      animation: {
        "fade-in": "fadeIn 1s ease-out",
        "fade-in-delay": "fadeIn 1s ease-out 0.3s both",
        "fade-in-delay-2": "fadeIn 1s ease-out 0.6s both",
        "slow-zoom": "slowZoom 30s ease-in-out infinite alternate",
        "light-ocean": "lightOcean 8s linear infinite",
        "text-shift": "textShift 3s linear infinite",
        "shimmer-sweep": "shimmerSweep 2s linear infinite",
        particles: "particles 3s infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
