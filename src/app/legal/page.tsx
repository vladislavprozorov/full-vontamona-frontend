import { Metadata } from 'next';
import Link from 'next/link';
import { LegalLayout } from '@/components/legal';
import { LEGAL_LINKS } from '@/config/company';

export const metadata: Metadata = {
  title: 'Юридические документы | Круизы',
  description: 'Юридическая информация: политика конфиденциальности, условия договора и оплаты, реквизиты компании, описание услуг.',
  robots: 'index, follow',
};

export default function LegalPage() {
  return (
    <LegalLayout
      title="Юридические документы"
      description="Вся юридическая информация о нашей компании и оказываемых услугах"
      showNav={false}
    >
      <div className="grid gap-6 md:grid-cols-2">
        {LEGAL_LINKS.map((doc: { url: string; title: string; version: string; lastUpdated: string }) => (
          <Link
            key={doc.url}
            href={doc.url}
            className="block p-6 bg-neutral-50 dark:bg-neutral-800 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors group"
          >
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2 group-hover:text-neutral-700 dark:group-hover:text-neutral-300">
              {doc.title}
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Версия {doc.version} от {formatDate(doc.lastUpdated)}
            </p>
            <div className="mt-4 flex items-center text-sm font-medium text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-neutral-100">
              Читать документ
              <svg 
                className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </LegalLayout>
  );
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
