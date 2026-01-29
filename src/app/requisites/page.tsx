import { Metadata } from 'next';
import { LegalLayout, CompanyDetails } from '@/components/legal';
import { LEGAL_DOCS, COMPANY } from '@/config/company';

export const metadata: Metadata = {
  title: 'Реквизиты компании | Круизы',
  description: `Юридическая информация и реквизиты компании ${COMPANY.legalName}. ИНН, ОГРН, банковские реквизиты, контакты.`,
  robots: 'index, follow',
};

export default function RequisitesPage() {
  const doc = LEGAL_DOCS.requisites;
  
  return (
    <LegalLayout
      title={doc.title}
      description="Юридическая информация, банковские реквизиты и контактные данные компании"
      version={doc.version}
      lastUpdated={doc.lastUpdated}
    >
      <CompanyDetails variant="full" />
    </LegalLayout>
  );
}
