import { Metadata } from 'next';
import { QuizForm } from '@/features/quiz/quiz-form';

export const metadata: Metadata = {
  title: 'Подбор круиза | Круизы',
  description: 'Ответьте на 5 вопросов, и мы подберём идеальный круиз специально для вас',
};

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-neutral-50 to-white dark:from-neutral-950 dark:to-neutral-900 pt-20 md:pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Заголовок */}
        <div className="text-center mb-10 md:mb-12 max-w-2xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-medium text-neutral-900 dark:text-neutral-100 mb-2 leading-tight">
            Подберём идеальный круиз
          </h1>
          <p className="text-[15px] text-neutral-500 dark:text-neutral-400">
            Ответьте на 5 вопросов — и наш эксперт подберёт варианты специально для вас
          </p>
        </div>

        {/* Форма квиза */}
        <QuizForm />
      </div>
    </div>
  );
}
