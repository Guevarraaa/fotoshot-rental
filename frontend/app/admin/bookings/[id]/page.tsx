import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import {
  approveBookingAction,
  markCompletedAction,
  markReleasedAction,
  markReturnedAction,
  markPaymentVerifiedAction,
  rejectBookingAction,
} from "./actions";

type AdminBookingDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminBookingDetailsPage({
  params,
}: AdminBookingDetailsPageProps) {
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

  const { id } = await params;

  const { data: booking } = await supabase
    .from("bookings")
    .select(
      `
      id,
      reference_number,
      rental_start_date,
      rental_end_date,
      pickup_time,
      return_time,
      rental_days,
      rental_fee,
      security_deposit,
      addon_total,
      total_amount,
      payment_method,
      payment_status,
      booking_status,
      pickup_location_text,
      printed_name,
      signed_date,
      created_at,
      customers (
        full_name,
        complete_address,
        contact_number,
        facebook_name,
        instagram_username
      ),
      cameras (
        name
      ),
      emergency_contacts (
        full_name,
        phone_number,
        relationship
      ),
      student_information (
        school_name,
        year_level_course
      )
    `,
    )
    .eq("id", id)
    .maybeSingle();

  if (!booking) {
    notFound();
  }

  const customer = Array.isArray(booking.customers)
    ? booking.customers[0]
    : booking.customers;

  const camera = Array.isArray(booking.cameras)
    ? booking.cameras[0]
    : booking.cameras;

  const emergencyContact = Array.isArray(booking.emergency_contacts)
    ? booking.emergency_contacts[0]
    : booking.emergency_contacts;

  const studentInfo = Array.isArray(booking.student_information)
    ? booking.student_information[0]
    : booking.student_information;

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-stone-500">
            Admin booking details
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-stone-950">
            {booking.reference_number}
          </h1>
          <p className="mt-3 text-sm text-stone-600">
            Created {formatDateTime(booking.created_at)}
          </p>
        </div>

        <Link
          href="/admin"
          className="rounded-md border border-stone-300 px-4 py-3 text-sm font-bold text-stone-900 hover:bg-stone-50"
        >
          Back to Dashboard
        </Link>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
        <DetailCard title="Booking Summary">
          <DetailRow label="Camera" value={camera?.name ?? "Unknown camera"} />
          <DetailRow
            label="Rental dates"
            value={`${booking.rental_start_date} to ${booking.rental_end_date}`}
          />
          <DetailRow label="Rental days" value={String(booking.rental_days)} />
          <DetailRow label="Pickup time" value={booking.pickup_time} />
          <DetailRow label="Return time" value={booking.return_time} />
          <DetailRow
            label="Pickup / return location"
            value={booking.pickup_location_text}
          />
          <DetailRow
            label="Booking status"
            value={formatStatus(booking.booking_status)}
          />
          <DetailRow
            label="Payment status"
            value={formatStatus(booking.payment_status)}
          />
          <DetailRow
            label="Payment method"
            value={formatStatus(booking.payment_method)}
          />
          {booking.payment_status === "verified" &&
          booking.booking_status !== "approved" ? (
            <form action={approveBookingAction} className="mt-4">
              <input type="hidden" name="booking_id" value={booking.id} />
              <button
                type="submit"
                className="w-full rounded-md bg-green-700 px-4 py-3 text-sm font-bold text-white hover:bg-green-800"
              >
                Approve Booking
              </button>
            </form>
          ) : null}
          {booking.booking_status === "approved" ? (
            <form action={markReleasedAction} className="mt-4">
              <input type="hidden" name="booking_id" value={booking.id} />
              <button
                type="submit"
                className="w-full rounded-md bg-blue-700 px-4 py-3 text-sm font-bold text-white hover:bg-blue-800"
              >
                Mark Released
              </button>
            </form>
          ) : null}
          {booking.booking_status === "released" ? (
            <form action={markReturnedAction} className="mt-4">
              <input type="hidden" name="booking_id" value={booking.id} />
              <button
                type="submit"
                className="w-full rounded-md bg-purple-700 px-4 py-3 text-sm font-bold text-white hover:bg-purple-800"
              >
                Mark Returned
              </button>
            </form>
          ) : null}
          {booking.booking_status === "returned" ? (
            <form action={markCompletedAction} className="mt-4">
              <input type="hidden" name="booking_id" value={booking.id} />
              <button
                type="submit"
                className="w-full rounded-md bg-stone-950 px-4 py-3 text-sm font-bold text-white hover:bg-stone-800"
              >
                Mark Completed
              </button>
            </form>
          ) : null}
          {!["completed", "rejected", "cancelled"].includes(
            booking.booking_status,
          ) ? (
            <form action={rejectBookingAction} className="mt-3">
              <input type="hidden" name="booking_id" value={booking.id} />
              <button
                type="submit"
                className="w-full rounded-md border border-red-300 px-4 py-3 text-sm font-bold text-red-700 hover:bg-red-50"
              >
                Reject Booking
              </button>
            </form>
          ) : null}
        </DetailCard>

        <DetailCard title="Payment">
          <DetailRow label="Rental fee" value={formatPeso(booking.rental_fee)} />
          <DetailRow
            label="Security deposit"
            value={formatPeso(booking.security_deposit)}
          />
          <DetailRow label="Add-ons" value={formatPeso(booking.addon_total)} />
          <DetailRow label="Total amount" value={formatPeso(booking.total_amount)} />
          <div className="mt-4 rounded-lg border border-dashed border-stone-300 bg-stone-50 p-4 text-sm text-stone-600">
            Payment screenshot preview will be added when file uploads are wired.
          </div>
          <form action={markPaymentVerifiedAction} className="mt-4">
            <input type="hidden" name="booking_id" value={booking.id} />
            <button
              type="submit"
              className="w-full rounded-md bg-stone-950 px-4 py-3 text-sm font-bold text-white hover:bg-stone-800"
            >
              Mark Payment Verified
            </button>
          </form>
        </DetailCard>

        <DetailCard title="Renter Information">
          <DetailRow label="Full name" value={customer?.full_name} />
          <DetailRow label="Contact number" value={customer?.contact_number} />
          <DetailRow label="Address" value={customer?.complete_address} />
          <DetailRow label="Facebook" value={customer?.facebook_name} />
          <DetailRow label="Instagram" value={customer?.instagram_username} />
        </DetailCard>

        <DetailCard title="Emergency Contact">
          <DetailRow label="Full name" value={emergencyContact?.full_name} />
          <DetailRow label="Phone number" value={emergencyContact?.phone_number} />
          <DetailRow label="Relationship" value={emergencyContact?.relationship} />
        </DetailCard>

        <DetailCard title="Student Information">
          <DetailRow label="School" value={studentInfo?.school_name} />
          <DetailRow label="Year / course" value={studentInfo?.year_level_course} />
        </DetailCard>

        <DetailCard title="Agreement">
          <DetailRow label="Printed name" value={booking.printed_name} />
          <DetailRow label="Signed date" value={booking.signed_date} />
          <div className="mt-4 rounded-lg border border-dashed border-stone-300 bg-stone-50 p-4 text-sm text-stone-600">
            Digital signature and required document previews will be added when
            private file uploads are wired.
          </div>
        </DetailCard>
      </div>
    </section>
  );
}

function DetailCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-bold text-stone-950">{title}</h2>
      <div className="mt-4 space-y-3">{children}</div>
    </section>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) {
  return (
    <div className="grid gap-1 border-b border-stone-100 pb-3 text-sm last:border-b-0 last:pb-0 sm:grid-cols-[160px_1fr]">
      <p className="font-semibold text-stone-500">{label}</p>
      <p className="text-stone-900">{value || "Not provided"}</p>
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

function formatPeso(amount: number | null) {
  if (amount === null) {
    return "Not provided";
  }

  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDateTime(value: string | null) {
  if (!value) {
    return "Unknown date";
  }

  return new Intl.DateTimeFormat("en-PH", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}
