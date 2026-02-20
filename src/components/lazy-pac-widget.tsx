"use client";

import dynamic from "next/dynamic";

// Lazy loading виджета (он не нужен сразу)
const PacWidget = dynamic(
  () => import("@/features/pac-widget/pac-widget").then((mod) => ({ default: mod.PacWidget })),
  {
    ssr: false,
    loading: () => (
      <div className="mx-auto max-w-7xl px-4 py-24">
        <div className="rounded-xl border bg-background p-6 shadow-sm">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
              <p className="text-gray-600">Загрузка виджета...</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
);

export function LazyPacWidget() {
  return <PacWidget />;
}
