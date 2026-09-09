import { notFound } from "next/navigation";
import { CruiseForm, getCruise } from "@/features/cruise-admin";

export default async function EditCruisePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Невалидный uuid не должен ронять страницу ошибкой Postgres
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
  const cruise = isUuid ? await getCruise(id) : null;

  if (!cruise) notFound();

  return (
    <>
      <h1 className="mb-2 text-2xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100">
        {cruise.title}
      </h1>
      <p className="mb-8 text-sm text-neutral-500">
        {cruise.isPublished ? "Опубликован на сайте" : "Черновик — на сайте не показывается"}
      </p>
      <CruiseForm cruise={cruise} />
    </>
  );
}
