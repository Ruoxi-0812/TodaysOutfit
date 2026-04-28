"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { OutfitCard } from "@/components/outfits/OutfitCard";
import type { Outfit, OutfitItem, ClothingItem, OneOffItem } from "@prisma/client";

type OutfitWithItems = Outfit & {
  items: (OutfitItem & { clothingItem: ClothingItem })[];
  oneOffItems: OneOffItem[];
};

export default function OutfitsPage() {
  const [outfits, setOutfits] = useState<OutfitWithItems[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/outfits")
      .then((r) => r.json())
      .then((data) => {
        setOutfits(data);
        setLoading(false);
      });
  }, []);

  function handleDelete(id: string) {
    setOutfits((prev) => prev.filter((o) => o.id !== id));
  }

  return (
    <div>
      <PageHeader
        title="My Outfits"
        description={loading ? "" : `${outfits.length} outfit${outfits.length !== 1 ? "s" : ""}`}
        action={
          <Link href="/outfits/new">
            <Button>+ New Outfit</Button>
          </Link>
        }
      />
      {loading ? (
        <div className="text-center py-20 text-gray-400">Loading…</div>
      ) : outfits.length === 0 ? (
        <div className="text-center py-20">
          <span className="text-5xl">✨</span>
          <p className="mt-4 text-gray-500">No outfits yet. Create your first look!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {outfits.map((outfit) => (
            <OutfitCard key={outfit.id} outfit={outfit} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
