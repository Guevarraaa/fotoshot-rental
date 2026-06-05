"use client";

import { useState } from "react";
import { uploadRequirements } from "@/lib/constants";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
const maxFileSize = 10 * 1024 * 1024;

type BookingDocumentsUploaderProps = {
  bookingId: string;
};

type UploadState = Record<string, string>;

export function BookingDocumentsUploader({
  bookingId,
}: BookingDocumentsUploaderProps) {
  const [files, setFiles] = useState<Record<string, File | null>>({});
  const [messages, setMessages] = useState<UploadState>({});
  const [isUploading, setIsUploading] = useState(false);

  async function uploadAll() {
    setMessages({});

    const missing = uploadRequirements.filter((upload) => !files[upload.id]);

    if (missing.length) {
      setMessages({
        form: `Please select all required documents. Missing: ${missing
          .map((item) => item.label)
          .join(", ")}`,
      });
      return;
    }

    const supabase = createBrowserSupabaseClient();

    if (!supabase) {
      setMessages({ form: "Supabase is not configured." });
      return;
    }

    setIsUploading(true);
    const nextMessages: UploadState = {};

    for (const upload of uploadRequirements) {
      const file = files[upload.id];

      if (!file) {
        continue;
      }

      if (!allowedTypes.includes(file.type)) {
        nextMessages[upload.id] = "Use JPG, PNG, or PDF only.";
        continue;
      }

      if (file.size > maxFileSize) {
        nextMessages[upload.id] = "File must be 10MB or smaller.";
        continue;
      }

      const safeFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
      const filePath = `${bookingId}/${upload.id}-${Date.now()}-${safeFileName}`;

      const { error: uploadError } = await supabase.storage
        .from("booking-documents")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) {
        nextMessages[upload.id] = uploadError.message;
        continue;
      }

      const { error: metadataError } = await supabase.from("booking_files").upsert(
        {
          booking_id: bookingId,
          file_type: upload.id,
          file_path: filePath,
          original_file_name: file.name,
          mime_type: file.type,
          file_size: file.size,
        },
        {
          onConflict: "booking_id,file_type",
        },
      );

      nextMessages[upload.id] = metadataError
        ? metadataError.message
        : "Uploaded";
    }

    setMessages(nextMessages);
    setIsUploading(false);
  }

  const uploadedCount = uploadRequirements.filter(
    (upload) => messages[upload.id] === "Uploaded",
  ).length;

  return (
    <div className="mt-5 rounded-lg border border-green-200 bg-white p-4">
      <h3 className="text-lg font-bold text-stone-950">
        Upload required documents
      </h3>
      <p className="mt-2 text-sm text-stone-600">
        Upload all required IDs, signatures, selfie, and proof of address files.
      </p>

      {messages.form ? (
        <p className="mt-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {messages.form}
        </p>
      ) : null}

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {uploadRequirements.map((upload) => (
          <div key={upload.id} className="rounded-lg border border-stone-200 p-4">
            <label className="block text-sm font-semibold text-stone-900">
              {upload.label}
            </label>
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              className="mt-3 block w-full text-sm text-stone-700 file:mr-4 file:rounded-md file:border-0 file:bg-stone-950 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-stone-800"
              onChange={(event) => {
                setFiles((current) => ({
                  ...current,
                  [upload.id]: event.target.files?.[0] ?? null,
                }));
                setMessages((current) => ({
                  ...current,
                  [upload.id]: "",
                  form: "",
                }));
              }}
            />
            {files[upload.id]?.name ? (
              <p className="mt-2 rounded-md bg-stone-100 px-3 py-2 text-sm text-stone-800">
                Selected: {files[upload.id]?.name}
              </p>
            ) : null}
            {messages[upload.id] ? (
              <p
                className={`mt-2 rounded-md px-3 py-2 text-sm ${
                  messages[upload.id] === "Uploaded"
                    ? "bg-green-50 text-green-800"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {messages[upload.id]}
              </p>
            ) : null}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={uploadAll}
        disabled={isUploading || uploadedCount === uploadRequirements.length}
        className="mt-4 w-full rounded-md bg-stone-950 px-4 py-3 text-sm font-bold text-white hover:bg-stone-800 disabled:cursor-not-allowed disabled:bg-stone-400"
      >
        {isUploading
          ? "Uploading documents..."
          : uploadedCount === uploadRequirements.length
            ? "All documents uploaded"
            : "Upload Required Documents"}
      </button>
    </div>
  );
}
