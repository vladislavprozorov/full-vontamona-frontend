import { Header } from '@/components/layout/header/header';
import { Hero } from '@/components/sections/hero';
import { BenefitsSection } from '@/components/sections/benefits';
import { SectionDivider } from '@/components/ui/section-divider';
import { LazyPacWidget } from '@/components/lazy-pac-widget';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      {/* TRANSPARENT header - для главной страницы с hero */}
      <Header variant="transparent" />
      
      <main>
        {/* HERO */}
        <Hero />

        {/* BENEFITS - Почему мы? */}
        <BenefitsSection />

        {/* DIVIDER */}
        <SectionDivider />

        {/* PAC WIDGET - вторичный, после квиза */}
        <section id="widget" className="py-16">
          <div className="container mx-auto px-4 mb-8 text-center">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Или выберите круиз самостоятельно
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Посмотрите доступные круизы и забронируйте онлайн
            </p>
          </div>
          <LazyPacWidget />
        </section>

      </main>
    </>
  );
}
