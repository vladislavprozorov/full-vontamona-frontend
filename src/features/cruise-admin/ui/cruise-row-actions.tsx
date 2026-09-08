"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { deleteCruiseAction, togglePublishedAction } from "../model/cruise-admin.actions";

export function CruiseRowActions({ id, title }: { id: string; title: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const run = (action: () => Promise<{ ok: true } | { ok: false; error: string }>) => {
    setError(null);
    startTransition(async () => {
      const result = await action();
      if (result.ok) router.refresh();
      else setError(result.error);
    });
  };

  return (
    <div className="flex flex-col items-end gap-1">
      <div className="flex items-center gap-1">
        <Button
          type="button"
          size="sm"
          variant="ghost"
          disabled={isPending}
          onClick={() => run(() => togglePublishedAction(id))}
        >
          Публикация
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          disabled={isPending}
          className="text-red-600 hover:text-red-700 dark:text-red-400"
          onClick={() => {
            // Удаление необратимо — спрашиваем прямо, с названием круиза
            if (!window.confirm(`Удалить круиз «${title}»? Отменить это будет нельзя.`)) return;
            run(() => deleteCruiseAction(id));
          }}
        >
          Удалить
        </Button>
      </div>
      {error && <p className="text-xs text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}
