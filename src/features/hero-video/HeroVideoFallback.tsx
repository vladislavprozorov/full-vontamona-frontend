import { HERO_POSTER_URL } from "./constants";
export function HeroVideoFallback() {
  return (
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${HERO_POSTER_URL})` }}
    />
  );
}
