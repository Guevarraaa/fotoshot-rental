import { CameraCard } from "@/components/public/camera-card";
import { cameras } from "@/lib/constants";

export default function CamerasPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-stone-500">
          Camera catalog
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-stone-950">
          FotoShot cameras
        </h1>
        <p className="mt-4 text-base leading-7 text-stone-600">
          Compare daily rates, deposits, inclusions, and add-ons before starting
          your booking request.
        </p>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {cameras.map((camera) => (
          <CameraCard key={camera.slug} camera={camera} />
        ))}
      </div>
    </section>
  );
}