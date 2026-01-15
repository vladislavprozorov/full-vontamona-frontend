export interface Benefit {
  title: string;
  description: string;
  subtitle?: string; // Дополнительный подзаголовок для премиум-карточек
  hoverDetails?: string[]; // Детали для раскрытия при hover (Layer 2)
  icon?: React.ReactNode;
  featured?: boolean; // Акцентная карточка (визуально сильнее)
}

export interface BenefitsSectionProps {
  className?: string;
}
