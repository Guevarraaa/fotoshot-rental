import { BookingForm } from "@/components/booking/booking-form";

export default function BookPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:py-16">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-stone-500">
          Booking request
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-stone-950">
          Submit your rental request
        </h1>
        <p className="mt-4 text-base leading-7 text-stone-600">
          Complete the form and agree to the rental terms first. After
          submission, FotoShot will show your booking reference number and the
          upload sections for your payment screenshot and required documents.
          Status starts as Pending Review.
        </p>
      </div>

      <BookingForm />
    </section>
  );
}
