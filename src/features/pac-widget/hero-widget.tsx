'use client';

import { useState, useEffect } from 'react';

export function HeroWidget() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'widget-loaded') {
        setIsLoaded(true);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Виджет в iframe */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm bg-white/95 border border-white/20">
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/90 z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
              <p className="text-gray-600">Загрузка формы поиска...</p>
            </div>
          </div>
        )}
        
        <iframe
          src="/cruise-widget.html"
          className="w-full border-0"
          style={{ height: '400px', minHeight: '400px' }}
          title="Cruise Search Widget"
        />
      </div>
    </div>
  );
}
