"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import type { ClothingItem } from "@prisma/client";

interface ClothingCardProps {
  item: ClothingItem;
  onDelete?: (id: string) => void;
}

export function ClothingCard({ item, onDelete }: ClothingCardProps) {
  const [deleting, setDeleting] = useState(false);

  async function handleDelete(e: React.MouseEvent) {
    e.preventDefault();
    if (!confirm(`Delete "${item.name}"?`)) return;
    setDeleting(true);
    await fetch(`/api/clothing/${item.id}`, { method: "DELETE" });
    onDelete?.(item.id);
  }

  return (
    <Link href={`/wardrobe/${item.id}`} className="group block">
      <div className="bg-white rounded-card shadow-sm border border-blush-100 overflow-hidden hover:shadow-md transition-shadow">
        <div className="relative aspect-square bg-blush-50">
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={item.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl">
              👗
            </div>
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-end justify-end p-2 gap-1 opacity-0 group-hover:opacity-100">
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
          <p className="font-medium text-sm text-gray-800 truncate">{item.name}</p>
          <div className="flex items-center gap-2 mt-1">
            <Badge category={item.category as any} />
            {item.color && (
              <span className="text-xs text-gray-400">{item.color}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
