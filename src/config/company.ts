/**
 * Конфигурация компании и реквизиты
 * Используется на всех страницах сайта и в юридических документах
 */

export const COMPANY = {
  // Основная информация
  legalName: 'ООО «ВОНТАМОНА»', // Полное юридическое название
  shortName: 'Вонтамона',
  brandName: 'Бренд',
  
  // Реквизиты
  inn: process.env.NEXT_PUBLIC_INN || '1234567890',
  ogrn: process.env.NEXT_PUBLIC_OGRN || '1234567890123',
  kpp: process.env.NEXT_PUBLIC_KPP || '123456789',
  
  // Юридический адрес
  legalAddress: {
    full: '123456, г. Москва, ул. Примерная, д. 1, офис 100',
    city: 'Москва',
    street: 'ул. Примерная',
    building: 'д. 1',
    office: 'офис 100',
    zip: '123456',
  },
  
  // Фактический адрес (если отличается)
  physicalAddress: {
    full: '123456, г. Москва, ул. Примерная, д. 1, офис 100',
  },
  
  // Контакты
  contacts: {
    phone: '+7 (XXX) XXX-XX-XX',
    phoneRaw: '+7XXXXXXXXXX', // для tel: ссылок
    email: 'info@example.com',
    supportEmail: 'support@example.com',
    whatsapp: '+7XXXXXXXXXX',
    telegram: '@example',
  },
  
  // Банковские реквизиты
  bank: {
    name: 'ПАО «Банк»',
    bik: '044525XXX',
    accountNumber: '40702810XXXXXXXXXX',
    correspondentAccount: '30101810XXXXXXXXXX',
  },
  
  // Руководство
  management: {
    ceo: 'Иванов Иван Иванович',
    ceoPosition: 'Генеральный директор',
    // Действует на основании
    basedOn: 'Устава',
  },
  
  // Рабочее время
  workingHours: {
    weekdays: 'Пн-Пт: 09:00 - 18:00',
    weekend: 'Сб-Вс: выходной',
    timezone: 'МСК (UTC+3)',
  },
  
  // Социальные сети
  social: {
    vk: 'https://vk.com/example',
    telegram: 'https://t.me/example',
    whatsapp: 'https://wa.me/7XXXXXXXXXX',
    youtube: 'https://youtube.com/@example',
  },
  
  // Даты
  founded: '2024',
  currentYear: new Date().getFullYear(),
} as const;

// Юридические документы
export const LEGAL_DOCS = {
  privacy: {
    title: 'Политика конфиденциальности',
    url: '/privacy',
    version: '1.0',
    lastUpdated: '2026-01-28',
  },
  contract: {
    title: 'Договор и оплата',
    url: '/contract',
    version: '1.0',
    lastUpdated: '2026-01-28',
  },
  requisites: {
    title: 'Реквизиты компании',
    url: '/requisites',
    version: '1.0',
    lastUpdated: '2026-01-28',
  },
  services: {
    title: 'Описание услуг',
    url: '/services',
    version: '1.0',
    lastUpdated: '2026-01-28',
  },
} as const;

// Ссылки на документы
export const LEGAL_LINKS = Object.values(LEGAL_DOCS);
