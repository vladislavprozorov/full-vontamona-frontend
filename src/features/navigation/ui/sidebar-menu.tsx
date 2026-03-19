"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface SidebarMenuProps {
  className?: string;
  variant?: "solid" | "transparent";
}

export function SidebarMenu({ className, variant }: SidebarMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const drawerContent = (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[100] transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 bottom-0 w-[300px] sm:w-[400px] bg-white z-[101] transform transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6">
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 -ml-2 rounded-md hover:bg-gray-100 transition-colors text-black"
          >
            <X className="w-7 h-7" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-6 text-black flex flex-col gap-10">
          <nav className="flex flex-col gap-6 text-xl font-medium tracking-tight">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="hover:text-blue-600 transition-colors"
            >
              Главная
            </Link>
            <Link
              href="#cruises"
              onClick={() => setIsOpen(false)}
              className="hover:text-blue-600 transition-colors"
            >
              Круизы
            </Link>
            <Link
              href="/about"
              onClick={() => setIsOpen(false)}
              className="hover:text-blue-600 transition-colors"
            >
              О компании
            </Link>
          </nav>

          <div className="h-px bg-gray-200 w-full" />

          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-5">
              Новинки
            </h3>
            <Link
              href="/cruises/msc-world-asia"
              onClick={() => setIsOpen(false)}
              className="group block relative rounded-xl overflow-hidden bg-gray-100 aspect-[4/3] flex items-end p-4"
            >
              <Image
                src="https://img.pac.ru/cruise/ships_gallery/World_Asia/01.jpg"
                alt="MSC World Asia"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="relative z-10">
                <span className="bg-white text-black text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full mb-2 inline-block">
                  NEW
                </span>
                <p className="text-white font-semibold text-lg">MSC World Asia</p>
                <p className="text-white/80 text-sm">Средиземное море 2026</p>
              </div>
            </Link>
          </div>

          <div className="mt-auto pt-6 h-px w-full bg-transparent" />
        </div>
      </div>
    </>
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="-ml-2 rounded-md hover:bg-black/10 transition-colors p-2"
        aria-label="Open menu"
      >
        <Menu className={className || "w-7 h-7"} /> {/* ← фикс здесь */}
      </button>

      {mounted ? createPortal(drawerContent, document.body) : null}
    </>
  );
}
