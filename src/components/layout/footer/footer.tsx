import type { FooterProps, FooterSection, SocialLink } from './footer.types';
import { FooterInfo } from './footer-info';
import { FooterNav } from './footer-nav';
import { FooterSocial } from './footer-social';

// Social icons (using simple SVG icons)
const TelegramIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161l-1.84 8.664c-.138.613-.5.761-1.013.474l-2.8-2.065-1.35 1.3c-.15.15-.275.275-.563.275l.2-2.8 5.15-4.65c.225-.2-.05-.312-.35-.113l-6.363 4.012-2.738-.856c-.6-.187-.612-.6.125-.888l10.713-4.125c.5-.187.937.113.775.887z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const VKIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.344 14.163c.474.46 1.003.95 1.408 1.484.18.236.349.48.474.755.177.39.016.818-.291.841h-1.904c-.495.04-1.014-.158-1.436-.58-.331-.33-.64-.681-.945-1.028-.196-.223-.402-.436-.642-.606-.433-.306-.81-.216-1.047.248-.242.469-.298 1.008-.327 1.544-.043.772-.367 1.024-1.141 1.061-1.664.08-3.24-.219-4.666-1.158-1.25-.822-2.244-1.916-3.099-3.148-1.662-2.396-2.933-5.012-4.027-7.712-.238-.586-.064-.9.581-.91 1.073-.016 2.145-.015 3.218-.001.437.007.729.286.896.692.539 1.314 1.194 2.559 2.019 3.698.215.297.437.595.74.808.336.237.59.158.742-.216.095-.235.142-.486.167-.738.084-.852.095-1.704-.017-2.552-.069-.533-.368-.878-.899-.983-.276-.055-.235-.162-.102-.327.206-.254.399-.412.788-.412h2.904c.457.09.559.295.621.754l.003 3.214c-.006.195.098.772.45.9.28.097.465-.14.633-.323.757-.827 1.296-1.791 1.774-2.79.21-.438.387-.897.549-1.357.12-.343.307-.512.695-.506l2.234.002c.066 0 .133.001.199.009.531.064.677.228.514.744-.278.874-.76 1.626-1.25 2.37-.525.796-1.086 1.566-1.598 2.373-.461.725-.425 1.088.174 1.705z"/>
  </svg>
);

// Footer navigation sections
const footerSections: FooterSection[] = [
  {
    title: 'Направления',
    links: [
      { label: 'Карибы', href: '/destinations/caribbean' },
      { label: 'Средиземное море', href: '/destinations/mediterranean' },
      { label: 'Северная Европа', href: '/destinations/northern-europe' },
      { label: 'Азия', href: '/destinations/asia' },
      { label: 'Трансатлантика', href: '/destinations/transatlantic' },
    ],
  },
  {
    title: 'Компания',
    links: [
      { label: 'О нас', href: '/about' },
      { label: 'Почему мы', href: '/why-us' },
      { label: 'Отзывы', href: '/reviews' },
      { label: 'Блог', href: '/blog' },
      { label: 'Контакты', href: '/contacts' },
    ],
  },
  {
    title: 'Поддержка',
    links: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Консультация', href: '/consultation' },
      { label: 'Политика конфиденциальности', href: '/privacy' },
      { label: 'Условия использования', href: '/terms' },
    ],
  },
];

// Social media links
const socialLinks: SocialLink[] = [
  {
    name: 'Telegram',
    href: 'https://t.me/vontamona',
    icon: <TelegramIcon />,
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/79634551168',
    icon: <WhatsAppIcon />,
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/vontamona',
    icon: <InstagramIcon />,
  },
  {
    name: 'VKontakte',
    href: 'https://vk.com/vontamona',
    icon: <VKIcon />,
  },
];

export function Footer({ className = '' }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`bg-footer-bg border-t border-footer-border ${className}`}>
      <div className="container mx-auto px-4 py-12 lg:py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-8">
          {/* Company info */}
          <div className="lg:col-span-4">
            <FooterInfo />
          </div>

          {/* Navigation sections */}
          <div className="lg:col-span-6">
            <FooterNav sections={footerSections} />
          </div>

          {/* Social media */}
          <div className="lg:col-span-2">
            <FooterSocial links={socialLinks} />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-footer-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-footer-text-muted text-sm">
              © {currentYear} VON TAMONA. Все права защищены.
            </p>
            <div className="flex gap-6 text-sm">
              <a 
                href="/privacy" 
                className="text-footer-link-default hover:text-footer-link-hover transition-colors"
              >
                Политика конфиденциальности
              </a>
              <a 
                href="/terms" 
                className="text-footer-link-default hover:text-footer-link-hover transition-colors"
              >
                Условия использования
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
