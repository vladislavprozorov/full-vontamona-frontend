"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { type ContactsFormData, contactsSchema } from "@/features/cruiseQuiz/model";

export function FooterContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ContactsFormData>({
    resolver: zodResolver(contactsSchema),
  });

  const phoneValue = watch("phone") || "";

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
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

  const onSubmit = async (data: ContactsFormData) => {
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          source: "footer",
          priorities: [], // footer форма не собирает приоритеты
        }),
      });

      if (!response.ok) {
        throw new Error("Ошибка отправки");
      }

      setIsSuccess(true);
    } catch (err) {
      setError("Не удалось отправить заявку. Попробуйте позже.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-8">
        <h4 className="text-lg font-semibold text-neutral-900 mb-2">Заявка отправлена!</h4>
        <p className="text-sm text-neutral-600">Мы свяжемся с вами в течение 2–3 часов</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input
          type="text"
          {...register("name")}
          placeholder="Ваше имя"
          className="w-full px-4 py-3 border border-neutral-200 bg-white text-neutral-900 rounded-lg focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:outline-none transition-all text-sm"
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <input
          {...register("phone")}
          type="tel"
          placeholder="+7 (___) ___-__-__"
          value={phoneValue}
          onChange={handlePhoneChange}
          className="w-full px-4 py-3 border border-neutral-200 bg-white text-neutral-900 rounded-lg focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:outline-none transition-all text-sm"
        />
        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
      </div>

      <div>
        <input
          type="email"
          {...register("email")}
          placeholder="Email (необязательно)"
          className="w-full px-4 py-3 border border-neutral-200 bg-white text-neutral-900 rounded-lg focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:outline-none transition-all text-sm"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
      >
        {isSubmitting ? "Отправка..." : "Получить персональный маршрут"}
      </button>
    </form>
  );
}
