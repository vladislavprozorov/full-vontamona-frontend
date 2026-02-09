import { Logo } from '../logo';

export function FooterInfo() {
  return (
    <div className="space-y-4">
      <Logo />
      <p className="text-white/70 text-sm max-w-xs">
        Эксклюзивные круизы премиум-класса по лучшим направлениям мира. 
        Индивидуальный подход к каждому клиенту.
      </p>
      {/* <div className="space-y-2">
        <a 
          href="mailto:infovontamona@mail.ru" 
          className="block text-white/70 hover:text-white transition-colors text-sm"
        >
          infovontamona@mail.ru
        </a>
      </div> */}
    </div>
  );
}
