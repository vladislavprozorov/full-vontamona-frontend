import { Header } from '@/components/layout/header/header';
import { Hero } from '@/components/sections/hero';
import { PacWidget } from '@/features/pac-widget/pac-widget';
import { FeedbackForm } from '@/features/feedback/feedback-form';
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

        {/* PAC WIDGET */}
        <PacWidget /> 

        {/* FEEDBACK / CONSULTATION */}

<section className="py-24">
  <h2>Нужна помощь?</h2>
  <Button asChild>
    <Link href="/consultation">
      Получить консультацию
    </Link>
  </Button>
</section>

      </main>
    </>
  );
}
