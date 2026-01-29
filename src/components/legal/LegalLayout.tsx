import { ReactNode } from 'react';
import Link from 'next/link';
import { COMPANY, LEGAL_DOCS } from '@/config/company';
import { LegalNav } from './LegalNav';

interface LegalLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
  version?: string;
  lastUpdated?: string;
  showNav?: boolean;
}

/**
 * Единый шаблон для всех юридических страниц
 * Включает навигацию, заголовок, версионность и дату обновления
 */
export function LegalLayout({
  children,
  title,
  description,
  version = '1.0',
  lastUpdated,
  showNav = true,
}: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Навигация по документам */}
      {showNav && (
        <div className="border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
          <div className="container mx-auto px-4 py-4">
            <LegalNav />
          </div>
        </div>
      )}

      {/* Основной контент */}
      <div className="container mx-auto px-4 py-12">
        <article className="max-w-4xl mx-auto bg-white dark:bg-neutral-900 rounded-lg shadow-sm p-8 md:p-12">
          {/* Кнопка "На главную" */}
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors mb-6 group"
          >
            <svg 
              className="h-4 w-4 transition-transform group-hover:-translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            На главную страницу
          </Link>

          {/* Хлебные крошки */}
          <nav className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
            <Link 
              href="/" 
              className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              Главная
            </Link>
            <span className="mx-2">/</span>
            <span className="text-neutral-900 dark:text-neutral-100">{title}</span>
          </nav>

          {/* Заголовок */}
          <header className="mb-8 pb-6 border-b border-neutral-200 dark:border-neutral-800">
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              {title}
            </h1>
            
            {description && (
              <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-4">
                {description}
              </p>
            )}

            {/* Метаинформация */}
            <div className="flex flex-wrap gap-4 text-sm text-neutral-500 dark:text-neutral-500">
              {lastUpdated && (
                <div>
                  Дата обновления: <time dateTime={lastUpdated}>{formatDate(lastUpdated)}</time>
                </div>
              )}
              {version && (
                <div>
                  Версия: {version}
                </div>
              )}
            </div>
          </header>

          {/* Контент документа */}
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            {children}
          </div>

          {/* Реквизиты компании внизу */}
          <footer className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
            <div className="text-sm text-neutral-600 dark:text-neutral-400 space-y-2">
              <p className="font-semibold text-neutral-900 dark:text-neutral-100">
                {COMPANY.legalName}
              </p>
              <p>ИНН: {COMPANY.inn}</p>
              <p>ОГРН: {COMPANY.ogrn}</p>
              <p>
                Адрес: {COMPANY.legalAddress.full}
              </p>
              <p>
                Email: <a href={`mailto:${COMPANY.contacts.email}`} className="hover:text-neutral-900 dark:hover:text-neutral-100">
                  {COMPANY.contacts.email}
                </a>
              </p>
              <p>
                Телефон: <a href={`tel:${COMPANY.contacts.phoneRaw}`} className="hover:text-neutral-900 dark:hover:text-neutral-100">
                  {COMPANY.contacts.phone}
                </a>
              </p>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
}

// Хелпер для форматирования даты
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
