"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./footer";

export function ConditionalFooter() {
  const pathname = usePathname();

  // Не показываем футер на странице quiz
  if (pathname?.startsWith("/quiz")) {
    return null;
  }

  return <Footer />;
}
