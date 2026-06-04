"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";

async function requireAdmin() {
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

  const { data: isAdmin, error } = await supabase.rpc("is_admin");

  if (error || !isAdmin) {
    redirect("/admin/login");
  }

  return supabase;
}

export async function markPaymentVerifiedAction(formData: FormData) {
  const supabase = await requireAdmin();
  const bookingId = String(formData.get("booking_id") ?? "");

  if (!bookingId) {
    return;
  }

  const { error } = await supabase
    .from("bookings")
    .update({
      payment_status: "verified",
      booking_status: "paid_verified",
    })
    .eq("id", bookingId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
  revalidatePath(`/admin/bookings/${bookingId}`);
  redirect(`/admin/bookings/${bookingId}`);
}

export async function approveBookingAction(formData: FormData) {
  const supabase = await requireAdmin();
  const bookingId = String(formData.get("booking_id") ?? "");

  if (!bookingId) {
    return;
  }

  const { data: booking, error: bookingError } = await supabase
    .from("bookings")
    .select("payment_status")
    .eq("id", bookingId)
    .single();

  if (bookingError) {
    throw new Error(bookingError.message);
  }

  if (booking.payment_status !== "verified") {
    throw new Error("Payment must be verified before approving this booking.");
  }

  const { error } = await supabase
    .from("bookings")
    .update({
      booking_status: "approved",
    })
    .eq("id", bookingId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
  revalidatePath(`/admin/bookings/${bookingId}`);
  redirect(`/admin/bookings/${bookingId}`);
}
