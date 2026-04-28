"use client";

import { useState } from "react";
import { ClothingCard } from "./ClothingCard";
import type { ClothingItem } from "@prisma/client";

interface ClothingGridProps {
  initialItems: ClothingItem[];
}

export function ClothingGrid({ initialItems }: ClothingGridProps) {
  const [items, setItems] = useState(initialItems);

  function handleDelete(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <span className="text-5xl">👗</span>
        <p className="mt-4 text-gray-500">No items yet. Add your first piece!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <ClothingCard key={item.id} item={item} onDelete={handleDelete} />
      ))}
    </div>
  );
}
