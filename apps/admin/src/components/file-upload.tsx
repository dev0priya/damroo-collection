"use client";

import { useState } from "react";
import { Button, Input } from "@damroo/ui";
import { api } from "../lib/api";

export function FileUpload({ onUpload }: { onUpload: (url: string) => void }) {
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const { url } = await api.upload(file);
      onUpload(url);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Input type="file" onChange={handleFileChange} disabled={loading} />
      {loading && <span className="text-xs text-stone-500">Uploading...</span>}
    </div>
  );
}
