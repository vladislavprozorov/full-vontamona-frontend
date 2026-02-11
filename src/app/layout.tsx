import type { Metadata } from "next";
import { Header } from '@/components/layout/header/header';
import { ConditionalFooter } from '@/components/layout/conditional-footer';
import "./globals.css";

// ❌ УДАЛЕНЫ Google Fonts (блокируются без VPN)
// import { Geist, Geist_Mono } from "next/font/google";
// Используем system fonts вместо них

export const metadata: Metadata = {
  title: "Vontamona — Подбор круизов на любой вкус",
  description: "Индивидуальный подбор круизов по всему миру. Эксклюзивные предложения, персональный сервис, выгодные цены.",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
};




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased font-sans"
      >
        {/* Header теперь на уровне страниц, не глобально */}
        {children}
        <ConditionalFooter />
      </body>
    </html>
  );
}
