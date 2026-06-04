"use server";

import { createPublicServerSupabaseClient } from "@/lib/supabase/public-server";

export type TrackBookingState = {
  ok: boolean;
  message: string;
  booking?: {
    referenceNumber: string;
    cameraName: string;
    rentalStartDate: string;
    rentalEndDate: string;
    bookingStatus: string;
    paymentStatus: string;
  };
};

function getString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function trackBookingAction(
  _previousState: TrackBookingState,
  formData: FormData,
): Promise<TrackBookingState> {
  const supabase = createPublicServerSupabaseClient();

  if (!supabase) {
    return {
      ok: false,
      message: "Supabase is not configured.",
    };
  }

  const referenceNumber = getString(formData, "reference_number").toUpperCase();
  const contactNumber = getString(formData, "contact_number");

  if (!referenceNumber || !contactNumber) {
    return {
      ok: false,
      message: "Enter both booking reference number and contact number.",
    };
  }

  const { data: booking, error } = await supabase
    .from("bookings")
    .select(
      `
      reference_number,
      rental_start_date,
      rental_end_date,
      booking_status,
      payment_status,
      customers!inner (
        contact_number
      ),
      cameras (
        name
      )
    `,
    )
    .eq("reference_number", referenceNumber)
    .eq("customers.contact_number", contactNumber)
    .maybeSingle();

  if (error) {
    return {
      ok: false,
      message: error.message,
    };
  }

  if (!booking) {
    return {
      ok: false,
      message: "No booking found for that reference number and contact number.",
    };
  }

  const camera = Array.isArray(booking.cameras)
    ? booking.cameras[0]
    : booking.cameras;

  return {
    ok: true,
    message: "Booking found.",
    booking: {
      referenceNumber: booking.reference_number,
      cameraName: camera?.name ?? "Unknown camera",
      rentalStartDate: booking.rental_start_date,
      rentalEndDate: booking.rental_end_date,
      bookingStatus: booking.booking_status,
      paymentStatus: booking.payment_status,
    },
  };
}
