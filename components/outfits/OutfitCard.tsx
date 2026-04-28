"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Outfit, OutfitItem, ClothingItem, OneOffItem } from "@prisma/client";

type OutfitWithItems = Outfit & {
  items: (OutfitItem & { clothingItem: ClothingItem })[];
  oneOffItems: OneOffItem[];
};

interface OutfitCardProps {
  outfit: OutfitWithItems;
  onDelete?: (id: string) => void;
}

export function OutfitCard({ outfit, onDelete }: OutfitCardProps) {
  const [deleting, setDeleting] = useState(false);
  const photos = outfit.items
    .map((i) => i.clothingItem.imageUrl)
    .filter(Boolean)
    .slice(0, 4) as string[];

  async function handleDelete(e: React.MouseEvent) {
    e.preventDefault();
    if (!confirm(`Delete "${outfit.name}"?`)) return;
    setDeleting(true);
    await fetch(`/api/outfits/${outfit.id}`, { method: "DELETE" });
    onDelete?.(outfit.id);
  }

  const totalItems = outfit.items.length + outfit.oneOffItems.length;

  return (
    <Link href={`/outfits/${outfit.id}`} className="group block">
      <div className="bg-white rounded-card shadow-sm border border-blush-100 overflow-hidden hover:shadow-md transition-shadow">
        <div className="relative aspect-square bg-blush-50">
          {photos.length > 0 ? (
            <div className="grid grid-cols-2 h-full">
              {photos.slice(0, 4).map((url, i) => (
                <div key={i} className="relative overflow-hidden">
                  <Image
                    src={url}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 25vw, 15vw"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl">
              ✨
            </div>
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-end justify-end p-2 opacity-0 group-hover:opacity-100">
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow text-red-500 hover:bg-red-50 transition-colors text-sm"
              aria-label="Delete"
            >
              🗑
            </button>
          </div>
        </div>
        <div className="p-3">
          <p className="font-medium text-sm text-gray-800 truncate">{outfit.name}</p>
          <p className="text-xs text-gray-400 mt-0.5">
            {totalItems} {totalItems === 1 ? "piece" : "pieces"}
          </p>
        </div>
      </div>
    </Link>
  );
}
