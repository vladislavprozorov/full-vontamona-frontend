'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import type { Benefit } from './benefits.types';

interface BenefitItemProps extends Benefit {
  index: number;
}

export function BenefitItem({ title, description, icon, featured, index }: BenefitItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      className="h-full"
    >
      <Card 
        className={`
          h-full flex flex-col bg-white relative overflow-hidden transition-all duration-300 ease-out
          ${featured 
            ? 'border-border/40 hover:border-border hover:shadow-[0_20px_40px_rgba(15,23,42,0.08)] before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-primary before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300' 
            : 'border-border/40 hover:border-border hover:shadow-[0_12px_40px_rgba(15,23,42,0.06)] before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-primary before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300'
          }
        `}
      >
        <CardContent className="p-6 flex flex-col h-full">
          {/* ICON */}
          {icon && (
            <div className="h-11 w-11 rounded-full border border-border/60 flex items-center justify-center mb-4 bg-[hsl(215_20%_97%)]">
              <div className="text-primary [&>svg]:w-5 [&>svg]:h-5">
                {icon}
              </div>
            </div>
          )}

          {/* TITLE */}
          <h3 className="mb-2 text-[17px] font-semibold tracking-tight text-foreground leading-snug">
            {title}
          </h3>

          {/* DESCRIPTION */}
          <p className="text-[14px] leading-relaxed text-neutral-600">
            {description}
          </p>

          {/* Якорь внизу (опционально) */}
          {featured && (
            <div className="mt-auto pt-4 border-t border-border/20">
              <span className="text-[11px] font-medium text-neutral-500 uppercase tracking-widest">
                Главное
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
