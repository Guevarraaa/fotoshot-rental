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

export async function markDocumentsVerifiedAction(formData: FormData) {
  const supabase = await requireAdmin();
  const bookingId = String(formData.get("booking_id") ?? "");

  if (!bookingId) {
    return;
  }

  const { error } = await supabase
    .from("bookings")
    .update({
      document_status: "verified",
    })
    .eq("id", bookingId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
  revalidatePath(`/admin/bookings/${bookingId}`);
  redirect(`/admin/bookings/${bookingId}`);
}

export async function rejectDocumentsAction(formData: FormData) {
  const supabase = await requireAdmin();
  const bookingId = String(formData.get("booking_id") ?? "");

  if (!bookingId) {
    return;
  }

  const { error } = await supabase
    .from("bookings")
    .update({
      document_status: "rejected",
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
    .select("payment_status, document_status")
    .eq("id", bookingId)
    .single();

  if (bookingError) {
    throw new Error(bookingError.message);
  }

  if (booking.payment_status !== "verified") {
    throw new Error("Payment must be verified before approving this booking.");
  }

  if (booking.document_status !== "verified") {
    throw new Error("Documents must be verified before approving this booking.");
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

export async function rejectBookingAction(formData: FormData) {
  const supabase = await requireAdmin();
  const bookingId = String(formData.get("booking_id") ?? "");

  if (!bookingId) {
    return;
  }

  const { error } = await supabase
    .from("bookings")
    .update({
      booking_status: "rejected",
    })
    .eq("id", bookingId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
  revalidatePath(`/admin/bookings/${bookingId}`);
  redirect(`/admin/bookings/${bookingId}`);
}

export async function markReleasedAction(formData: FormData) {
  const supabase = await requireAdmin();
  const bookingId = String(formData.get("booking_id") ?? "");

  if (!bookingId) {
    return;
  }

  const { data: booking, error: bookingError } = await supabase
    .from("bookings")
    .select("booking_status")
    .eq("id", bookingId)
    .single();

  if (bookingError) {
    throw new Error(bookingError.message);
  }

  if (booking.booking_status !== "approved") {
    throw new Error("Only approved bookings can be marked as released.");
  }

  const { error } = await supabase
    .from("bookings")
    .update({
      booking_status: "released",
    })
    .eq("id", bookingId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
  revalidatePath(`/admin/bookings/${bookingId}`);
  redirect(`/admin/bookings/${bookingId}`);
}

export async function markReturnedAction(formData: FormData) {
  const supabase = await requireAdmin();
  const bookingId = String(formData.get("booking_id") ?? "");

  if (!bookingId) {
    return;
  }

  const { data: booking, error: bookingError } = await supabase
    .from("bookings")
    .select("booking_status")
    .eq("id", bookingId)
    .single();

  if (bookingError) {
    throw new Error(bookingError.message);
  }

  if (booking.booking_status !== "released") {
    throw new Error("Only released bookings can be marked as returned.");
  }

  const { error } = await supabase
    .from("bookings")
    .update({
      booking_status: "returned",
    })
    .eq("id", bookingId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
  revalidatePath(`/admin/bookings/${bookingId}`);
  redirect(`/admin/bookings/${bookingId}`);
}

export async function markCompletedAction(formData: FormData) {
  const supabase = await requireAdmin();
  const bookingId = String(formData.get("booking_id") ?? "");

  if (!bookingId) {
    return;
  }

  const { data: booking, error: bookingError } = await supabase
    .from("bookings")
    .select("booking_status")
    .eq("id", bookingId)
    .single();

  if (bookingError) {
    throw new Error(bookingError.message);
  }

  if (booking.booking_status !== "returned") {
    throw new Error("Only returned bookings can be marked as completed.");
  }

  const { error } = await supabase
    .from("bookings")
    .update({
      booking_status: "completed",
    })
    .eq("id", bookingId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
  revalidatePath(`/admin/bookings/${bookingId}`);
  redirect(`/admin/bookings/${bookingId}`);
}

export async function cancelBookingAction(formData: FormData) {
  const supabase = await requireAdmin();
  const bookingId = String(formData.get("booking_id") ?? "");

  if (!bookingId) {
    return;
  }

  const { data: booking, error: bookingError } = await supabase
    .from("bookings")
    .select("booking_status")
    .eq("id", bookingId)
    .single();

  if (bookingError) {
    throw new Error(bookingError.message);
  }

  if (["completed", "cancelled"].includes(booking.booking_status)) {
    throw new Error("Completed or already cancelled bookings cannot be cancelled.");
  }

  const { error } = await supabase
    .from("bookings")
    .update({
      booking_status: "cancelled",
    })
    .eq("id", bookingId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
  revalidatePath(`/admin/bookings/${bookingId}`);
  redirect(`/admin/bookings/${bookingId}`);
}
