import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CruiseTable, listCruises } from "@/features/cruise-admin";

export default async function AdminCruisesPage() {
  const cruises = await listCruises();
  const published = cruises.filter((cruise) => cruise.isPublished).length;

  return (
    <>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100">
            Круизы
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Всего {cruises.length} · на сайте {published}
          </p>
        </div>

        <Button asChild>
          <Link href="/admin/new">Добавить круиз</Link>
        </Button>
      </div>

      <CruiseTable cruises={cruises} />
    </>
  );
}
