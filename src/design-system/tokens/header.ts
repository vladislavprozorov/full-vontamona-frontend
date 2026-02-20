export const headerTokens = {
  height: {
    default: "64px",
    scrolled: "56px",
  },

  variants: {
    transparent: {
      default: {
        background: "transparent",
        textColor: "#ffffff",
        border: "transparent",
        backdropFilter: "none",
        boxShadow: "none",
      },
      scrolled: {
        background: "rgba(255, 255, 255, 0.95)",
        textColor: "#0f172a",
        border: "rgba(0, 0, 0, 0.08)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      },
    },
    solid: {
      default: {
        background: "#ffffff",
        textColor: "#0f172a",
        border: "rgba(0, 0, 0, 0.08)",
        backdropFilter: "none",
        boxShadow: "none",
      },
      scrolled: {
        background: "#ffffff",
        textColor: "#0f172a",
        border: "rgba(0, 0, 0, 0.08)",
        backdropFilter: "none",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      },
    },
  },
} as const;

export type HeaderVariant = keyof typeof headerTokens.variants;
export type HeaderState = "default" | "scrolled";
