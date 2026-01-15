export const footerTokens = {
  background: '#000', // Тёмно-синий как в header
  textColor: {
    primary: '#ffffff',
    secondary: 'rgba(255, 255, 255, 0.7)',
    muted: 'rgba(255, 255, 255, 0.5)',
  },
  border: 'rgba(255, 255, 255, 0.1)',
  link: {
    default: 'rgba(255, 255, 255, 0.7)',
    hover: '#ffffff',
  },
  social: {
    background: 'rgba(255, 255, 255, 0.1)',
    hover: 'rgba(255, 255, 255, 0.2)',
  },
} as const;

export type FooterTokens = typeof footerTokens;
