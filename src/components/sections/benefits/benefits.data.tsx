import { Award, Clock, Globe, Heart, ShieldCheck, Ship, Star, UserCheck } from "lucide-react";
import type { Benefit } from "./benefits.types";

export const HERO_BENEFITS: Benefit[] = [
  {
    title: "Вы отдыхаете — мы берём ответственность на себя",
    description: "От первой консультации до возвращения домой — ваш круиз в руках экспертов.",
    subtitle: "Не массовый подбор. Только персональные маршруты.",
    icon: <Heart className="w-12 h-12" />,
    featured: true,
  },
  {
    title: "Личный эксперт на всех этапах",
    description: "Один человек. Один контакт. Полный контроль.",
    icon: <UserCheck className="w-12 h-12" />,
  },
  {
    title: "Безопасность без компромиссов",
    description: "Официальный договор и защищённые платежи.",
    icon: <ShieldCheck className="w-12 h-12" />,
  },
];

export const BENEFITS: Benefit[] = [
  ...HERO_BENEFITS,
  {
    title: "Эксперты по круизам",
    description: "Подбираем маршрут под ваши интересы и бюджет. Индивидуальный подход к каждому.",
    icon: <Ship className="w-10 h-10" />,
  },
  {
    title: "Лучшие цены",
    description: "Конкурентные цены и эксклюзивные предложения. Найдёте дешевле — сделаем скидку.",
    icon: <Star className="w-10 h-10" />,
  },
  {
    title: "Быстрое бронирование",
    description: "Оформляем круиз за 15 минут. Все документы на email.",
    icon: <Clock className="w-10 h-10" />,
  },
];

export const COMPANY_FACTS: Benefit[] = [
  {
    title: "География покрытия",
    description:
      "Более 200 маршрутов по всему миру: от Карибов до Антарктиды. Помогаем с визами и трансферами.",
    icon: <Globe className="w-10 h-10" />,
  },
  {
    title: "5+ лет на рынке",
    description:
      "Отправили в круизы более 5000 довольных клиентов. Рейтинг 4.9/5 на независимых площадках.",
    icon: <Award className="w-10 h-10" />,
  },
];

export const TRUST_MARKERS = [
  { label: "5+ лет", sublabel: "на рынке" },
  { label: "5000+", sublabel: "довольных клиентов" },
  { label: "Официальный агент", sublabel: "MSC Cruises" },
  { label: "4.9/5", sublabel: "средний рейтинг" },
];
