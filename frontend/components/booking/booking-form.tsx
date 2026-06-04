"use client";

import { useActionState, useMemo, useState } from "react";
import { submitBookingAction, type BookingActionState } from "@/app/book/actions";
import {
  cameras,
  pickupLocations,
  rentalRules,
  uploadRequirements,
} from "@/lib/constants";
import {
  calculateBookingTotal,
  calculateRentalDays,
  formatPeso,
} from "@/lib/pricing";
import { FileUploadField } from "./file-upload-field";
import { PaymentProofUploader } from "./payment-proof-uploader";
import { PaymentInstructions } from "./payment-instructions";

const today = new Date().toISOString().slice(0, 10);

export function BookingForm() {
  const [cameraSlug, setCameraSlug] = useState(cameras[0].slug);
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [filmBoxes, setFilmBoxes] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("gcash");
    const initialState: BookingActionState = {
    ok: false,
    message: "",
  };

  const [state, formAction, isPending] = useActionState(
    submitBookingAction,
    initialState,
  );

  const selectedCamera =
    cameras.find((camera) => camera.slug === cameraSlug) ?? cameras[0];
  const rentalDays = calculateRentalDays(startDate, endDate);
  const total = useMemo(
    () => calculateBookingTotal(selectedCamera, rentalDays, filmBoxes),
    [selectedCamera, rentalDays, filmBoxes],
  );

  

   if (state.ok) {
    return (
      <section className="rounded-lg border border-green-200 bg-green-50 p-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-green-700">
          Pending Review
        </p>
        <h2 className="mt-2 text-2xl font-bold text-green-950">
          Booking submitted for review
        </h2>
        <p className="mt-3 text-sm leading-6 text-green-900">
          Your booking reference number is {state.referenceNumber}. Admin will verify your documents and payment manually.
        </p>
        {state.bookingId ? (
          <PaymentProofUploader bookingId={state.bookingId} />
        ) : null}
      </section>
    );
  }

  return (
  <form action={formAction} className="space-y-8">
      <BookingSection number={1} title="Select camera and dates">
        <div className="grid gap-4 md:grid-cols-3">
          <label className="block">
            <span className="text-sm font-semibold text-stone-900">Camera</span>
            <select
              name="camera_slug"
              value={cameraSlug}
              onChange={(event) => setCameraSlug(event.target.value)}
              className="mt-2 w-full rounded-md border border-stone-300 px-3 py-3 text-sm"
            >
              {cameras.map((camera) => (
                <option key={camera.slug} value={camera.slug}>
                  {camera.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-stone-900">
              Rental start date
            </span>
            <input
            name="rental_start_date"
              type="date"
              required
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
              className="mt-2 w-full rounded-md border border-stone-300 px-3 py-3 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-stone-900">
              Rental end date
            </span>
            <input
            name="rental_end_date"
              type="date"
              required
              value={endDate}
              min={startDate}
              onChange={(event) => setEndDate(event.target.value)}
              className="mt-2 w-full rounded-md border border-stone-300 px-3 py-3 text-sm"
            />
          </label>
        </div>
        {selectedCamera.addons ? (
          <label className="mt-4 block max-w-sm">
            <span className="text-sm font-semibold text-stone-900">
              Instax film boxes
            </span>
            <input
            name="instax_film_boxes"
              type="number"
              min="0"
              value={filmBoxes}
              onChange={(event) => setFilmBoxes(Number(event.target.value))}
              className="mt-2 w-full rounded-md border border-stone-300 px-3 py-3 text-sm"
            />
          </label>
        ) : null}
        <div className="mt-5 grid gap-3 rounded-lg bg-stone-50 p-4 text-sm sm:grid-cols-2 lg:grid-cols-5">
          <SummaryItem label="Days" value={`${total.rentalDays}`} />
          <SummaryItem label="Daily rate" value={formatPeso(total.dailyRate)} />
          <SummaryItem label="Rental fee" value={formatPeso(total.rentalFee)} />
          <SummaryItem label="Deposit" value={formatPeso(total.securityDeposit)} />
          <SummaryItem label="Total" value={formatPeso(total.totalAmount)} strong />
        </div>
      </BookingSection>

      <BookingSection number={2} title="Renter information">
        <div className="grid gap-4 md:grid-cols-2">
          <TextField label="Full name" name="full_name" required />
          <TextField label="Contact number" name="contact_number" required />
          <TextField label="Facebook name" name="facebook_name" />
          <TextField label="Instagram username" name="instagram_username" />
          <label className="block md:col-span-2">
            <span className="text-sm font-semibold text-stone-900">
              Complete address <span className="text-red-600">*</span>
            </span>
            <textarea
              name="complete_address"
              required
              rows={3}
              className="mt-2 w-full rounded-md border border-stone-300 px-3 py-3 text-sm"
            />
          </label>
        </div>
      </BookingSection>

      <BookingSection number={3} title="Pickup, return, and emergency contact">
        <div className="grid gap-4 md:grid-cols-2">
          {pickupLocations.map((location) => (
            <label
              key={location.id}
              className="rounded-lg border border-stone-200 bg-stone-50 p-4"
            >
              <input
                type="radio"
                name="pickup_location"
                value={location.id}
                required
                className="mr-2"
              />
              <span className="font-semibold text-stone-950">{location.label}</span>
              <span className="mt-2 block text-sm leading-6 text-stone-600">
                {location.detail}. No meetups.
              </span>
            </label>
          ))}
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <TextField label="Emergency contact name" name="emergency_name" required />
          <TextField label="Emergency contact phone" name="emergency_phone" required />
          <TextField label="Relationship" name="emergency_relationship" required />
        </div>
      </BookingSection>

      <BookingSection number={4} title="Student information">
        <div className="grid gap-4 md:grid-cols-2">
          <TextField label="School name (optional)" name="school_name" />
          <TextField label="Year level / course (optional)" name="year_level_course" />
        </div>
      </BookingSection>

      <BookingSection number={5} title="Required uploads">
        <div className="grid gap-4 md:grid-cols-2">
          {uploadRequirements.map((upload) => (
            <FileUploadField key={upload.id} name={upload.id} label={upload.label} />
          ))}
        </div>
      </BookingSection>

      <BookingSection number={6} title="Terms, agreement, and signature">
        <div className="grid gap-4">
          <label className="flex gap-3 rounded-lg border border-stone-200 bg-stone-50 p-4 text-sm text-stone-700">
            <input type="checkbox" required className="mt-1" />
            <span>
              I agree to FotoShot terms, including the 23-hour rental period,
              late fee of {formatPeso(rentalRules.lateFee)}/hour after 10:00 AM,
              no meetups, no refunds for early returns/no-shows, and 30%
              cancellation refund only.
            </span>
          </label>
          <label className="flex gap-3 rounded-lg border border-stone-200 bg-stone-50 p-4 text-sm text-stone-700">
            <input type="checkbox" required className="mt-1" />
            <span>
              I agree to the FotoShot rental agreement and confirm all submitted
              information and uploaded documents are true and accurate.
            </span>
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <TextField label="Printed name" name="printed_name" required />
            <TextField label="Date signed" name="signed_date" type="date" required />
          </div>
          <label className="block">
            <span className="text-sm font-semibold text-stone-900">
              Digital signature <span className="text-red-600">*</span>
            </span>
            <textarea
              name="digital_signature"
              required
              rows={3}
              placeholder="Type your full legal name as Sprint 1 signature placeholder"
              className="mt-2 w-full rounded-md border border-stone-300 px-3 py-3 text-sm"
            />
          </label>
        </div>
      </BookingSection>

      <BookingSection number={7} title="Payment method and screenshot">
        <PaymentInstructions />
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {["gcash", "maya", "cash"].map((method) => (
            <label
              key={method}
              className="rounded-lg border border-stone-200 bg-white p-4 capitalize"
            >
              <input
                type="radio"
                name="payment_method"
                value={method}
                checked={paymentMethod === method}
                onChange={(event) => setPaymentMethod(event.target.value)}
                className="mr-2"
              />
              {method}
            </label>
          ))}
        </div>
        <div className="mt-4">
          <FileUploadField
            name="payment_screenshot"
            label="Payment screenshot"
            required={paymentMethod !== "cash"}
          />
        </div>
      </BookingSection>

      <BookingSection number={8} title="Review and submit">
        <div className="grid gap-3 rounded-lg bg-stone-50 p-4 text-sm md:grid-cols-2">
          <SummaryItem label="Camera" value={selectedCamera.name} />
          <SummaryItem label="Rental period" value={`${startDate} to ${endDate}`} />
          <SummaryItem label="Status after submit" value="Pending Review" />
          <SummaryItem label="Pending expiry" value={rentalRules.pendingExpiry} />
          <SummaryItem label="Total amount" value={formatPeso(total.totalAmount)} strong />
        </div>
        {state.message && !state.ok ? (
  <p className="mt-5 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
    {state.message}
  </p>
) : null}
      <button
  type="submit"
  disabled={isPending}
  className="mt-5 w-full rounded-md bg-stone-950 px-5 py-4 text-sm font-bold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:bg-stone-400 md:w-auto"
>
  {isPending ? "Submitting..." : "Submit Booking for Review"}
</button>
      </BookingSection>
    </form>
  );
}

function BookingSection({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-950 text-sm font-bold text-white">
          {number}
        </span>
        <h2 className="text-xl font-bold text-stone-950">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function TextField({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-stone-900">
        {label}
        {required ? <span className="text-red-600"> *</span> : null}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full rounded-md border border-stone-300 px-3 py-3 text-sm"
      />
    </label>
  );
}

function SummaryItem({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div>
      <p className="text-stone-500">{label}</p>
      <p className={strong ? "font-bold text-stone-950" : "font-semibold text-stone-800"}>
        {value}
      </p>
    </div>
  );
}
