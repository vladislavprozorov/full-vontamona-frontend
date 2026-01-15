import type { SocialLink } from './footer.types';

interface FooterSocialProps {
  links: SocialLink[];
}

export function FooterSocial({ links }: FooterSocialProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-footer-text-primary font-semibold">
        Мы в соцсетях
      </h3>
      <div className="flex gap-3">
        {links.map((social) => (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-footer-social-bg hover:bg-footer-social-hover transition-colors flex items-center justify-center"
            aria-label={social.name}
          >
            {social.icon}
          </a>
        ))}
      </div>
    </div>
  );
}
