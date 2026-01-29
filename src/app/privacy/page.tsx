import { Metadata } from 'next';
import { LegalLayout, LegalSection } from '@/components/legal';
import { LEGAL_DOCS } from '@/config/company';
import { privacyContent } from '@/data/legal/privacy.data';

export const metadata: Metadata = {
  title: 'Политика конфиденциальности | Круизы',
  description: 'Политика конфиденциальности персональных данных. Узнайте, как мы собираем, используем и защищаем вашу информацию.',
  robots: 'index, follow',
};

export default function PrivacyPage() {
  const doc = LEGAL_DOCS.privacy;
  
  return (
    <LegalLayout
      title={doc.title}
      description="Настоящая Политика определяет порядок обработки и защиты персональных данных пользователей нашего сайта."
      version={doc.version}
      lastUpdated={doc.lastUpdated}
    >
      {privacyContent.sections.map((section: { title: string; content: string }, index: number) => (
        <LegalSection
          key={index}
          title={section.title}
          content={section.content}
        />
      ))}
    </LegalLayout>
  );
}
