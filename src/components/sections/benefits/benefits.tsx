'use client';

import { motion } from 'framer-motion';
import { HERO_BENEFITS } from './benefits.data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { TrustTicker } from './trust-ticker';
import type { BenefitsSectionProps } from './benefits.types';
import type { Benefit } from './benefits.types';
import Link from 'next/link';
import { Sparkles, Anchor } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.21, 0.47, 0.32, 0.98] as const
    }
  }
};

// Главная карточка-манифест (слева) - ДОМИНИРУЕТ
function MainBenefitCard({ benefit }: { benefit: Benefit }) {
  return (
    <motion.div
      variants={itemVariants}
      className="md:row-span-2"
    >
      <Card className="group h-full flex flex-col border-neutral-900/8 bg-white relative overflow-hidden transition-all duration-700 ease-out hover:shadow-[0_30px_90px_rgba(0,0,0,0.08)] before:absolute before:left-0 before:top-0 before:h-full before:w-[3px] before:bg-gradient-to-b before:from-primary/40 before:via-primary/20 before:to-transparent before:opacity-60">
        {/* Тонкий шум для текстуры */}
        <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />
        
        <CardContent className="relative p-9 md:p-11 flex flex-col h-full">
          {/* ICON - крупный, уверенный */}
          <div className="h-14 w-14 rounded-2xl border border-neutral-900/8 flex items-center justify-center mb-7 bg-gradient-to-br from-white to-neutral-50/50 shadow-sm transition-all duration-700 group-hover:shadow-md group-hover:border-neutral-900/12">
            <div className="text-primary [&>svg]:w-7 [&>svg]:h-7">
              {benefit.icon}
            </div>
          </div>

          {/* TITLE - крупнее, доминирует */}
          <h3 className="mb-5 text-[26px] md:text-[30px] font-semibold tracking-tight leading-[1.12] text-neutral-900">
            Вы отдыхаете — мы берём <span className="text-primary/90">ответственность</span> на себя
          </h3>

          {/* SUBTITLE */}
          {benefit.subtitle && (
            <p className="mb-5 text-[15px] font-medium text-neutral-700 leading-[1.6]">
              {benefit.subtitle}
            </p>
          )}

          {/* DESCRIPTION */}
          <p className="mb-7 text-[15px] leading-[1.7] text-neutral-600">
            {benefit.description}
          </p>

          {/* ОДНА МОЩНАЯ ФРАЗА - без лишних рамок */}
          <div className="mb-auto">
            <p className="text-[14px] text-neutral-800 leading-[1.7] border-l-2 border-primary/30 pl-4">
              Один человек. Один контакт. <span className="text-neutral-900 font-medium">Полный контроль.</span>
            </p>
          </div>

          {/* Живое доверие - тихо, для внимательных */}
          <div className="mt-8 pt-6 border-t border-neutral-900/5">
            <p className="text-[11px] text-neutral-400 leading-relaxed">
              Работаем напрямую с <span className="text-neutral-600 font-medium">MSC Cruises</span> и другими премиальными линиями
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Вторичные карточки - контролируемая асимметрия
function SecondaryBenefitCard({ benefit, isLast }: { benefit: Benefit; isLast?: boolean }) {
  return (
    <motion.div
      variants={itemVariants}
      className={isLast ? "md:pr-6" : ""}
    >
      <Card className={`group h-full flex flex-col border-neutral-900/6 relative overflow-hidden transition-all duration-700 ease-out hover:shadow-[0_20px_60px_rgba(0,0,0,0.05)] hover:translate-y-[-2px] ${
        isLast 
          ? 'bg-gradient-to-br from-white to-neutral-50/50 border-l-2 border-l-neutral-900/8' 
          : 'bg-white'
      }`}>
        <CardContent className={isLast ? "p-7 flex flex-col h-full" : "p-8 flex flex-col h-full"}>
          {/* ICON - асимметричный вес */}
          <div className={`rounded-xl border border-neutral-900/6 flex items-center justify-center bg-gradient-to-br from-white to-neutral-50/30 transition-all duration-700 group-hover:border-neutral-900/10 ${
            isLast 
              ? 'h-9 w-9 mb-4' 
              : 'h-11 w-11 mb-5'
          }`}>
            <div className={`text-primary ${isLast ? '[&>svg]:w-4 [&>svg]:h-4' : '[&>svg]:w-5 [&>svg]:h-5'}`}>
              {benefit.icon}
            </div>
          </div>

          {/* TITLE - верхняя короче, нижняя плотнее */}
          <h3 className={`font-semibold tracking-tight text-neutral-900 ${
            isLast 
              ? 'text-[16px] leading-[1.3] mb-2.5' 
              : 'text-[18px] leading-[1.2] mb-3'
          }`}>
            {benefit.title}
          </h3>

          {/* DESCRIPTION - темнее на 6-7% */}
          <p className={`leading-[1.7] text-neutral-600 mb-auto ${
            isLast ? 'text-[13px]' : 'text-[14px]'
          }`}>
            {benefit.description}
          </p>

          {/* Тихий индикатор - последняя с акцентом */}
          {isLast ? (
            <div className="mt-5 pt-4 border-t border-neutral-900/5 flex items-center gap-2 opacity-50">
              <div className="w-1 h-1 rounded-full bg-primary" />
              <div className="h-px flex-1 bg-gradient-to-r from-primary/20 to-transparent" />
            </div>
          ) : (
            <div className="mt-6 flex items-center gap-2 opacity-40 group-hover:opacity-60 transition-opacity duration-700">
              <div className="w-1 h-1 rounded-full bg-primary" />
              <div className="w-1 h-1 rounded-full bg-primary/50" />
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}


export function BenefitsSection({ className = '' }: BenefitsSectionProps) {
  const [mainBenefit, ...secondaryBenefits] = HERO_BENEFITS;

  return (
    <section className={`relative py-24 md:py-32 bg-gradient-to-b from-white via-neutral-50/30 to-white overflow-hidden ${className}`}>
      {/* Тонкий декоративный элемент сверху */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />
      
      {/* Subtle radial градиент */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_hsl(var(--primary)/0.03)_0%,_transparent_60%)]" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header - премиум cruise стиль */}
        <motion.header 
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          {/* Декоративный элемент сверху - тише */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-neutral-300" />
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-medium tracking-[0.2em] text-neutral-400">
                LUXURY CRUISE CONCIERGE
              </span>
            </div>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-neutral-300" />
          </div>
          
          {/* Главный заголовок */}
          <h2 className="mb-4 text-[32px] md:text-[42px] leading-[1.1] font-semibold text-neutral-900 max-w-3xl mx-auto">
            Мы не продаём круизы. <br />
            Мы создаём <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70 italic">отдых без стресса</span>.
          </h2>
          
          {/* Подзаголовок */}
          <p className="text-[14px] text-neutral-500 max-w-xl mx-auto leading-relaxed">
            Персональный сервис мирового уровня для тех, кто ценит время и комфорт
          </p>
        </motion.header>

        {/* Grid карточек - асимметричный */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 gap-6 mb-14"
        >
          <MainBenefitCard benefit={mainBenefit} />
          
          <div className="grid gap-6">
            {secondaryBenefits.map((benefit, index) => (
              <SecondaryBenefitCard 
                key={index} 
                benefit={benefit} 
                isLast={index === secondaryBenefits.length - 1}
              />
            ))}
          </div>
        </motion.div>

        {/* Личный CTA - сервис, не заявка */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-14 text-center"
        >
          <Link
            href="/consultation"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-neutral-900 text-white rounded-full text-[14px] font-semibold hover:bg-neutral-800 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-neutral-900/20 hover:shadow-xl hover:shadow-neutral-900/30"
          >
            Обсудить мой маршрут
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="ml-0.5">
              <path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <p className="mt-3 text-[12px] text-neutral-500">
            Ответим в течение 2 часов
          </p>
        </motion.div>

        {/* Trust ticker - компактнее */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-10"
        >
          <TrustTicker />
        </motion.div>

        {/* Якорь уверенности - тише */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-[12px] text-neutral-400 leading-relaxed max-w-xl mx-auto">
            Нам доверяют клиенты, которые ценят <span className="text-neutral-600 font-medium">спокойствие</span> и <span className="text-neutral-600 font-medium">безупречный сервис</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
