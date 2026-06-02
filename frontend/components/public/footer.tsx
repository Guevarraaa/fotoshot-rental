import { businessInfo, paymentInfo } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-950 text-stone-100">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:px-6 md:grid-cols-3">
        <div>
          <p className="text-lg font-bold">{businessInfo.name}</p>
          <p className="mt-2 text-sm text-stone-300">{businessInfo.tagline}</p>
        </div>
        <div className="text-sm text-stone-300">
          <p className="font-semibold text-white">Contact</p>
          <p className="mt-2">{businessInfo.contactNumber}</p>
          <p>Instagram: {businessInfo.instagram}</p>
          <p>Facebook: {businessInfo.facebook}</p>
        </div>
        <div className="text-sm text-stone-300">
          <p className="font-semibold text-white">Payment</p>
          <p className="mt-2">GCash/Maya: {paymentInfo.onlineNumber}</p>
          <p>Name: {paymentInfo.onlineName}</p>
        </div>
      </div>
    </footer>
  );
}

