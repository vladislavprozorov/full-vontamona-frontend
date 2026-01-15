import { Button } from '@/components/ui/button';
import type { HeaderChildProps } from './header.types';

export function HeaderActions({ variant, state }: HeaderChildProps) {
  // ✅ Компонент ПОЛУЧАЕТ variant и state
  return (
    <div className="flex items-center gap-4">
      <a
        href="tel:+79634551168"
        className="hidden text-sm font-medium md:block transition-colors"
        style={{ color: 'inherit' }}
      >
        +7 963 455-11-68
      </a>

      <Button size="sm">
        Подобрать круиз
      </Button>
    </div>
  );
}
