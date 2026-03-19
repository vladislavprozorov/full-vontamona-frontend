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
      <div className="flex w-24 items-center">
        <SidebarMenu className={iconClass} variant={variant} />
      </div>

      {/* Центр: Логотип */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          {/* <Image
            src="/logo/logo.svg" 
            alt="MSC Logo"
            width={120}
            height={40}
            className="h-10 w-auto group-data-[scrolled=true]:invert group-data-[scrolled=true]:brightness-0"
            
          /> */}
          Vontamona
        </Link>
      </div>

      {/* Правая часть: Действия */}
      {/* <div className="flex w-24 items-center justify-end gap-4">
        <Link
          href="/login"
          className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-black/10 hover:text-white ${iconClass}`}
          aria-label="Личный кабинет"
        >
          <User className="h-5 w-5" />
        </Link>
      </div> */}
    </HeaderClientWrapper>
  );
}
