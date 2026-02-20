interface LegalSectionProps {
  title: string;
  content: string;
}

/**
 * Секция юридического документа
 * Отображает заголовок раздела и HTML контент
 */
export function LegalSection({ title, content }: LegalSectionProps) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">{title}</h2>
      <div
        className="text-neutral-700 dark:text-neutral-300 space-y-4"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </section>
  );
}
