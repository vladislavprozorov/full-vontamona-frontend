import { Logo } from '../logo';

export function FooterInfo() {
  return (
    <div className="space-y-4">
      <Logo />
      <p className="text-white/70 text-sm max-w-xs">
        Эксклюзивные круизы премиум-класса по лучшим направлениям мира. 
        Индивидуальный подход к каждому клиенту.
      </p>
      <div className="space-y-2">
        <a 
          href="tel:+79634551168" 
          className="block text-white hover:text-white/90 transition-colors text-sm font-medium"
        >
          +7 963 455-11-68
        </a>
        <a 
          href="mailto:info@vontamona.com" 
          className="block text-white/70 hover:text-white transition-colors text-sm"
        >
          info@vontamona.com
        </a>
      </div>
    </div>
  );
}
