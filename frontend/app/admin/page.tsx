import { redirect } from "next/navigation";
import { AdminLogoutButton } from "@/components/admin/admin-logout-button";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { bookingStatuses } from "@/lib/constants";

export default async function AdminDashboardPage() {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    redirect("/admin/login");
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

    const { data: isAdmin, error: adminError } = await supabase.rpc("is_admin");

  if (adminError || !isAdmin) {
    redirect("/admin/login");
  }
    const { data: bookings } = await supabase
    .from("bookings")
    .select(
      `
      id,
      reference_number,
      rental_start_date,
      rental_end_date,
      payment_status,
      booking_status,
      total_amount,
      created_at,
      customers (
        full_name,
        contact_number
      ),
      cameras (
        name
      )
    `,
    )
    .order("created_at", { ascending: false })
    .limit(10);

  const bookingRows = bookings ?? [];

  const pendingCount = bookingRows.filter(
    (booking) => booking.booking_status === "pending_review",
  ).length;

  const paymentSubmittedCount = bookingRows.filter(
    (booking) => booking.payment_status === "payment_submitted",
  ).length;

  const approvedCount = bookingRows.filter(
    (booking) => booking.booking_status === "approved",
  ).length;

  const releasedCount = bookingRows.filter(
    (booking) => booking.booking_status === "released",
  ).length;

  const returnedTodayCount = bookingRows.filter((booking) => {
    if (booking.booking_status !== "returned") {
      return false;
    }

    const today = new Date().toISOString().slice(0, 10);
    return booking.created_at?.startsWith(today);
  }).length;
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
        <AdminLogoutButton />

      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <MetricCard label="Pending bookings" value={pendingCount} />
        <MetricCard label="Payment submitted" value={paymentSubmittedCount} />
        <MetricCard label="Approved bookings" value={approvedCount} />
        <MetricCard label="Released rentals" value={releasedCount} />
        <MetricCard label="Returned today" value={returnedTodayCount} />
        <MetricCard label="Latest booking count" value={bookingRows.length} />
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
              {bookingRows.length ? (
                bookingRows.map((booking) => {
                  const customer = Array.isArray(booking.customers)
                    ? booking.customers[0]
                    : booking.customers;
                  const camera = Array.isArray(booking.cameras)
                    ? booking.cameras[0]
                    : booking.cameras;

                  return (
                    <tr key={booking.id} className="border-t border-stone-200">
                      <td className="px-5 py-4 font-semibold text-stone-950">
                        {booking.reference_number}
                      </td>
                      <td className="px-5 py-4 text-stone-600">
                        {customer?.full_name ?? "Unknown renter"}
                      </td>
                      <td className="px-5 py-4 text-stone-600">
                        {camera?.name ?? "Unknown camera"}
                      </td>
                      <td className="px-5 py-4 text-stone-600">
                        {formatStatus(booking.payment_status)}
                      </td>
                      <td className="px-5 py-4 text-stone-600">
                        {formatStatus(booking.booking_status)}
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
                  );
                })
              ) : (
                <tr className="border-t border-stone-200">
                  <td className="px-5 py-6 text-center text-stone-500" colSpan={6}>
                    No bookings yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function MetricCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-stone-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-stone-950">{value}</p>
    </div>
  );
}

function formatStatus(status: string | null) {
  if (!status) {
    return "Unknown";
  }

  return status
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
