import { Button } from '@/components/ui/button';
import type { HeaderChildProps } from './header.types';

export function HeaderActions({ variant, state }: HeaderChildProps) {
  // ✅ Компонент ПОЛУЧАЕТ variant и state
  return (
    <div className="flex items-center gap-4">
      <Button size="sm">
        Подобрать круиз
      </Button>
    </div>
  );
}
