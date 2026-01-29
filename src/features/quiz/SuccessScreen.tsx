'use client';

import Link from 'next/link';
import { useState } from 'react';

interface SuccessScreenProps {
  applicationId?: string;
  phone?: string;
  email?: string;
}

export function SuccessScreen({ applicationId, phone, email }: SuccessScreenProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    if (applicationId) {
      navigator.clipboard.writeText(applicationId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full max-w-135 mx-auto">
      <div className="bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm rounded-2xl shadow-sm border border-transparent p-8 md:p-12 text-center">
        <div className="mb-5">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-neutral-100 dark:bg-neutral-800 rounded-full mb-5">
            <svg className="w-8 h-8 text-neutral-700 dark:text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-medium text-neutral-900 dark:text-neutral-100 mb-3 leading-tight">
            Благодарим за доверие
          </h2>
          
          {applicationId && (
            <div className="inline-block bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 rounded-xl px-4 py-2 mb-5">
              <p className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-1">
                Номер заявки
              </p>
              <div className="flex items-center gap-2">
                <p className="text-sm font-mono text-neutral-900 dark:text-neutral-100">
                  {applicationId}
                </p>
                <button
                  onClick={copyToClipboard}
                  className="p-1.5 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                  title="Скопировать номер заявки"
                >
                  {copied ? (
                    <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-neutral-600 dark:text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          )}
          
          <p className="text-[15px] text-neutral-600 dark:text-neutral-400 mb-3 leading-relaxed">
            Мы подбираем круизы вручную, не по шаблону
          </p>
          <p className="text-[15px] text-neutral-600 dark:text-neutral-400 mb-2 leading-relaxed">
            Ваш персональный консультант свяжется с вами <span className="text-neutral-900 dark:text-neutral-100">в течение 2–3 часов</span>
          </p>
          <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-4">
            Проверьте {phone ? 'телефон' : ''}{phone && email ? ' и ' : ''}{email ? 'почту' : ''}
          </p>
        </div>

        <div className="flex flex-col gap-3 mt-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-sm font-medium rounded-xl hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all active:scale-[0.98]"
          >
            Вернуться на главную
          </Link>
          <Link
            href="/#widget"
            className="inline-flex items-center justify-center px-6 py-2.5 text-neutral-600 dark:text-neutral-400 text-sm hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            Посмотреть круизы самостоятельно
          </Link>
        </div>
      </div>
    </div>
  );
}
