"use client";

import { motion } from "framer-motion";

export function SectionDivider() {
  return (
    <div className="relative py-12 overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-border/50" />
      </div>

      {/* Центральный элемент */}
      <div className="relative flex justify-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2,
          }}
          className="bg-background px-4"
        >
          <div className="flex items-center gap-3">
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="w-2 h-2 rounded-full bg-primary"
            />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Готовы подобрать круиз?
            </span>
            <motion.div
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="w-2 h-2 rounded-full bg-primary"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
