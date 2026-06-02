export default function TrackBookingPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
      <p className="text-sm font-semibold uppercase tracking-wide text-stone-500">
        Track booking
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-stone-950">
        Check booking status
      </h1>
      <p className="mt-4 text-base leading-7 text-stone-600">
        Sprint 1 includes the lookup UI placeholder. The secure Supabase lookup
        will verify both reference number and phone number in a later sprint.
      </p>

      <form className="mt-8 rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
        <label className="block">
          <span className="text-sm font-semibold text-stone-900">
            Booking reference number
          </span>
          <input
            type="text"
            placeholder="FS-2026-0001"
            className="mt-2 w-full rounded-md border border-stone-300 px-3 py-3 text-sm"
          />
        </label>

        <label className="mt-4 block">
          <span className="text-sm font-semibold text-stone-900">
            Contact number
          </span>
          <input
            type="tel"
            placeholder="+639..."
            className="mt-2 w-full rounded-md border border-stone-300 px-3 py-3 text-sm"
          />
        </label>

        <button
          type="button"
          className="mt-5 w-full rounded-md bg-stone-950 px-5 py-3 text-sm font-bold text-white hover:bg-stone-800"
        >
          Check Status
        </button>

        <div className="mt-5 rounded-lg bg-stone-50 p-4 text-sm text-stone-600">
          Status result placeholder: Pending Review, Payment Submitted,
          Approved, Released, Returned, or Completed.
        </div>
      </form>
    </section>
  );
}