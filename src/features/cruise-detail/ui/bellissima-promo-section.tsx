import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mscBellissimaAsia } from "@/features/cruise-detail/msc-bellissima-asia";

export function BellissimaPromoSection() {
  const cruise = mscBellissimaAsia;

  return (
    <section className="py-10 sm:py-14">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl border bg-card text-card-foreground">
          <div className="absolute inset-0">
            <Image
              src={cruise.imageUrl}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 1280px"
              className="object-cover"
              priority={false}
            />
            <div className="absolute inset-0 bg-black/55" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          </div>

          <div className="relative z-10 p-6 sm:p-10">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge variant="outline" className="border-white/30 text-white">
                Новинка
              </Badge>
              <Badge variant="outline" className="border-white/30 text-white">
                Китай
              </Badge>
            </div>

            <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-white max-w-3xl">
              {cruise.hero.headline} · MSC Bellissima
            </h2>

            <p className="text-white/80 mt-3 max-w-3xl text-base sm:text-lg leading-relaxed">
              {cruise.hero.subheadline}
            </p>

            <p className="text-white/70 mt-3 text-sm sm:text-base">
              Даты: {cruise.details.dates.join(", ")} · {cruise.details.ports} ·{" "}
              {cruise.details.priceFrom}
            </p>

            <div className="mt-6">
              <Button asChild size="lg">
                <Link href={`/cruises/${cruise.slug}`}>Узнать подробнее</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
