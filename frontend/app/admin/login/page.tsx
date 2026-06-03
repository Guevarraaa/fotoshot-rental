import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { businessInfo } from "@/lib/constants";

export default function AdminLoginPage() {
  return (
    <section className="mx-auto max-w-md px-4 py-12 sm:px-6 lg:py-16">
      <p className="text-sm font-semibold uppercase tracking-wide text-stone-500">
        Admin
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-stone-950">
        Admin login
      </h1>
      <p className="mt-4 text-sm leading-6 text-stone-600">
        Use your Supabase Auth admin account. Do not hardcode the admin password
        in the codebase.
      </p>

      <AdminLoginForm defaultEmail={businessInfo.adminEmail} />
    </section>
  );
}