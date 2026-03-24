import { Plus } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const cruises = [
  {
    label: "Популярное направление",
    title: "Средиземное море.",
    description: "Италия, Греция, Испания — солнце, история и гастрономия.",
    image: "/carousel/cruise-ship.png",
  },
  {
    label: "Экзотика",
    title: "Карибские острова.",
    description: "Тропический рай с кристально чистой водой и белым песком.",
    image: "/carousel/compass.png",
  },
  {
    label: "Природа и покой",
    title: "Норвежские фьорды.",
    description: "Величественные скалы, водопады и северное сияние.",
    image: "/carousel/shells.png",
  },
  {
    label: "Премиум",
    title: "Аляска.",
    description: "Нетронутая дикая природа, ледники и белые медведи.",
    image: "/carousel/champ.png",
  },
  {
    label: "Азия",
    title: "Юго-Восточная Азия.",
    description: "Бали, Сингапур, Таиланд — колорит востока на воде.",
    image: "/carousel/compass.png",
  },
];

export function CruiseCarousel() {
  return (
    <div className="w-full bg-[#f5f5f7] py-16 md:py-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <h2 className="text-4xl md:text-[56px] font-semibold text-[#1d1d1f] tracking-tight leading-tight max-w-3xl">
            Поиск идеального
            <br />
            круиза. Удобнее, чем кажется.
          </h2>
          <a
            href="/cruises"
            className="text-[#0066cc] hover:underline text-[17px] -mt-2 md:mt-0 font-medium"
          >
            Все направления {">"}
          </a>
        </div>

        <Carousel
          opts={{
            align: "start",
            dragFree: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4 md:-ml-6 py-4">
            {cruises.map((cruise, index) => (
              <CarouselItem
                key={index}
                className="pl-4 md:pl-6 basis-[85%] sm:basis-[60%] md:basis-[45%] lg:basis-[32%] xl:basis-[31%]"
              >
                <div className="relative rounded-[32px] bg-white h-[480px] md:h-[520px] flex flex-col overflow-hidden group transition-shadow hover:shadow-lg duration-300">
                  {/* Текст */}
                  <div className="p-8 relative z-10 w-full h-[40%] flex flex-col">
                    <p className="text-[12px] font-semibold text-[#6e6e73] mb-2 uppercase tracking-wide">
                      {cruise.label}
                    </p>
                    <h3 className="text-[28px] font-semibold text-[#1d1d1f] leading-tight mb-3">
                      {cruise.title}
                    </h3>
                    <p className="text-[17px] text-[#1d1d1f] leading-snug">{cruise.description}</p>
                  </div>

                  {/* Изображение */}
                  <div className="absolute bottom-0 left-0 right-0 h-[60%] flex items-end justify-center">
                    <img
                      src={cruise.image}
                      alt={cruise.title}
                      className="w-full h-full object-contain object-bottom"
                    />
                  </div>

                  {/* Plus Button Overlay */}
                  <div className="absolute right-6 bottom-6 z-20">
                    <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1d1d1f] transition-transform duration-300 group-hover:scale-110">
                      <Plus className="h-6 w-6 text-white" />
                    </button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Навигационные кнопки в стиле Apple (справа внизу) */}
          <div className="flex justify-end gap-4 mt-8 pr-4 md:pr-0">
            <CarouselPrevious className="relative inset-auto translate-x-0 translate-y-0 h-[44px] w-[44px] rounded-full bg-[#e8e8ed] border-transparent text-[#1d1d1f] hover:bg-[#d2d2d7] disabled:opacity-40 disabled:hover:bg-[#e8e8ed] transition-colors" />
            <CarouselNext className="relative inset-auto translate-x-0 translate-y-0 h-[44px] w-[44px] rounded-full bg-[#e8e8ed] border-transparent text-[#1d1d1f] hover:bg-[#d2d2d7] disabled:opacity-40 disabled:hover:bg-[#e8e8ed] transition-colors" />
          </div>
        </Carousel>
      </div>
    </div>
  );
}
