import Link from "next/link";
import { CameraCard } from "@/components/public/camera-card";
import { HowItWorks } from "@/components/public/how-it-works";
import { businessInfo, cameras, rentalRules } from "@/lib/constants";
import { formatPeso } from "@/lib/pricing";

export default function Home() {
  return (
    <>
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-24">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-stone-500">
              FotoShot Camera Rental
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-stone-950 sm:text-5xl">
              Rent a camera without the long back-and-forth.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-stone-600">
              Browse FotoShot cameras, submit your requirements, upload your
              payment proof, and wait for manual admin approval.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/book"
                className="rounded-md bg-stone-950 px-5 py-3 text-center text-sm font-bold text-white hover:bg-stone-800"
              >
                Book a Camera
              </Link>
              <Link
                href="/cameras"
                className="rounded-md border border-stone-300 px-5 py-3 text-center text-sm font-bold text-stone-900 hover:bg-stone-50"
              >
                View Cameras
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-stone-200 bg-stone-50 p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-stone-500">
              Rental rules
            </p>
            <dl className="mt-4 grid gap-4 text-sm">
              <div>
                <dt className="text-stone-500">Standard rental period</dt>
                <dd className="font-semibold text-stone-950">
                  {rentalRules.standardPeriod}
                </dd>
              </div>
              <div>
                <dt className="text-stone-500">Pickup / return</dt>
                <dd className="font-semibold text-stone-950">
                  {rentalRules.pickupTime} pickup, {rentalRules.returnTime} return
                </dd>
              </div>
              <div>
                <dt className="text-stone-500">Late fee</dt>
                <dd className="font-semibold text-stone-950">
                  {formatPeso(rentalRules.lateFee)}/hour after 10:00 AM
                </dd>
              </div>
              <div>
                <dt className="text-stone-500">Contact</dt>
                <dd className="font-semibold text-stone-950">
                  {businessInfo.contactNumber}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-stone-500">
              Featured cameras
            </p>
            <h2 className="mt-2 text-3xl font-bold text-stone-950">
              Choose your rental camera
            </h2>
          </div>
          <Link href="/cameras" className="text-sm font-bold text-stone-900">
            See all cameras
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {cameras.map((camera) => (
            <CameraCard key={camera.slug} camera={camera} />
          ))}
        </div>
      </section>

      <HowItWorks />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="rounded-lg bg-stone-950 p-6 text-white sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-stone-400">
            Payment reminder
          </p>
          <h2 className="mt-2 text-2xl font-bold">
            Slots are reserved only after full payment is verified.
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-stone-300">
            Pending bookings do not block availability. FotoShot manually reviews
            renter documents and GCash/Maya payment screenshots before approval.
          </p>
        </div>
      </section>
    </>
  );
}