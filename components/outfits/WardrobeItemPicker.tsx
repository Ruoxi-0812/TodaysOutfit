"use client";

import Image from "next/image";
import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import type { ClothingItem } from "@prisma/client";

interface WardrobeItemPickerProps {
  allItems: ClothingItem[];
  selected: Set<string>;
  onToggle: (id: string) => void;
}

export function WardrobeItemPicker({ allItems, selected, onToggle }: WardrobeItemPickerProps) {
  const [search, setSearch] = useState("");

  const filtered = allItems.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase()) ||
      (item.brand ?? "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-3">
      <Input
        placeholder="Search your wardrobe…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
        {filtered.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-4">No items found</p>
        )}
        {filtered.map((item) => {
          const isSelected = selected.has(item.id);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onToggle(item.id)}
              className={`w-full flex items-center gap-3 p-2 rounded-xl border text-left transition-colors ${
                isSelected
                  ? "border-blush-400 bg-blush-50"
                  : "border-transparent hover:bg-gray-50"
              }`}
            >
              <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-blush-50">
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xl">
                    👗
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
                <Badge category={item.category as any} />
              </div>
              {isSelected && (
                <span className="text-blush-500 flex-shrink-0">✓</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
