"use client";

import { useId, useState } from "react";

type FileUploadFieldProps = {
  name: string;
  label: string;
  required?: boolean;
};

export function FileUploadField({
  name,
  label,
  required = true,
}: FileUploadFieldProps) {
  const inputId = useId();
  const [fileName, setFileName] = useState("");

  return (
    <div className="rounded-lg border border-stone-200 bg-white p-4">
      <label htmlFor={inputId} className="block text-sm font-semibold text-stone-900">
        {label}
        {required ? <span className="text-red-600"> *</span> : null}
      </label>
      <input
        id={inputId}
        data-upload-name={name}
        type="file"
        required={required}
        accept=".jpg,.jpeg,.png,.pdf"
        className="mt-3 block w-full text-sm text-stone-700 file:mr-4 file:rounded-md file:border-0 file:bg-stone-950 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-stone-800"
        onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "")}
      />
      <p className="mt-2 text-xs text-stone-500">JPG, PNG, or PDF. Max 10MB.</p>
      {fileName ? (
        <p className="mt-2 rounded-md bg-stone-100 px-3 py-2 text-sm text-stone-800">
          Selected: {fileName}
        </p>
      ) : null}
    </div>
  );
}
