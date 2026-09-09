import { CruiseForm } from "@/features/cruise-admin";

export default function NewCruisePage() {
  return (
    <>
      <h1 className="mb-8 text-2xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100">
        Новый круиз
      </h1>
      <CruiseForm />
    </>
  );
}
