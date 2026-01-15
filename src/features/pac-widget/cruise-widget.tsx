"use client";

import { useEffect, useState } from "react";

type CruiseWidgetSettings = {
  email?: string;
  theme?: "light" | "dark" | "simple";
  currencies?: string[];
  defaultVendor?: "MSC" | "EXJ";
  showResults?: boolean;
};

const CruiseWidget = (props: CruiseWidgetSettings) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    console.log("🚀 CruiseWidget: Инициализация через iframe");

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
    <div className="w-full my-8">
      <div className="relative">
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
              <p className="text-gray-600">Загрузка виджета круизов...</p>
            </div>
          </div>
        )}
        
        <iframe
          src="/cruise-widget.html"
          className="w-full border-0 rounded-lg"
          style={{ height: '600px', minHeight: '600px' }}
          title="Cruise Widget"
          onLoad={() => {
            console.log("📦 iframe загружен");
          }}
        />
      </div>
    </div>
  );
};

export default CruiseWidget;
