import { TrackBookingForm } from "@/components/track/track-booking-form";

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

      <TrackBookingForm />
    </section>
  );
}
