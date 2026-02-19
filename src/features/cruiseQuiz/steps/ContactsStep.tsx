import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type ContactsFormData, contactsSchema } from "../model";

interface ContactsStepProps {
  onSubmit: (data: ContactsFormData) => void;
  isSubmitting: boolean;
  error: string;
  onRetry: (data: ContactsFormData) => void;
  onBack: () => void;
}

export function ContactsStep({
  onSubmit,
  isSubmitting,
  error,
  onRetry,
  onBack,
}: ContactsStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    getValues,
  } = useForm<ContactsFormData>({
    resolver: zodResolver(contactsSchema),
  });

  const phoneValue = watch("phone") || "";

  const formatPhoneNumber = (value: string) => {
    // Убираем все нецифровые символы
    const cleaned = value.replace(/\D/g, "");

    // Форматируем по маске +7 (XXX) XXX-XX-XX
    if (cleaned.length === 0) return "";
    if (cleaned.length <= 1) return `+7 (${cleaned}`;
    if (cleaned.length <= 4) return `+7 (${cleaned.slice(1)}`;
    if (cleaned.length <= 7) return `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4)}`;
    if (cleaned.length <= 9)
      return `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
    return `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 9)}-${cleaned.slice(9, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setValue("phone", formatted, { shouldValidate: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-5">
      <div>
        <h3 className="text-lg md:text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-2 leading-tight">
          Как с вами связаться?
        </h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Мы свяжемся в течение 2–3 часов
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          Ваше имя
        </label>
        <input
          type="text"
          {...register("name")}
          autoFocus
          placeholder="Как к вам обращаться?"
          className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 rounded-xl focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:outline-none transition-all"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          Телефон
        </label>
        <input
          {...register("phone")}
          type="tel"
          placeholder="+7 (___) ___-__-__"
          value={phoneValue}
          onChange={handlePhoneChange}
          className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 rounded-xl focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:outline-none transition-all"
        />
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          Email
        </label>
        <input
          type="email"
          {...register("email")}
          placeholder="your@email.com"
          className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 rounded-xl focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:outline-none transition-all"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-7 md:px-8 py-3 bg-neutral-900 dark:bg-neutral-100 hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 font-medium rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm active:scale-95"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2.5 md:gap-2">
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Отправка...
          </span>
        ) : (
          "Отправить заявку"
        )}
      </button>

      {/* Error Recovery - Stripe style */}
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-xl animate-in fade-in duration-200">
          <p className="text-sm text-red-800 dark:text-red-200 mb-3">{error}</p>
          <div className="flex items-center gap-3 flex-wrap">
            <button
              type="button"
              onClick={() => onRetry(getValues())}
              disabled={isSubmitting}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-all active:scale-95 disabled:opacity-50"
            >
              Попробовать снова
            </button>
            <a
              href="tel:+74951234567"
              className="text-sm text-red-700 dark:text-red-300 hover:underline"
            >
              или позвоните нам
            </a>
          </div>
        </div>
      )}

      {/* Edit Answers Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors flex items-center gap-1.5"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Изменить ответы
        </button>
      </div>
    </form>
  );
}
