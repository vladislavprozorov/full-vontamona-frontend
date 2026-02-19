import { Metadata } from "next";
import { LegalLayout } from "@/components/legal";
import { LEGAL_DOCS } from "@/config/company";
import { servicesContent } from "@/data/legal/services.data";

export const metadata: Metadata = {
  title: "Описание услуг | Круизы",
  description:
    "Полное описание услуг по организации речных и морских круизов. Как мы работаем, что входит в стоимость, наши гарантии.",
  robots: "index, follow",
};

export default function ServicesPage() {
  const doc = LEGAL_DOCS.services;

  return (
    <LegalLayout
      title={doc.title}
      description="Полное описание услуг по организации круизных туров"
      version={doc.version}
      lastUpdated={doc.lastUpdated}
    >
      {/* Введение */}
      <div
        className="mb-8 text-neutral-700 dark:text-neutral-300"
        dangerouslySetInnerHTML={{ __html: servicesContent.intro }}
      />

      {/* Список услуг */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
          Наши услуги
        </h2>
        <div className="space-y-8">
          {servicesContent.services.map(
            (service: { title: string; description: string }, index: number) => (
              <div
                key={index}
                className="border-l-4 border-neutral-300 dark:border-neutral-700 pl-6"
              >
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                  {service.title}
                </h3>
                <div
                  className="text-neutral-700 dark:text-neutral-300 prose prose-neutral dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: service.description }}
                />
              </div>
            ),
          )}
        </div>
      </section>

      {/* Как мы работаем */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
          {servicesContent.howItWorks.title}
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {servicesContent.howItWorks.steps.map(
            (step: { number: number; title: string; description: string }) => (
              <div key={step.number} className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-bold">
                    {step.number}
                  </div>
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                    {step.title}
                  </h3>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">{step.description}</p>
              </div>
            ),
          )}
        </div>
      </section>

      {/* Гарантии */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
          {servicesContent.guarantees.title}
        </h2>
        <ul className="space-y-3">
          {servicesContent.guarantees.items.map((item: string, index: number) => (
            <li key={index} className="flex items-start gap-3">
              <svg
                className="h-6 w-6 shrink-0 text-green-600 dark:text-green-400 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-neutral-700 dark:text-neutral-300">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Стоимость */}
      <section>
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
          {servicesContent.pricing.title}
        </h2>
        <div
          className="text-neutral-700 dark:text-neutral-300 prose prose-neutral dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: servicesContent.pricing.description }}
        />
      </section>
    </LegalLayout>
  );
}
