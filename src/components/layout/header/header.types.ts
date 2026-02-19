import type {
  HeaderState,
  HeaderVariant as TokenHeaderVariant,
} from "@/design-system/tokens/header";

export type HeaderVariant = TokenHeaderVariant;
export type { HeaderState };

export interface HeaderProps {
  variant?: HeaderVariant;
  className?: string;
}

export interface HeaderChildProps {
  variant: HeaderVariant;
  state: HeaderState;
}

export type NavItem =
  | {
      label: string;
      href: string;
      type: "route";
    }
  | {
      label: string;
      href: `#${string}`;
      type: "anchor";
    }
  | {
      label: string;
      href: string;
      type: "external";
    };
