import { Metadata } from "next";
import { QuizForm } from "@/features/cruise-quiz/quiz-form";

export const metadata: Metadata = {
  title: "Подбор круиза | Круизы",
  description: "Ответьте на несколько вопросов, и мы подберём идеальный круиз специально для вас",
};

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 pt-12 md:pt-16 pb-20">
      <div className="container mx-auto px-4">
        {/* Заголовок */}
        <div className="text-center mb-8 md:mb-10 max-w-2xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-medium text-neutral-900 dark:text-neutral-100 mb-2 leading-tight">
            Подберём идеальный круиз
          </h1>
          <p className="text-[15px] text-neutral-500 dark:text-neutral-400 mb-3">
            Ответьте на 5 вопросов — и наш эксперт подберёт варианты специально для вас
          </p>
          {/* Маркер уверенности */}
          <div className="flex items-center justify-center gap-2 text-xs text-neutral-400 dark:text-neutral-500">
            <span>Персональный подбор</span>
            <span>•</span>
            <span>Без обязательств</span>
          </div>
        </div>

        {/* Форма квиза */}
        <QuizForm />
      </div>
    </div>
  );
}
