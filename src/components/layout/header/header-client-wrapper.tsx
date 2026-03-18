"use client";

import { useEffect, useState } from "react";
import { headerTokens } from "@/design-system/tokens/header";
import type { HeaderProps, HeaderState } from "./header.types";

interface HeaderClientWrapperProps extends HeaderProps {
  children: React.ReactNode;
}

export function HeaderClientWrapper({
  variant = "solid",
  className,
  children,
}: HeaderClientWrapperProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const state: HeaderState = isScrolled ? "scrolled" : "default";
  const styles = headerTokens.variants[variant][state];

  return (
    <header
      className={`group fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${className || ""}`}
      data-scrolled={isScrolled ? "true" : "false"}
      style={{
        height: headerTokens.height[state],
        background: styles.background,
        borderBottom: `1px solid ${styles.border}`,
        color: styles.textColor,
        backdropFilter: styles.backdropFilter,
        boxShadow: styles.boxShadow,
      }}
    >
      <div className="relative mx-auto flex items-center justify-between px-4 transition-all duration-300 h-full max-w-[1280px]">
        {children}
      </div>
    </header>
  );
}
