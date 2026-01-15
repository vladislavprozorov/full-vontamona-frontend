'use client';

import { useEffect, useState } from 'react';
import { HeaderNav } from './header-nav';
import { headerTokens } from '@/design-system/tokens/header';
import { HeaderActions } from './header-actions';
import type { HeaderProps, HeaderState } from './header.types';
import Link from 'next/link';

export function Header({ variant = 'solid', className }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ✅ Разделяем variant (тип) и state (состояние)
  const state: HeaderState = isScrolled ? 'scrolled' : 'default';
  const styles = headerTokens.variants[variant][state];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${className || ''}`}
      style={{
        height: headerTokens.height[state],
        background: styles.background,
        borderBottom: `1px solid ${styles.border}`,
        color: styles.textColor,
        backdropFilter: styles.backdropFilter,
        boxShadow: styles.boxShadow,
      }}
    >
      <div 
        className="mx-auto flex items-center justify-between px-4 transition-all duration-300"
        style={{ 
          height: '100%',
          maxWidth: '1280px',
        }}
      >
        {/* LOGO */}
        <Link 
          href="/" 
          className="font-semibold transition-all duration-300"
          style={{
            fontSize: isScrolled ? '1rem' : '1.125rem',
          }}
        >
          Vontamona
        </Link>

        {/* ✅ Передаём variant и state дочерним компонентам */}
        <HeaderNav variant={variant} state={state} />
        <HeaderActions variant={variant} state={state} />
      </div>
    </header>
  );
}
