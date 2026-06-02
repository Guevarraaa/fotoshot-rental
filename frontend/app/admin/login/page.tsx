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
        Use Supabase Auth. Do not hardcode the admin password in the codebase.
      </p>

      <form className="mt-8 rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
        <label className="block">
          <span className="text-sm font-semibold text-stone-900">Email</span>
          <input
            type="email"
            defaultValue={businessInfo.adminEmail}
            className="mt-2 w-full rounded-md border border-stone-300 px-3 py-3 text-sm"
          />
        </label>

        <label className="mt-4 block">
          <span className="text-sm font-semibold text-stone-900">Password</span>
          <input
            type="password"
            placeholder="Use Supabase Auth password"
            className="mt-2 w-full rounded-md border border-stone-300 px-3 py-3 text-sm"
          />
        </label>

        <button
          type="button"
          className="mt-5 w-full rounded-md bg-stone-950 px-5 py-3 text-sm font-bold text-white hover:bg-stone-800"
        >
          Login Placeholder
        </button>
      </form>
    </section>
  );
}