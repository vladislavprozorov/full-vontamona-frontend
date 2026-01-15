import { Logo } from '../logo';

export function FooterInfo() {
  return (
    <div className="space-y-4">
      <Logo />
      <p className="text-footer-text-secondary text-sm max-w-xs">
        Эксклюзивные круизы премиум-класса по лучшим направлениям мира. 
        Индивидуальный подход к каждому клиенту.
      </p>
      <div className="space-y-2">
        <a 
          href="tel:+79634551168" 
          className="block text-footer-text-primary hover:text-footer-link-hover transition-colors text-sm font-medium"
        >
          +7 963 455-11-68
        </a>
        <a 
          href="mailto:info@vontamona.com" 
          className="block text-footer-link-default hover:text-footer-link-hover transition-colors text-sm"
        >
          info@vontamona.com
        </a>
      </div>
    </div>
  );
}
