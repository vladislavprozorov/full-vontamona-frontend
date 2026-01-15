import Link from "next/link";
import { NavItem, HeaderChildProps } from "./header.types";

const NAV_ITEMS: NavItem[] = [
  { label: 'Круизы', href: '#cruises', type: 'anchor' },
  { label: 'О компании', href: '/about', type: 'route' },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/79634551168',
    type: 'external',
  },
];

export function HeaderNav({ variant, state }: HeaderChildProps) {
  // ✅ Компонент ПОЛУЧАЕТ variant и state, не решает сам
  return (
    <nav className="hidden gap-6 md:flex">
      {NAV_ITEMS.map((item) => {
        const linkClassName = "text-sm transition-colors hover:opacity-100";
        const linkStyle = { opacity: 0.75, color: 'inherit' };

        if (item.type === 'route') {
          return (
            <Link
              key={item.href}
              href={item.href}
              className={linkClassName}
              style={linkStyle}
            >
              {item.label}
            </Link>
          );
        }

        if (item.type === 'anchor') {
          return (
            <a
              key={item.href}
              href={item.href}
              className={linkClassName}
              style={linkStyle}
            >
              {item.label}
            </a>
          );
        }

        // external
        return (
          <a
            key={item.href}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClassName}
            style={linkStyle}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}

