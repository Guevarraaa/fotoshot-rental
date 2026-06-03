"use server";

import { cameras, pickupLocations } from "@/lib/constants";
import { calculateBookingTotal, calculateRentalDays } from "@/lib/pricing";
import { createPublicServerSupabaseClient } from "@/lib/supabase/public-server";

export type BookingActionState = {
  ok: boolean;
  message: string;
  referenceNumber?: string;
};

function getString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function makeReferenceNumber() {
  const year = new Date().getFullYear();
  const random = Math.floor(1000 + Math.random() * 9000);

  return `FS-${year}-${random}`;
}

export async function submitBookingAction(
  _previousState: BookingActionState,
  formData: FormData,
): Promise<BookingActionState> {
  const supabase = createPublicServerSupabaseClient();

  if (!supabase) {
    return {
      ok: false,
      message: "Supabase is not configured.",
    };
  }

  const cameraSlug = getString(formData, "camera_slug");
  const selectedCamera = cameras.find((camera) => camera.slug === cameraSlug);

  if (!selectedCamera) {
    return {
      ok: false,
      message: "Please select a valid camera.",
    };
  }

  const rentalStartDate = getString(formData, "rental_start_date");
  const rentalEndDate = getString(formData, "rental_end_date");
  const rentalDays = calculateRentalDays(rentalStartDate, rentalEndDate);
  const filmBoxes = Number(formData.get("instax_film_boxes") ?? 0);
  const total = calculateBookingTotal(selectedCamera, rentalDays, filmBoxes);

  const fullName = getString(formData, "full_name");
  const completeAddress = getString(formData, "complete_address");
  const contactNumber = getString(formData, "contact_number");
  const printedName = getString(formData, "printed_name");
  const signedDate = getString(formData, "signed_date");
  const pickupLocationType = getString(formData, "pickup_location");
  const pickupLocation = pickupLocations.find(
    (location) => location.id === pickupLocationType,
  );
  const paymentMethod = getString(formData, "payment_method") || "gcash";

  if (
    !fullName ||
    !completeAddress ||
    !contactNumber ||
    !printedName ||
    !signedDate ||
    !pickupLocation
  ) {
    return {
      ok: false,
      message: "Please complete all required booking fields.",
    };
  }

  const { data: customer, error: customerError } = await supabase
    .from("customers")
    .insert({
      full_name: fullName,
      complete_address: completeAddress,
      contact_number: contactNumber,
      facebook_name: getString(formData, "facebook_name") || null,
      instagram_username: getString(formData, "instagram_username") || null,
    })
    .select("id")
    .single();

  if (customerError || !customer) {
    return {
      ok: false,
      message: customerError?.message ?? "Could not create customer.",
    };
  }

  const referenceNumber = makeReferenceNumber();

  const { data: booking, error: bookingError } = await supabase
    .from("bookings")
    .insert({
      reference_number: referenceNumber,
      customer_id: customer.id,
      camera_id: selectedCamera.id,
      rental_start_date: rentalStartDate,
      rental_end_date: rentalEndDate,
      rental_days: total.rentalDays,
      rental_fee: total.rentalFee,
      security_deposit: total.securityDeposit,
      addon_total: total.addonTotal,
      total_amount: total.totalAmount,
      payment_method: paymentMethod,
      payment_status:
        paymentMethod === "cash" ? "cash_pending" : "payment_submitted",
      booking_status: "pending_review",
      pickup_location_type: pickupLocation.id,
      pickup_location_text: pickupLocation.detail,
      terms_accepted: true,
      agreement_accepted: true,
      printed_name: printedName,
      signed_date: signedDate,
    })
    .select("id")
    .single();

  if (bookingError || !booking) {
    return {
      ok: false,
      message: bookingError?.message ?? "Could not create booking.",
    };
  }

  await supabase.from("emergency_contacts").insert({
    booking_id: booking.id,
    full_name: getString(formData, "emergency_name"),
    phone_number: getString(formData, "emergency_phone"),
    relationship: getString(formData, "emergency_relationship"),
  });

  await supabase.from("student_information").insert({
    booking_id: booking.id,
    school_name: getString(formData, "school_name") || null,
    year_level_course: getString(formData, "year_level_course") || null,
  });

  return {
    ok: true,
    message: "Booking submitted for review.",
    referenceNumber,
  };
}
