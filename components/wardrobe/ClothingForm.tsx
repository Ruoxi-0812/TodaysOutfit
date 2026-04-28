"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { ImageUploader } from "@/components/upload/ImageUploader";
import type { ClothingItem } from "@prisma/client";

const categories = [
  { value: "TOPS", label: "Tops" },
  { value: "BOTTOMS", label: "Bottoms" },
  { value: "DRESSES", label: "Dresses" },
  { value: "OUTERWEAR", label: "Outerwear" },
  { value: "SHOES", label: "Shoes" },
  { value: "BAGS", label: "Bags" },
  { value: "JEWELRY", label: "Jewelry" },
  { value: "ACCESSORIES", label: "Accessories" },
];

interface ClothingFormProps {
  item?: ClothingItem;
}

export function ClothingForm({ item }: ClothingFormProps) {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState(item?.imageUrl ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = new FormData(e.currentTarget);
    const body = {
      name: form.get("name"),
      category: form.get("category"),
      color: form.get("color"),
      brand: form.get("brand"),
      notes: form.get("notes"),
      imageUrl,
    };

    const url = item ? `/api/clothing/${item.id}` : "/api/clothing";
    const method = item ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Something went wrong");
      setLoading(false);
      return;
    }

    router.push("/wardrobe");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
      <div>
        <Label>Photo</Label>
        <ImageUploader initialUrl={item?.imageUrl ?? undefined} onUpload={setImageUrl} />
      </div>
      <div>
        <Label htmlFor="name">Name *</Label>
        <Input id="name" name="name" defaultValue={item?.name} required placeholder="e.g. White linen shirt" />
      </div>
      <div>
        <Label htmlFor="category">Category *</Label>
        <Select id="category" name="category" defaultValue={item?.category} required>
          <option value="">Select a category</option>
          {categories.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="color">Color</Label>
          <Input id="color" name="color" defaultValue={item?.color ?? ""} placeholder="e.g. White" />
        </div>
        <div>
          <Label htmlFor="brand">Brand</Label>
          <Input id="brand" name="brand" defaultValue={item?.brand ?? ""} placeholder="e.g. Zara" />
        </div>
      </div>
      <div>
        <Label htmlFor="notes">Notes</Label>
        <Textarea id="notes" name="notes" defaultValue={item?.notes ?? ""} placeholder="Any notes about this piece…" />
      </div>
      {error && (
        <p className="text-sm text-red-500 bg-red-50 rounded-lg px-3 py-2">{error}</p>
      )}
      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving…" : item ? "Save changes" : "Add to wardrobe"}
        </Button>
        <Button type="button" variant="secondary" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
