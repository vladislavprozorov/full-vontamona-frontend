export function HeroVideoFallback() {
  return (
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: "url('/video/hero-poster.jpg')" }}
    />
  );
}
