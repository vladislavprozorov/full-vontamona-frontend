export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL!,
};
export type NavigationItem = {
  label: string;
  href: string;
};
export const navigation: readonly NavigationItem[] = [
  {
    label: 'Круизы',
    href: '#cruises',
  },
  {
    label: 'О компании',
    href: '#about',
  },
  {
    label: 'Контакты',
    href: '#contacts',
  },
] as const;