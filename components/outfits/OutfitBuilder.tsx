"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { WardrobeItemPicker } from "./WardrobeItemPicker";
import { OneOffItemForm } from "./OneOffItemForm";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import Image from "next/image";
import type {
  ClothingItem,
  Outfit,
  OutfitItem,
  OneOffItem as OneOffItemModel,
} from "@prisma/client";

type OutfitWithItems = Outfit & {
  items: (OutfitItem & { clothingItem: ClothingItem })[];
  oneOffItems: OneOffItemModel[];
};

interface OneOffItem {
  id: string;
  name: string;
  description: string;
}

interface OutfitBuilderProps {
  allWardrobeItems: ClothingItem[];
  outfit?: OutfitWithItems;
}

export function OutfitBuilder({ allWardrobeItems, outfit }: OutfitBuilderProps) {
  const router = useRouter();
  const [name, setName] = useState(outfit?.name ?? "");
  const [notes, setNotes] = useState(outfit?.notes ?? "");
  const [selected, setSelected] = useState<Set<string>>(
    new Set(outfit?.items.map((i) => i.clothingItemId) ?? [])
  );
  const [oneOffItems, setOneOffItems] = useState<OneOffItem[]>(
    outfit?.oneOffItems.map((o) => ({
      id: o.id,
      name: o.name,
      description: o.description ?? "",
    })) ?? []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function toggleItem(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const selectedItems = allWardrobeItems.filter((i) => selected.has(i.id));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return setError("Outfit name is required");
    setLoading(true);
    setError(null);

    const body = {
      name: name.trim(),
      notes: notes.trim() || null,
      items: Array.from(selected),
      oneOffItems: oneOffItems.map(({ name, description }) => ({ name, description })),
    };

    const url = outfit ? `/api/outfits/${outfit.id}` : "/api/outfits";
    const method = outfit ? "PUT" : "POST";

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

    router.push("/outfits");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left: Wardrobe picker */}
        <div className="bg-white rounded-card border border-blush-100 p-5">
          <h2 className="font-semibold text-gray-700 mb-4">Select from wardrobe</h2>
          <WardrobeItemPicker
            allItems={allWardrobeItems}
            selected={selected}
            onToggle={toggleItem}
          />
          {allWardrobeItems.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-8">
              Your wardrobe is empty. Add items first!
            </p>
          )}
        </div>

        {/* Right: Outfit details */}
        <div className="space-y-5">
          <div className="bg-white rounded-card border border-blush-100 p-5 space-y-4">
            <h2 className="font-semibold text-gray-700">Outfit details</h2>
            <div>
              <Label htmlFor="name">Outfit name *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Casual Friday"
                required
              />
            </div>
            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Occasion, weather, mood…"
              />
            </div>
          </div>

          {/* Selected items preview */}
          {selectedItems.length > 0 && (
            <div className="bg-white rounded-card border border-blush-100 p-5">
              <h2 className="font-semibold text-gray-700 mb-3">
                Selected ({selectedItems.length})
              </h2>
              <div className="flex flex-wrap gap-2">
                {selectedItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-1.5 bg-blush-50 rounded-xl px-2 py-1"
                  >
                    {item.imageUrl && (
                      <div className="relative w-6 h-6 rounded overflow-hidden flex-shrink-0">
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="24px"
                        />
                      </div>
                    )}
                    <span className="text-xs text-gray-700 truncate max-w-[100px]">
                      {item.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleItem(item.id)}
                      className="text-gray-400 hover:text-red-500 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* One-off items */}
          <div className="bg-white rounded-card border border-blush-100 p-5">
            <OneOffItemForm items={oneOffItems} onChange={setOneOffItems} />
          </div>

          {error && (
            <p className="text-sm text-red-500 bg-red-50 rounded-lg px-3 py-2">{error}</p>
          )}

          <div className="flex gap-3">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving…" : outfit ? "Save changes" : "Create outfit"}
            </Button>
            <Button type="button" variant="secondary" onClick={() => router.back()}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
