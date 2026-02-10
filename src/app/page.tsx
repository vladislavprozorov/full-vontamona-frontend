import { Header } from '@/components/layout/header/header';
import { Hero } from '@/components/sections/hero';
import { BenefitsSection } from '@/components/sections/benefits';
import { CompanyFactsSection } from '@/components/sections/company-facts';
import { SectionDivider } from '@/components/ui/section-divider';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Lazy loading виджета (он не нужен сразу)
const PacWidget = dynamic(() => import('@/features/pac-widget/pac-widget').then(mod => ({ default: mod.PacWidget })), {
  ssr: false,
  loading: () => (
    <div className="mx-auto max-w-7xl px-4 py-24">
      <div className="rounded-xl border bg-background p-6 shadow-sm">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Загрузка виджета...</p>
          </div>
        </div>
      </div>
    </div>
  )
});

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

        {/* COMPANY FACTS */}
        <CompanyFactsSection />

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
          <PacWidget />
        </section>

      </main>
    </>
  );
}
