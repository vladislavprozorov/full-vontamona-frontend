"use client";

import { motion } from "framer-motion";
import { Award, MapPin, ShieldCheck, Users } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/layout/header/header";
import { BENEFITS, COMPANY_FACTS } from "@/components/sections/benefits/benefits.data";
import { BenefitItem } from "@/components/sections/benefits/benefits-item";

export default function AboutPage() {
  return (
    <>
      {/* SOLID header для внутренних страниц */}
      <Header variant="solid" />

      <main className="min-h-screen">
        {/* Hero секция */}
        <section className="pt-32 pb-16 bg-background">
          <div className="mx-auto max-w-7xl px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">О компании VON TAMONA</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Мы делаем круизные путешествия доступными и комфортными для каждого. С 2020 года
                помогаем клиентам открывать мир с палубы лучших лайнеров.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Наша история */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block mb-4 px-4 py-1.5 text-sm font-medium text-primary bg-primary/10 rounded-full">
                  Наша история
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Как всё начиналось</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    VON TAMONA была основана в 2020 году группой энтузиастов круизного туризма. Мы
                    заметили, что в России круизы воспринимаются как роскошь, доступная единицам.
                  </p>
                  <p>
                    Наша миссия — сделать круизные путешествия понятными, доступными и комфортными
                    для каждого. Мы работаем напрямую с ведущими круизными линиями, что позволяет
                    предлагать лучшие цены на рынке.
                  </p>
                  <p>
                    Сегодня мы — официальный партнёр MSC Cruises и других крупнейших операторов. За
                    5+ лет отправили в круизы более 5000 довольных клиентов.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-2 gap-4"
              >
                <div className="p-6 bg-transparent rounded-xl border border-primary/30 hover:border-primary/50 transition-colors">
                  <div className="text-4xl font-bold text-primary mb-2">5+</div>
                  <div className="text-sm text-muted-foreground">лет на рынке</div>
                </div>
                <div className="p-6 bg-transparent rounded-xl border border-primary/30 hover:border-primary/50 transition-colors">
                  <div className="text-4xl font-bold text-primary mb-2">5000+</div>
                  <div className="text-sm text-muted-foreground">довольных клиентов</div>
                </div>
                <div className="p-6 bg-transparent rounded-xl border border-primary/30 hover:border-primary/50 transition-colors">
                  <div className="text-4xl font-bold text-primary mb-2">200+</div>
                  <div className="text-sm text-muted-foreground">маршрутов</div>
                </div>
                <div className="p-6 bg-transparent rounded-xl border border-primary/30 hover:border-primary/50 transition-colors">
                  <div className="text-4xl font-bold text-primary mb-2">4.9/5</div>
                  <div className="text-sm text-muted-foreground">рейтинг</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Все преимущества */}
        <section id="benefits" className="py-24 bg-background border-t border-border/30">
          <div className="mx-auto max-w-7xl px-4">
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Почему выбирают нас</h2>
              <p className="text-lg text-muted-foreground">Все преимущества работы с VON TAMONA</p>
            </motion.header>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {BENEFITS.map((benefit, index) => (
                <BenefitItem key={benefit.title} {...benefit} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Факты о компании расширенные */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4">
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">VON TAMONA в цифрах</h2>
            </motion.header>

            <div className="grid gap-8 md:grid-cols-2">
              {COMPANY_FACTS.map((fact, index) => (
                <motion.div
                  key={fact.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-8 rounded-xl bg-transparent border border-border/60 hover:border-border hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="text-primary">{fact.icon}</div>
                    <h3 className="text-2xl font-bold">{fact.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-lg mb-6">{fact.description}</p>

                  {/* Дополнительные детали */}
                  {index === 0 && (
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        Карибы, Средиземноморье, Северная Европа
                      </li>
                      <li className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        Азия, Трансатлантика, Экзотика
                      </li>
                    </ul>
                  )}

                  {index === 1 && (
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        5000+ довольных клиентов
                      </li>
                      <li className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-primary" />
                        Рейтинг 4.9/5 на независимых площадках
                      </li>
                      <li className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-primary" />
                        Официальный партнёр MSC Cruises
                      </li>
                    </ul>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA секция */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Готовы отправиться в круиз мечты?
              </h2>
              <p className="text-lg mb-8 opacity-90">
                Подберём идеальный маршрут и позаботимся обо всех деталях
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/consultation"
                  className="px-8 py-3 bg-background text-foreground rounded-lg font-semibold hover:bg-background/90 transition-colors"
                >
                  Получить консультацию
                </Link>
                <Link
                  href="/"
                  className="px-8 py-3 border-2 border-primary-foreground/20 rounded-lg font-semibold hover:bg-primary-foreground/10 transition-colors"
                >
                  Подобрать круиз
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
