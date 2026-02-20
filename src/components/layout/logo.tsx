// src/components/layout/logo.tsx
import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className="text-xl font-semibold tracking-tight"
      aria-label="Vontamona — круизы и путешествия"
    >
      <span className="text-primary">Vonta</span>
      <span className="text-foreground">mona</span>
    </Link>
  );
}
