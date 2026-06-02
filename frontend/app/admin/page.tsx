import { bookingStatuses, cameras } from "@/lib/constants";

const metricCards = [
  "Pending bookings",
  "Payment submitted",
  "Approved bookings",
  "Released rentals",
  "Returned today",
  "Most booked camera",
];

export default function AdminDashboardPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-stone-500">
            Admin dashboard
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-stone-950">
            Booking review placeholders
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-stone-600">
            Sprint 1 shows status and dashboard placeholders. Supabase Auth,
            booking tables, search, filters, and admin actions come later.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {metricCards.map((card, index) => (
          <div
            key={card}
            className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-stone-500">{card}</p>
            <p className="mt-2 text-3xl font-bold text-stone-950">
              {index === 5 ? cameras[0].shortName : 0}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-bold text-stone-950">
          Booking status lifecycle
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {bookingStatuses.map((status) => (
            <span
              key={status}
              className="rounded-full bg-stone-100 px-3 py-2 text-sm font-semibold text-stone-700"
            >
              {status}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm">
        <div className="border-b border-stone-200 p-5">
          <h2 className="text-xl font-bold text-stone-950">
            Bookings table placeholder
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-stone-50 text-stone-500">
              <tr>
                <th className="px-5 py-3">Reference</th>
                <th className="px-5 py-3">Customer</th>
                <th className="px-5 py-3">Camera</th>
                <th className="px-5 py-3">Payment</th>
                <th className="px-5 py-3">Booking Status</th>
                <th className="px-5 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-stone-200">
                <td className="px-5 py-4 font-semibold text-stone-950">
                  FS-2026-0001
                </td>
                <td className="px-5 py-4 text-stone-600">Sample renter</td>
                <td className="px-5 py-4 text-stone-600">
                  Canon EOS M100
                </td>
                <td className="px-5 py-4 text-stone-600">
                  Payment Submitted
                </td>
                <td className="px-5 py-4 text-stone-600">
                  Pending Review
                </td>
                <td className="px-5 py-4">
                  <button
                    type="button"
                    className="rounded-md border border-stone-300 px-3 py-2 text-sm font-semibold text-stone-800"
                  >
                    View Placeholder
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}