"use client";

import { useId, useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
const maxFileSize = 10 * 1024 * 1024;

type PaymentProofUploaderProps = {
  bookingId: string;
};

export function PaymentProofUploader({ bookingId }: PaymentProofUploaderProps) {
  const inputId = useId();
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  async function handleUpload() {
    setMessage("");
    setIsUploaded(false);

    if (!file) {
      setMessage("Please select a payment screenshot first.");
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      setMessage("Use JPG, PNG, or PDF only.");
      return;
    }

    if (file.size > maxFileSize) {
      setMessage("File must be 10MB or smaller.");
      return;
    }

    const supabase = createBrowserSupabaseClient();

    if (!supabase) {
      setMessage("Supabase is not configured.");
      return;
    }

    setIsUploading(true);

    const safeFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
    const filePath = `${bookingId}/payment-${Date.now()}-${safeFileName}`;

    const { error: uploadError } = await supabase.storage
      .from("payment-proofs")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (uploadError) {
      setMessage(uploadError.message);
      setIsUploading(false);
      return;
    }

    const { error: metadataError } = await supabase.from("booking_files").upsert(
      {
        booking_id: bookingId,
        file_type: "payment_screenshot",
        file_path: filePath,
        original_file_name: file.name,
        mime_type: file.type,
        file_size: file.size,
      },
      {
        onConflict: "booking_id,file_type",
      },
    );

    if (metadataError) {
      setMessage(metadataError.message);
      setIsUploading(false);
      return;
    }

    setMessage("Payment screenshot uploaded.");
    setIsUploaded(true);
    setIsUploading(false);
  }

  return (
    <div className="mt-5 rounded-lg border border-green-200 bg-white p-4">
      <label htmlFor={inputId} className="block text-sm font-semibold text-stone-900">
        Upload payment screenshot
      </label>
      <input
        id={inputId}
        type="file"
        accept=".jpg,.jpeg,.png,.pdf"
        className="mt-3 block w-full text-sm text-stone-700 file:mr-4 file:rounded-md file:border-0 file:bg-stone-950 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-stone-800"
        onChange={(event) => {
          setFile(event.target.files?.[0] ?? null);
          setMessage("");
          setIsUploaded(false);
        }}
      />
      <p className="mt-2 text-xs text-stone-500">JPG, PNG, or PDF. Max 10MB.</p>
      {file ? (
        <p className="mt-2 rounded-md bg-stone-100 px-3 py-2 text-sm text-stone-800">
          Selected: {file.name}
        </p>
      ) : null}
      {message ? (
        <p
          className={`mt-3 rounded-md px-3 py-2 text-sm ${
            isUploaded ? "bg-green-50 text-green-800" : "bg-red-50 text-red-700"
          }`}
        >
          {message}
        </p>
      ) : null}
      <button
        type="button"
        onClick={handleUpload}
        disabled={isUploading || isUploaded}
        className="mt-4 w-full rounded-md bg-stone-950 px-4 py-3 text-sm font-bold text-white hover:bg-stone-800 disabled:cursor-not-allowed disabled:bg-stone-400"
      >
        {isUploading ? "Uploading..." : isUploaded ? "Uploaded" : "Upload Payment Screenshot"}
      </button>
    </div>
  );
}
