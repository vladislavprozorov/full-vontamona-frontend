import { FeedbackForm } from '@/features/feedback/feedback-form';

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold">
            Заявка на путешествие
          </h1>
          <p className="text-muted-foreground">
            Оставьте контакты — мы свяжемся с вами
          </p>
        </div>

        <FeedbackForm />
      </div>
    </main>
  );
}
