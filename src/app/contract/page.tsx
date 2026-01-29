import { Metadata } from 'next';
import Link from 'next/link';
import { LegalLayout, LegalSection } from '@/components/legal';
import { LEGAL_DOCS } from '@/config/company';
import { contractContent } from '@/data/legal/contract.data';

export const metadata: Metadata = {
  title: 'Договор и оплата | Круизы',
  description: 'Мы работаем по индивидуальным договорам. Оплата принимается только после подписания договора по СБП. Прозрачность и защита ваших интересов.',
  robots: 'index, follow',
};

export default function ContractPage() {
  const doc = LEGAL_DOCS.contract;
  
  return (
    <LegalLayout
      title={doc.title}
      description="Мы работаем по индивидуальным договорам на оказание туристических услуг"
      version={doc.version}
      lastUpdated={doc.lastUpdated}
    >
      {/* Введение */}
      <div 
        className="mb-8 text-lg text-neutral-700 dark:text-neutral-300 border-l-4 border-blue-500 pl-6 py-2 bg-blue-50 dark:bg-blue-950/20 rounded-r"
        dangerouslySetInnerHTML={{ __html: contractContent.intro }}
      />

      {/* Секции */}
      {contractContent.sections.map((section: { title: string; content: string }, index: number) => (
        <LegalSection
          key={index}
          title={section.title}
          content={section.content}
        />
      ))}

      {/* Call to Action */}
      <div className="mt-12 bg-linear-to-r from-blue-500 to-blue-600 rounded-lg p-8 text-white">
        <h2 className="text-2xl font-bold mb-3">
          {contractContent.cta.title}
        </h2>
        <p className="text-blue-50 mb-6 text-lg">
          {contractContent.cta.description}
        </p>
        <Link
          href={contractContent.cta.buttonLink}
          className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
        >
          {contractContent.cta.buttonText}
        </Link>
      </div>

      {/* Важное уведомление */}
      <div className="mt-8 bg-yellow-50 dark:bg-yellow-950/20 border-l-4 border-yellow-500 p-6 rounded-r">
        <div className="flex items-start gap-3">
          <svg 
            className="h-6 w-6 shrink-0 text-yellow-600 dark:text-yellow-400 mt-0.5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
            />
          </svg>
          <div>
            <p className="font-semibold text-yellow-900 dark:text-yellow-100 mb-1">
              Важно: Оплата только после подписания договора
            </p>
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              Мы никогда не просим внести оплату до подписания официального договора. 
              Если кто-то просит вас оплатить услуги без договора от нашего имени — это мошенники. 
              Свяжитесь с нами для проверки.
            </p>
          </div>
        </div>
      </div>
    </LegalLayout>
  );
}
