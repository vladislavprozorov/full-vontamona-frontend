import Link from 'next/link';

export function FooterInfo() {
  return (
    <div className="space-y-4">
      {/* Logo для footer - белый текст */}
      <Link
        href="/"
        className="text-xl font-semibold tracking-tight inline-block"
        aria-label="Vontamona — круизы и путешествия"
      >
        <span className="text-white/90">Vonta</span>
        <span className="text-white">mona</span>
      </Link>
      
      <p className="text-white/70 text-sm max-w-xs">
        Эксклюзивные круизы премиум-класса по лучшим направлениям мира. 
        Индивидуальный подход к каждому клиенту.
      </p>
    </div>
  );
}
