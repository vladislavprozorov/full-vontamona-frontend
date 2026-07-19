import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/header/header";
import { type CruiseBadge, mscBellissimaAsia } from "@/features/cruise-detail";

export const metadata: Metadata = {
  title: mscBellissimaAsia.seo.title,
  description: mscBellissimaAsia.seo.description,
};

export default function MscBellissimaAsiaPage() {
  const cruise = mscBellissimaAsia;

  return (
    <>
      <Header variant="transparent" />
      <main className="min-h-screen bg-white">
        {/* ─── HERO ─── */}
        <section className="relative h-[85vh] min-h-[560px] flex items-center justify-center pt-20">
          <div className="absolute inset-0 z-0">
            <Image
              src={cruise.imageUrl}
              alt={cruise.imageAlt}
              fill
              priority
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
          </div>

          <div className="relative z-10 w-full text-center px-6 mt-10">
            <p className="text-white/80 text-xs tracking-[4px] uppercase font-bold mb-6 drop-shadow-md">
              {cruise.hero.eyebrow}
            </p>

            <div className="flex justify-center gap-3 mb-6 flex-wrap">
              {cruise.badges.map(({ label }: CruiseBadge) => (
                <span
                  key={label}
                  className="bg-white/20 backdrop-blur-md text-xs font-semibold tracking-widest uppercase border border-white/40 text-white px-4 py-1.5 rounded-full shadow-lg"
                >
                  {label}
                </span>
              ))}
            </div>

            <h1 className="text-white font-extrabold text-[clamp(2.5rem,8vw,6rem)] leading-tight mb-6 max-w-5xl mx-auto drop-shadow-xl">
              {cruise.hero.headline}
            </h1>
            <p className="text-white/90 text-lg md:text-2xl max-w-3xl mx-auto mb-10 drop-shadow-lg font-medium">
              {cruise.hero.subheadline}
            </p>

            <Link
              href="#details"
              className="inline-flex items-center gap-2 bg-white text-black font-semibold text-base px-8 py-4 rounded-full hover:bg-gray-100 hover:scale-105 transition-all shadow-xl"
            >
              Узнать подробнее
            </Link>

            <div className="mt-8 text-white/70 text-sm font-medium drop-shadow-md">
              {cruise.hero.hint}
            </div>
          </div>
        </section>

        {/* ─── ОПИСАНИЕ + ФИЧИ ─── */}
        <section id="details" className="max-w-6xl mx-auto px-6 py-20">
          <p className="text-gray-400 text-xs tracking-[4px] uppercase font-medium mb-4">
            {cruise.about.eyebrow}
          </p>
          <h2 className="font-bold text-4xl md:text-5xl text-gray-900 max-w-2xl leading-tight mb-6">
            {cruise.about.headline}
          </h2>
          <p className="text-gray-500 text-lg max-w-3xl leading-relaxed mb-16">
            {cruise.about.body}
          </p>

          <div className="grid md:grid-cols-2 gap-6 items-stretch">
            <div className="relative rounded-2xl overflow-hidden min-h-[420px]">
              <Image src={cruise.imageUrl} alt={cruise.imageAlt} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full mb-3">
                  Даты: {cruise.details.dates.join(", ")}
                </span>
                <h3 className="text-white font-bold text-2xl">{cruise.details.ports}</h3>
                <p className="text-white/70 text-sm mt-1">{cruise.countries}</p>
                <p className="text-white/50 text-sm mt-3 hover:text-white transition-colors cursor-pointer">
                  Смотреть детали →
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 flex flex-col justify-center">
              <p className="text-gray-400 text-xs tracking-[3px] uppercase font-medium mb-6">
                ЧТО ЖДЁТ ВАС
              </p>
              <ul className="space-y-4">
                {cruise.features.map((feature: string) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-gray-900 flex items-center justify-center shrink-0">
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path
                          d="M1 4L3.5 6.5L9 1"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="text-gray-700 text-base">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ─── ДАТЫ И ЦЕНА ─── */}
        <section className="max-w-6xl mx-auto px-6 pb-20">
          <div className="relative rounded-2xl overflow-hidden bg-gray-900 p-10 md:p-16">
            <div className="absolute inset-0 opacity-20">
              <Image src={cruise.imageUrl} alt="" fill className="object-cover object-top" />
            </div>
            <div className="relative z-10 max-w-2xl">
              <div className="flex gap-3 mb-6 flex-wrap">
                <span className="text-xs font-medium tracking-widest uppercase border border-white/30 text-white px-4 py-1.5 rounded-full">
                  БЕЗВИЗОВО
                </span>
                <span className="text-xs font-medium tracking-widest uppercase border border-white/30 text-white px-4 py-1.5 rounded-full">
                  9 НОЧЕЙ
                </span>
              </div>

              <h2 className="text-white font-bold text-3xl md:text-4xl mb-4 leading-tight">
                Даты и стоимость
              </h2>

              <div className="text-white/75 text-base leading-relaxed mb-6">
                <p className="mb-2">
                  <span className="text-white/90 font-semibold">Даты:</span>{" "}
                  {cruise.details.dates.join(", ")}
                </p>
                <p className="mb-2">
                  <span className="text-white/90 font-semibold">Маршрут:</span>{" "}
                  {cruise.details.ports}
                </p>
                <p className="mb-2">
                  <span className="text-white/90 font-semibold">Цена:</span>{" "}
                  {cruise.details.priceFrom}
                </p>
                <p className="text-white/55 text-sm">{cruise.details.note}</p>
              </div>

              <Link
                href="/consultation"
                className="inline-flex items-center gap-2 bg-white text-black font-semibold text-sm px-8 py-4 rounded-full hover:bg-white/90 transition-colors"
              >
                {cruise.details.cta}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
