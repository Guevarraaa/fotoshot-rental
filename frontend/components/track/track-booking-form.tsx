"use client";

import { useActionState } from "react";
import {
  trackBookingAction,
  type TrackBookingState,
} from "@/app/track/actions";

const initialState: TrackBookingState = {
  ok: false,
  message: "",
};

export function TrackBookingForm() {
  const [state, formAction, isPending] = useActionState(
    trackBookingAction,
    initialState,
  );

  return (
    <form action={formAction} className="mt-8 rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
      <label className="block">
        <span className="text-sm font-semibold text-stone-900">
          Booking reference number
        </span>
        <input
          name="reference_number"
          type="text"
          placeholder="FS-2026-0001"
          required
          className="mt-2 w-full rounded-md border border-stone-300 px-3 py-3 text-sm"
        />
      </label>

      <label className="mt-4 block">
        <span className="text-sm font-semibold text-stone-900">
          Contact number
        </span>
        <input
          name="contact_number"
          type="tel"
          placeholder="+639..."
          required
          className="mt-2 w-full rounded-md border border-stone-300 px-3 py-3 text-sm"
        />
      </label>

      {state.message ? (
        <p
          className={`mt-4 rounded-md px-3 py-2 text-sm ${
            state.ok ? "bg-green-50 text-green-800" : "bg-red-50 text-red-700"
          }`}
        >
          {state.message}
        </p>
      ) : null}

      {state.booking ? (
        <div className="mt-5 rounded-lg bg-stone-50 p-4 text-sm">
          <h2 className="text-lg font-bold text-stone-950">
            {state.booking.referenceNumber}
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <StatusItem label="Camera" value={state.booking.cameraName} />
            <StatusItem
              label="Rental dates"
              value={`${state.booking.rentalStartDate} to ${state.booking.rentalEndDate}`}
            />
            <StatusItem
              label="Booking status"
              value={formatStatus(state.booking.bookingStatus)}
            />
            <StatusItem
              label="Payment status"
              value={formatStatus(state.booking.paymentStatus)}
            />
            <StatusItem
              label="Document status"
              value={formatStatus(state.booking.documentStatus)}
            />
          </div>
          <p className="mt-4 rounded-md bg-white px-3 py-2 text-sm text-stone-700">
            {getCustomerStatusMessage(
              state.booking.bookingStatus,
              state.booking.paymentStatus,
              state.booking.documentStatus,
            )}
          </p>
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="mt-5 w-full rounded-md bg-stone-950 px-5 py-3 text-sm font-bold text-white hover:bg-stone-800 disabled:cursor-not-allowed disabled:bg-stone-400"
      >
        {isPending ? "Checking..." : "Check Status"}
      </button>
    </form>
  );
}

function StatusItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-stone-500">{label}</p>
      <p className="font-semibold text-stone-950">{value}</p>
    </div>
  );
}

function formatStatus(status: string) {
  return status
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getCustomerStatusMessage(
  bookingStatus: string,
  paymentStatus: string,
  documentStatus: string,
) {
  if (documentStatus === "rejected") {
    return "Your documents need review. Please contact FotoShot so we can help you resubmit the correct files.";
  }

  if (bookingStatus === "approved") {
    return "Your booking is approved. Please follow the agreed pickup schedule and location.";
  }

  if (bookingStatus === "released") {
    return "Your camera has been released. Please return it fully charged by the agreed return time.";
  }

  if (bookingStatus === "returned") {
    return "Your camera has been returned. FotoShot is completing the final review.";
  }

  if (bookingStatus === "completed") {
    return "Your rental is completed. Thank you for renting with FotoShot.";
  }

  if (bookingStatus === "cancelled") {
    return "This booking has been cancelled. Please contact FotoShot if you need help.";
  }

  if (bookingStatus === "rejected") {
    return "This booking was rejected. Please contact FotoShot for more details.";
  }

  if (paymentStatus !== "verified") {
    return "Your booking is pending review. FotoShot will verify your payment and documents manually.";
  }

  if (documentStatus !== "verified") {
    return "Your payment is verified. FotoShot is still reviewing your required documents.";
  }

  return "Payment and documents are verified. FotoShot will approve your booking after final review.";
}
