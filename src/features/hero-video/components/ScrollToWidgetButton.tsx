"use client";

import { ReactNode } from "react";

interface Props {
  className?: string;
  children?: ReactNode;
  ariaLabel?: string;
}

export function ScrollToWidgetButton({ className, children, ariaLabel }: Props) {
  const scrollToWidget = () => {
    document.getElementById("widget")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <button onClick={scrollToWidget} className={className} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
