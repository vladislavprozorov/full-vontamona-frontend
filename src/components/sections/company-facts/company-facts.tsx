'use client';

import { motion } from 'framer-motion';
import { COMPANY_FACTS } from '../benefits/benefits.data';

export function CompanyFactsSection() {
  return (
    <section className="py-16 bg-background border-t border-b border-border/30">
      <div className="mx-auto max-w-7xl px-4">
        <motion.header 
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Факты о компании
          </h2>
          <p className="text-muted-foreground">
            Цифры, которые говорят сами за себя
          </p>
        </motion.header>

        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {COMPANY_FACTS.map((fact, index) => (
            <motion.div
              key={fact.title}
              initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="flex items-start gap-4 p-6 rounded-xl bg-transparent border border-border/60 hover:border-border hover:shadow-md transition-all"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="shrink-0 text-primary"
              >
                {fact.icon}
              </motion.div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  {fact.title}
                </h3>
                <p className="text-muted-foreground">
                  {fact.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <a
            href="/about"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Узнать больше о компании
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
