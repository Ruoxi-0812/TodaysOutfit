"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { Outfit, OutfitItem, ClothingItem, OneOffItem } from "@prisma/client";

type OutfitWithItems = Outfit & {
  items: (OutfitItem & { clothingItem: ClothingItem })[];
  oneOffItems: OneOffItem[];
};

interface CalendarEntry {
  id: string;
  date: string;
  outfitId: string;
  outfitName: string;
  thumbnail: string | null;
}

interface OutfitAssignModalProps {
  date: string | null;
  currentEntry: CalendarEntry | null;
  onClose: () => void;
  onAssign: (date: string, entry: CalendarEntry) => void;
  onRemove: (date: string) => void;
}

export function OutfitAssignModal({
  date,
  currentEntry,
  onClose,
  onAssign,
  onRemove,
}: OutfitAssignModalProps) {
  const [outfits, setOutfits] = useState<OutfitWithItems[]>([]);
  const [search, setSearch] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!date) return;
    fetch("/api/outfits")
      .then((r) => r.json())
      .then(setOutfits);
  }, [date]);

  const filtered = outfits.filter((o) =>
    o.name.toLowerCase().includes(search.toLowerCase())
  );

  async function handleSelect(outfit: OutfitWithItems) {
    if (!date) return;
    setSaving(true);
    const res = await fetch(`/api/calendar/${date}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ outfitId: outfit.id }),
    });
    const entry = await res.json();
    onAssign(date, entry);
    setSaving(false);
    onClose();
  }

  async function handleRemove() {
    if (!date) return;
    setSaving(true);
    await fetch(`/api/calendar/${date}`, { method: "DELETE" });
    onRemove(date);
    setSaving(false);
    onClose();
  }

  const photos = (outfit: OutfitWithItems) =>
    outfit.items
      .map((i) => i.clothingItem.imageUrl)
      .filter(Boolean)
      .slice(0, 1) as string[];

  return (
    <Modal
      open={!!date}
      onClose={onClose}
      title={date ? `Outfit for ${new Date(date + "T00:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric" })}` : ""}
    >
      {currentEntry && (
        <div className="mb-4 p-3 bg-blush-50 rounded-xl flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-white">
            {currentEntry.thumbnail ? (
              <Image src={currentEntry.thumbnail} alt="" fill className="object-cover" sizes="40px" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-lg">✨</div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500">Currently wearing</p>
            <p className="text-sm font-medium text-gray-800 truncate">{currentEntry.outfitName}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={handleRemove} disabled={saving}>
            Remove
          </Button>
        </div>
      )}
      <Input
        placeholder="Search outfits…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-3"
      />
      <div className="space-y-2">
        {outfits.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-6">No outfits yet. Create one first!</p>
        )}
        {filtered.map((outfit) => {
          const thumbs = photos(outfit);
          const isActive = currentEntry?.outfitId === outfit.id;
          return (
            <button
              key={outfit.id}
              type="button"
              onClick={() => handleSelect(outfit)}
              disabled={saving}
              className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-colors ${
                isActive
                  ? "border-blush-400 bg-blush-50"
                  : "border-transparent hover:bg-gray-50"
              }`}
            >
              <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-blush-50">
                {thumbs[0] ? (
                  <Image src={thumbs[0]} alt="" fill className="object-cover" sizes="40px" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-lg">✨</div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{outfit.name}</p>
                <p className="text-xs text-gray-400">
                  {outfit.items.length + outfit.oneOffItems.length} pieces
                </p>
              </div>
              {isActive && <span className="text-blush-500 flex-shrink-0">✓</span>}
            </button>
          );
        })}
      </div>
    </Modal>
  );
}
