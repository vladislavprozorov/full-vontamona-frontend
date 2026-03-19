import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SidebarMenu } from "@/features/navigation";
import type { HeaderProps } from "./header.types";
import { HeaderClientWrapper } from "./header-client-wrapper";

export function Header({ variant = "solid", className }: HeaderProps) {
  const iconClass =
    "h-5 w-5 transition-colors duration-300 group-data-[scrolled=true]:text-neutral-900";

  return (
    <HeaderClientWrapper variant={variant} className={className}>
      {/* Левая часть: Гамбургер */}
      <div className="flex w-1/3 items-center justify-start">
        <SidebarMenu className={iconClass} variant={variant} />
      </div>

      {/* Центр: Логотип */}
      <div className="flex w-1/3 items-center justify-center">
        <Link
          href="/"
          className=" font-medium leading-none tracking-tight transition-opacity hover:opacity-80"
        >
          Vontamona
        </Link>
      </div>

      {/* Правая часть: Действия */}
      <div className="flex w-1/3 items-center justify-end">
        {/* Placeholder for future right-side actions */}
      </div>
    </HeaderClientWrapper>
  );
}
