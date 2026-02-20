import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { HeaderChildProps } from "./header.types";

export function HeaderActions({ variant, state }: HeaderChildProps) {
  // ✅ Компонент ПОЛУЧАЕТ variant и state
  return (
    <div className="flex items-center gap-4">
      <Link href="/quiz">
        <Button size="sm">Подобрать круиз</Button>
      </Link>
    </div>
  );
}
