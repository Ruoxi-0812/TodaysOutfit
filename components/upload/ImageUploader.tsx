"use client";

import { useRef, useState } from "react";

interface ImageUploaderProps {
  initialUrl?: string;
  onUpload: (url: string) => void;
}

export function ImageUploader({ initialUrl, onUpload }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(initialUrl ?? null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setPreview(URL.createObjectURL(file));
    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();

    if (!res.ok) {
      setError("Upload failed. Please try again.");
      setUploading(false);
      return;
    }

    onUpload(data.url);
    setUploading(false);
  }

  return (
    <div>
      <div
        className="relative w-full aspect-square rounded-card overflow-hidden border-2 border-dashed border-blush-200 bg-blush-50 flex items-center justify-center cursor-pointer hover:border-blush-400 transition-colors"
        onClick={() => inputRef.current?.click()}
      >
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={preview}
            alt="Clothing item"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-center p-4">
            <span className="text-3xl">📷</span>
            <p className="mt-2 text-sm text-gray-500">Click to upload photo</p>
          </div>
        )}
        {uploading && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="text-sm text-blush-500 font-medium">Uploading…</span>
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
    </div>
  );
}
