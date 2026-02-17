"use client";

import { useRef, useState } from "react";
import { createClient } from "@/utils/supabase/client";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function ImagePickerField({ value, onChange }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop() ?? "jpg";
      const path = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { data, error: uploadError } = await supabase.storage
        .from("page-assets")
        .upload(path, file, { cacheControl: "3600", upsert: false });

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("page-assets").getPublicUrl(data.path);

      onChange(publicUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {/* Preview */}
      {value && (
        <div
          style={{
            position: "relative",
            width: "100%",
            minHeight: 80,
            maxHeight: 160,
            background: "#f3f4f6",
            borderRadius: 6,
            overflow: "hidden",
            border: "1px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Preview"
            style={{ maxWidth: "100%", maxHeight: 160, objectFit: "contain" }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <button
            type="button"
            onClick={() => onChange("")}
            style={{
              position: "absolute",
              top: 4,
              right: 4,
              background: "rgba(0,0,0,0.55)",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              padding: "2px 7px",
              fontSize: 11,
              cursor: "pointer",
              lineHeight: "18px",
            }}
          >
            Remove
          </button>
        </div>
      )}

      {/* Controls */}
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFile}
        />
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          style={{
            padding: "5px 10px",
            fontSize: 12,
            fontWeight: 500,
            background: uploading ? "#e5e7eb" : "#18181b",
            color: uploading ? "#9ca3af" : "#fff",
            border: "none",
            borderRadius: 5,
            cursor: uploading ? "not-allowed" : "pointer",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          {uploading ? "Uploading…" : value ? "Change" : "Upload image"}
        </button>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="or paste URL"
          style={{
            flex: 1,
            minWidth: 0,
            padding: "5px 8px",
            fontSize: 12,
            border: "1px solid #d1d5db",
            borderRadius: 5,
            outline: "none",
          }}
        />
      </div>

      {error && (
        <p style={{ fontSize: 11, color: "#ef4444", margin: 0 }}>{error}</p>
      )}
    </div>
  );
}
