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
};




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* PAC Widget CSS */}
        <link rel="stylesheet" href="https://widget.gocruise.ru/css/app.css" />
      </head>
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
