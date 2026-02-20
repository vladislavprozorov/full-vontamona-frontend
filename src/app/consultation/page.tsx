import { Header } from "@/components/layout/header/header";
import { FeedbackForm } from "@/features/feedback/feedback-form";
import CruiseWidget from "@/features/pac-widget/cruise-widget";

export default function ConsultationPage() {
  return (
    <>
      {/* SOLID header - для внутренних страниц */}
      <Header variant="solid" />

      <main className="min-h-screen items-center justify-center px-4 pt-16">
        <CruiseWidget currencies={["RUB", "USD", "EUR"]} defaultVendor="MSC" theme="dark" />
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-semibold">Бесплатная консультация</h1>
            <p className="text-muted-foreground">
              Оставьте контакты — мы подберём для вас идеальный круиз
            </p>
          </div>

          <FeedbackForm />
        </div>
      </main>
    </>
  );
}
