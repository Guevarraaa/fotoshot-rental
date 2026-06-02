import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cameras } from "@/lib/constants";
import { formatPeso } from "@/lib/pricing";

type CameraDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return cameras.map((camera) => ({
    slug: camera.slug,
  }));
}

export async function generateMetadata({ params }: CameraDetailPageProps) {
  const { slug } = await params;
  const camera = cameras.find((item) => item.slug === slug);

  return {
    title: camera ? `${camera.name} | FotoShot` : "Camera | FotoShot",
  };
}

export default async function CameraDetailPage({
  params,
}: CameraDetailPageProps) {
  const { slug } = await params;
  const camera = cameras.find((item) => item.slug === slug);

  if (!camera) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-stone-200 bg-stone-100">
          <Image
            src={camera.imagePath}
            alt={`${camera.name} rental camera placeholder`}
            fill
            priority
            className="object-cover"
          />
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-stone-500">
            Camera details
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-stone-950">
            {camera.name}
          </h1>
          <p className="mt-4 text-base leading-7 text-stone-600">
            {camera.description}
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <PriceBox
              label="1-3 days"
              value={`${formatPeso(camera.priceOneToThreeDays)}/day`}
            />
            <PriceBox
              label="4+ days"
              value={`${formatPeso(camera.priceFourPlusDays)}/day`}
            />
            <PriceBox
              label="Deposit"
              value={formatPeso(camera.securityDeposit)}
            />
          </div>

          {camera.addons?.length ? (
            <div className="mt-6 rounded-lg border border-stone-200 bg-stone-50 p-5">
              <h2 className="font-bold text-stone-950">Add-ons</h2>
              <ul className="mt-3 space-y-2 text-sm text-stone-700">
                {camera.addons.map((addon) => (
                  <li key={addon.name}>
                    {addon.name}: {formatPeso(addon.price)} -{" "}
                    {addon.description}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mt-6">
            <h2 className="font-bold text-stone-950">Inclusions</h2>
            <ul className="mt-3 grid gap-2 text-sm text-stone-700 sm:grid-cols-2">
              {camera.inclusions.map((item) => (
                <li
                  key={item}
                  className="rounded-md border border-stone-200 bg-white px-3 py-2"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/book?camera=${camera.slug}`}
              className="rounded-md bg-stone-950 px-5 py-3 text-center text-sm font-bold text-white hover:bg-stone-800"
            >
              Book This Camera
            </Link>
            <Link
              href="/cameras"
              className="rounded-md border border-stone-300 px-5 py-3 text-center text-sm font-bold text-stone-900 hover:bg-stone-50"
            >
              Back to Catalog
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-10 rounded-lg border border-dashed border-stone-300 bg-stone-50 p-6">
        <h2 className="text-xl font-bold text-stone-950">
          Sample output gallery placeholder
        </h2>
        <p className="mt-2 text-sm leading-6 text-stone-600">
          Add real sample photos later in the assets folder for this camera.
        </p>
      </div>
    </section>
  );
}

function PriceBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-stone-50 p-4">
      <p className="text-sm text-stone-500">{label}</p>
      <p className="mt-1 font-bold text-stone-950">{value}</p>
    </div>
  );
}