/**
 * 🔗 Адрес страницы круиза
 *
 * Из «Китай, Корея и Япония из Шанхая» получаем
 * kitay-koreya-i-yaponiya-iz-shanhaya-a1b2c3
 *
 * Хвост из шести случайных символов снимает вопрос уникальности: два круиза
 * с одинаковым названием получат разные адреса, и не нужен цикл «а если такой
 * slug уже занят». Slug выдаётся один раз при создании и дальше не меняется —
 * иначе разосланные ссылки перестанут открываться.
 */

const TRANSLIT: Record<string, string> = {
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  д: "d",
  е: "e",
  ё: "e",
  ж: "zh",
  з: "z",
  и: "i",
  й: "y",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "h",
  ц: "ts",
  ч: "ch",
  ш: "sh",
  щ: "sch",
  ъ: "",
  ы: "y",
  ь: "",
  э: "e",
  ю: "yu",
  я: "ya",
};

export function transliterate(input: string): string {
  return input
    .toLowerCase()
    .split("")
    .map((char) => TRANSLIT[char] ?? char)
    .join("");
}

const SUFFIX_LENGTH = 6;

function randomSuffix(): string {
  return Math.random()
    .toString(36)
    .slice(2, 2 + SUFFIX_LENGTH)
    .padEnd(SUFFIX_LENGTH, "0");
}

/** Максимум для читаемой части — длинные адреса неудобно копировать */
const MAX_BASE_LENGTH = 60;

export function makeSlug(title: string): string {
  const base = transliterate(title)
    // всё, что не латиница и не цифра, становится разделителем
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, MAX_BASE_LENGTH)
    .replace(/-+$/, "");

  // Название целиком из иероглифов или эмодзи оставило бы пустую строку —
  // а колонка slug имеет CHECK на формат
  return `${base || "cruise"}-${randomSuffix()}`;
}
