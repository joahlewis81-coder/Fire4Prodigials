import { AdminApp } from "@/components/admin/AdminApp";

export default function AdminPage() {
  return (
    <section className="min-h-[100svh] bg-ink pb-32 pt-32 md:pt-40">
      <div className="mx-auto max-w-5xl px-5 md:px-10">
        <AdminApp />
      </div>
    </section>
  );
}
