'use client';

import { useState, useEffect } from 'react';

export function PacWidget() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [iframeHeight, setIframeHeight] = useState(600);

  useEffect(() => {
    console.log("🚀 PacWidget: Инициализация через iframe");

    // Слушаем сообщения от iframe
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'widget-loaded') {
        console.log(event.data.success ? "✅ Виджет загружен" : "❌ Виджет не загрузился");
        setIsLoaded(true);
      }
    };

    window.addEventListener('message', handleMessage);
    
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <section
      id="cruises"
      className="mx-auto max-w-7xl px-4 py-24"
    >
      <div className="rounded-xl border bg-background p-6 shadow-sm">
        <header className="mb-4">
          <h2 className="text-2xl font-semibold">
            Подбор круиза
          </h2>
          <p className="text-muted-foreground">
            Найдите круиз по датам и бюджету
          </p>
        </header>

        {/* Виджет в iframe */}
        <div className="relative">
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                <p className="text-gray-600">Загрузка виджета...</p>
              </div>
            </div>
          )}
          
          <iframe
            src="/cruise-widget.html"
            className="w-full border-0"
            style={{ height: `${iframeHeight}px`, minHeight: '600px' }}
            title="Cruise Widget"
            onLoad={() => {
              console.log("📦 iframe загружен");
            }}
          />
        </div>
      </div>
    </section>
  );
}
