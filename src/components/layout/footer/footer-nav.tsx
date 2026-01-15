import Link from 'next/link';
import type { FooterSection } from './footer.types';

interface FooterNavProps {
  sections: FooterSection[];
}

export function FooterNav({ sections }: FooterNavProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
      {sections.map((section) => (
        <div key={section.title}>
          <h3 className="text-footer-text-primary font-semibold mb-4">
            {section.title}
          </h3>
          <ul className="space-y-3">
            {section.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-footer-link-default hover:text-footer-link-hover transition-colors text-sm"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
