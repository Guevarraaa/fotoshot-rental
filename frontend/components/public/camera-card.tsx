import Image from "next/image";
import Link from "next/link";
import type { Camera } from "@/types/camera";
import { formatPeso } from "@/lib/pricing";

type CameraCardProps = {
  camera: Camera;
};

export function CameraCard({ camera }: CameraCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/cameras/${camera.slug}`} className="block">
        <div className="relative aspect-[4/3] bg-stone-100">
          <Image
            src={camera.imagePath}
            alt={`${camera.name} rental camera placeholder`}
            fill
            className="object-cover"
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm font-semibold uppercase tracking-wide text-stone-500">
          Rental camera
        </p>
        <h2 className="mt-2 text-xl font-bold text-stone-950">{camera.name}</h2>
        <p className="mt-2 flex-1 text-sm leading-6 text-stone-600">
          {camera.description}
        </p>
        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-md bg-stone-50 p-3">
            <dt className="text-stone-500">1-3 days</dt>
            <dd className="font-bold text-stone-950">
              {formatPeso(camera.priceOneToThreeDays)}/day
            </dd>
          </div>
          <div className="rounded-md bg-stone-50 p-3">
            <dt className="text-stone-500">4+ days</dt>
            <dd className="font-bold text-stone-950">
              {formatPeso(camera.priceFourPlusDays)}/day
            </dd>
          </div>
        </dl>
        <p className="mt-3 text-sm text-stone-600">
          Security deposit:{" "}
          <span className="font-semibold text-stone-950">
            {formatPeso(camera.securityDeposit)}
          </span>
        </p>
        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          <Link
            href={`/cameras/${camera.slug}`}
            className="rounded-md border border-stone-300 px-4 py-3 text-center text-sm font-semibold text-stone-800 transition hover:bg-stone-50"
          >
            View Details
          </Link>
          <Link
            href={`/book?camera=${camera.slug}`}
            className="rounded-md bg-stone-950 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-stone-800"
          >
            Book Now
          </Link>
        </div>
      </div>
    </article>
  );
}

