import { Logo } from '../logo';

export function FooterInfo() {
  return (
    <div className="space-y-4">
      <Logo />
      <p className="text-white/70 text-sm max-w-xs">
        Эксклюзивные круизы премиум-класса по лучшим направлениям мира. 
        Индивидуальный подход к каждому клиенту.
      </p>
    </div>
  );
}
