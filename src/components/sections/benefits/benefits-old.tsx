'use client';

import { motion } from 'framer-motion';
import { HERO_BENEFITS } from './benefits.data';
import { BenefitItem } from './benefits-item';
import type { BenefitsSectionProps } from './benefits.types';
import Link from 'next/link';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.21, 0.47, 0.32, 0.98] as const
    }
  }
};

export function BenefitsSection({ className = '' }: BenefitsSectionProps) {
  return (
    <section className={`py-24 bg-background ${className}`}>
      <div className="mx-auto max-w-7xl px-4">
        <motion.header 
          className="mb-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block mb-4 px-4 py-1.5 text-sm font-medium text-primary bg-primary/10 rounded-full">
              Почему выбирают нас
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Почему выбирают нас
          </h2>
          
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Три главных причины доверять организацию вашего круиза профессионалам VON TAMONA
          </p>
        </motion.header>

        <motion.div 
          className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {HERO_BENEFITS.map((benefit, index) => (
            <BenefitItem 
              key={benefit.title} 
              {...benefit} 
              index={index}
            />
          ))}
        </motion.div>

        {/* Ссылка на полный список преимуществ */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Link
            href="/about#benefits"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors group"
          >
            Смотреть все преимущества
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
