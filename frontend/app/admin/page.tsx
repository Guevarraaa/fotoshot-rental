import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminLogoutButton } from "@/components/admin/admin-logout-button";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { bookingStatuses } from "@/lib/constants";

const dashboardFilters = [
  { id: "all", label: "All" },
  { id: "pending_review", label: "Pending Review" },
  { id: "payment_submitted", label: "Payment Submitted" },
  { id: "documents_rejected", label: "Documents Rejected" },
  { id: "approved", label: "Approved" },
  { id: "released", label: "Released" },
  { id: "completed", label: "Completed" },
] as const;

type DashboardFilter = (typeof dashboardFilters)[number]["id"];

type AdminDashboardPageProps = {
  searchParams?: Promise<{
    filter?: string;
  }>;
};

export default async function AdminDashboardPage({
  searchParams,
}: AdminDashboardPageProps) {
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
  const params = searchParams ? await searchParams : {};
  const activeFilter = getDashboardFilter(params.filter);

    const { data: bookings } = await supabase
    .from("bookings")
    .select(
      `
      id,
      reference_number,
      rental_start_date,
      rental_end_date,
      payment_status,
      document_status,
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
    .limit(50);

  const bookingRows = bookings ?? [];
  const visibleBookingRows = filterBookings(bookingRows, activeFilter).slice(
    0,
    10,
  );

  const pendingCount = bookingRows.filter(
    (booking) => booking.booking_status === "pending_review",
  ).length;

  const paymentSubmittedCount = bookingRows.filter(
    (booking) => booking.payment_status === "payment_submitted",
  ).length;

  const documentsPendingCount = bookingRows.filter(
    (booking) => booking.document_status === "pending",
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
            Booking review dashboard
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-stone-600">
            Review payments, documents, booking statuses, and rental progress
            from the latest FotoShot booking requests.
          </p>
        </div>
        <AdminLogoutButton />

      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <MetricCard label="Pending bookings" value={pendingCount} />
        <MetricCard label="Payment submitted" value={paymentSubmittedCount} />
        <MetricCard label="Documents pending" value={documentsPendingCount} />
        <MetricCard label="Approved bookings" value={approvedCount} />
        <MetricCard label="Released rentals" value={releasedCount} />
        <MetricCard label="Returned today" value={returnedTodayCount} />
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
            Latest bookings
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {dashboardFilters.map((filter) => (
              <Link
                key={filter.id}
                href={filter.id === "all" ? "/admin" : `/admin?filter=${filter.id}`}
                className={`rounded-full px-3 py-2 text-sm font-semibold ${
                  activeFilter === filter.id
                    ? "bg-stone-950 text-white"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                }`}
              >
                {filter.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-stone-50 text-stone-500">
              <tr>
                <th className="px-5 py-3">Reference</th>
                <th className="px-5 py-3">Customer</th>
                <th className="px-5 py-3">Camera</th>
                <th className="px-5 py-3">Payment</th>
                <th className="px-5 py-3">Documents</th>
                <th className="px-5 py-3">Booking Status</th>
                <th className="px-5 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {visibleBookingRows.length ? (
                visibleBookingRows.map((booking) => {
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
                        <StatusPill status={booking.document_status} />
                      </td>
                      <td className="px-5 py-4 text-stone-600">
                        {formatStatus(booking.booking_status)}
                      </td>
                      <td className="px-5 py-4">
                       <Link
  href={`/admin/bookings/${booking.id}`}
  className="rounded-md border border-stone-300 px-3 py-2 text-sm font-semibold text-stone-800 hover:bg-stone-50"
>
  View Details
</Link>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr className="border-t border-stone-200">
                  <td className="px-5 py-6 text-center text-stone-500" colSpan={7}>
                    No bookings found for this filter.
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

function StatusPill({ status }: { status: string | null }) {
  const baseClass =
    "inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide";

  if (status === "verified") {
    return (
      <span className={`${baseClass} bg-green-50 text-green-700`}>
        Verified
      </span>
    );
  }

  if (status === "rejected") {
    return (
      <span className={`${baseClass} bg-red-50 text-red-700`}>Rejected</span>
    );
  }

  return <span className={`${baseClass} bg-yellow-50 text-yellow-700`}>Pending</span>;
}

function getDashboardFilter(filter?: string): DashboardFilter {
  const match = dashboardFilters.find((item) => item.id === filter);

  return match?.id ?? "all";
}

function filterBookings<T extends {
  booking_status: string | null;
  payment_status: string | null;
  document_status: string | null;
}>(bookings: T[], filter: DashboardFilter) {
  if (filter === "all") {
    return bookings;
  }

  if (filter === "payment_submitted") {
    return bookings.filter(
      (booking) => booking.payment_status === "payment_submitted",
    );
  }

  if (filter === "documents_rejected") {
    return bookings.filter((booking) => booking.document_status === "rejected");
  }

  return bookings.filter((booking) => booking.booking_status === filter);
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
