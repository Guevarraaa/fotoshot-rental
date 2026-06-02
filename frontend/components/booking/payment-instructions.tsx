import Image from "next/image";
import { paymentInfo } from "@/lib/constants";

export function PaymentInstructions() {
  return (
    <div className="grid gap-4 rounded-lg border border-stone-200 bg-stone-50 p-5 md:grid-cols-[1fr_180px]">
      <div>
        <h3 className="text-lg font-bold text-stone-950">
          GCash / Maya payment instructions
        </h3>
        <p className="mt-2 text-sm leading-6 text-stone-600">
          Send the full rental amount to the account below. Items are reserved
          only after payment is received, verified, and approved by FotoShot.
        </p>
        <dl className="mt-4 grid gap-2 text-sm">
          <div>
            <dt className="text-stone-500">Number</dt>
            <dd className="font-semibold text-stone-950">
              {paymentInfo.onlineNumber}
            </dd>
          </div>
          <div>
            <dt className="text-stone-500">Name</dt>
            <dd className="font-semibold text-stone-950">{paymentInfo.onlineName}</dd>
          </div>
        </dl>
      </div>
      <div className="relative aspect-square overflow-hidden rounded-lg border border-stone-200 bg-white">
        <Image
          src={paymentInfo.qrPlaceholderPath}
          alt="GCash and Maya QR code placeholder"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}

