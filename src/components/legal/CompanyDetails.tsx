import { COMPANY } from "@/config/company";

interface CompanyDetailsProps {
  variant?: "full" | "compact";
  className?: string;
}

/**
 * Реквизиты компании
 * Используется в footer и на странице реквизитов
 */
export function CompanyDetails({ variant = "compact", className = "" }: CompanyDetailsProps) {
  if (variant === "compact") {
    return (
      <div className={`text-sm space-y-1 ${className}`}>
        <p className="font-semibold">{COMPANY.shortName}</p>
        <p>ИНН {COMPANY.inn}</p>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Основная информация */}
      <div>
        <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-3">
          Юридическая информация
        </h3>
        <dl className="space-y-2 text-sm">
          <div className="flex flex-col sm:flex-row sm:gap-2">
            <dt className="font-semibold text-neutral-700 dark:text-neutral-300 min-w-35">
              Полное наименование:
            </dt>
            <dd className="text-neutral-600 dark:text-neutral-400">{COMPANY.legalName}</dd>
          </div>

          <div className="flex flex-col sm:flex-row sm:gap-2">
            <dt className="font-semibold text-neutral-700 dark:text-neutral-300 min-w-35">ИНН:</dt>
            <dd className="text-neutral-600 dark:text-neutral-400">{COMPANY.inn}</dd>
          </div>

          <div className="flex flex-col sm:flex-row sm:gap-2">
            <dt className="font-semibold text-neutral-700 dark:text-neutral-300 min-w-35">ОГРН:</dt>
            <dd className="text-neutral-600 dark:text-neutral-400">{COMPANY.ogrn}</dd>
          </div>

          <div className="flex flex-col sm:flex-row sm:gap-2">
            <dt className="font-semibold text-neutral-700 dark:text-neutral-300 min-w-35">КПП:</dt>
            <dd className="text-neutral-600 dark:text-neutral-400">{COMPANY.kpp}</dd>
          </div>
        </dl>
      </div>

      {/* Адрес */}
      <div>
        <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-3">
          Юридический адрес
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {COMPANY.legalAddress.full}
        </p>
      </div>

      {/* Банковские реквизиты */}
      <div>
        <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-3">
          Банковские реквизиты
        </h3>
        <dl className="space-y-2 text-sm">
          <div className="flex flex-col sm:flex-row sm:gap-2">
            <dt className="font-semibold text-neutral-700 dark:text-neutral-300 min-w-35">Банк:</dt>
            <dd className="text-neutral-600 dark:text-neutral-400">{COMPANY.bank.name}</dd>
          </div>

          <div className="flex flex-col sm:flex-row sm:gap-2">
            <dt className="font-semibold text-neutral-700 dark:text-neutral-300 min-w-35">БИК:</dt>
            <dd className="text-neutral-600 dark:text-neutral-400 font-mono">{COMPANY.bank.bik}</dd>
          </div>

          <div className="flex flex-col sm:flex-row sm:gap-2">
            <dt className="font-semibold text-neutral-700 dark:text-neutral-300 min-w-35">
              Расчётный счёт:
            </dt>
            <dd className="text-neutral-600 dark:text-neutral-400 font-mono">
              {COMPANY.bank.accountNumber}
            </dd>
          </div>

          <div className="flex flex-col sm:flex-row sm:gap-2">
            <dt className="font-semibold text-neutral-700 dark:text-neutral-300 min-w-35">
              Корр. счёт:
            </dt>
            <dd className="text-neutral-600 dark:text-neutral-400 font-mono">
              {COMPANY.bank.correspondentAccount}
            </dd>
          </div>
        </dl>
      </div>

      {/* Контакты */}
      <div>
        <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-3">
          Контактная информация
        </h3>
        <dl className="space-y-2 text-sm">
          <div className="flex flex-col sm:flex-row sm:gap-2">
            <dt className="font-semibold text-neutral-700 dark:text-neutral-300 min-w-35">
              Телефон:
            </dt>
            <dd className="text-neutral-600 dark:text-neutral-400">
              <a
                href={`tel:${COMPANY.contacts.phoneRaw}`}
                className="hover:text-neutral-900 dark:hover:text-neutral-100"
              >
                {COMPANY.contacts.phone}
              </a>
            </dd>
          </div>

          <div className="flex flex-col sm:flex-row sm:gap-2">
            <dt className="font-semibold text-neutral-700 dark:text-neutral-300 min-w-35">
              Email:
            </dt>
            <dd className="text-neutral-600 dark:text-neutral-400">
              <a
                href={`mailto:${COMPANY.contacts.email}`}
                className="hover:text-neutral-900 dark:hover:text-neutral-100"
              >
                {COMPANY.contacts.email}
              </a>
            </dd>
          </div>

          <div className="flex flex-col sm:flex-row sm:gap-2">
            <dt className="font-semibold text-neutral-700 dark:text-neutral-300 min-w-35">
              Режим работы:
            </dt>
            <dd className="text-neutral-600 dark:text-neutral-400">
              {COMPANY.workingHours.weekdays}
              <br />
              {COMPANY.workingHours.weekend}
            </dd>
          </div>
        </dl>
      </div>

      {/* Руководство */}
      <div>
        <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-3">
          Руководство
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {COMPANY.management.ceoPosition}: {COMPANY.management.ceo}
          <br />
          Действует на основании {COMPANY.management.basedOn}
        </p>
      </div>
    </div>
  );
}
