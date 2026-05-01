import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Category } from "@prisma/client";
import { ClothingGrid } from "@/components/wardrobe/ClothingGrid";
import { CategoryFilter } from "@/components/wardrobe/CategoryFilter";

interface WardrobePageProps {
  searchParams: Promise<{ category?: string }>;
}

const MAIN_CATEGORIES: { value: Category; label: string }[] = [
  { value: "TOPS", label: "TOPS" },
  { value: "BOTTOMS", label: "BOTTOMS" },
  { value: "DRESSES", label: "DRESSES" },
  { value: "SHOES", label: "SHOES" },
  { value: "ACCESSORIES", label: "ACCESSORIES" },
];

export default async function WardrobePage({ searchParams }: WardrobePageProps) {
  const session = await getSession();
  const { category } = await searchParams;

  const validCategory =
    category && Object.values(Category).includes(category as Category)
      ? (category as Category)
      : undefined;

  const [items, categoryRepresentatives] = await Promise.all([
    prisma.clothingItem.findMany({
      where: {
        userId: session!.user!.id,
        ...(validCategory && { category: validCategory }),
      },
      orderBy: { createdAt: "desc" },
    }),
    Promise.all(
      MAIN_CATEGORIES.map(({ value }) =>
        prisma.clothingItem.findFirst({
          where: { userId: session!.user!.id, category: value },
          orderBy: { createdAt: "desc" },
          select: { imageUrl: true },
        })
      )
    ),
  ]);

  return (
    <div className="min-h-screen bg-warm-gray">
      {/* Hero section */}
      <div className="px-16 pt-16 pb-10">
        <h1 className="font-lora font-bold text-[48px] text-warm-dark text-center tracking-wide mb-3">
          MY WARDROBE
        </h1>
        <p className="font-montserrat font-semibold text-xl text-warm-dark/70 text-center mb-12">
          Keep your closet organized. Upload items and choose by category or filters.
        </p>

        <div className="flex items-start gap-8">
          {/* Left action buttons */}
          <div className="flex flex-col gap-4 shrink-0 pt-16">
            <Link
              href="/outfits"
              className="flex items-center justify-center px-6 py-3 bg-warm-dark text-white font-montserrat font-semibold text-lg rounded-[21px] w-44 hover:bg-warm-brown transition-colors"
            >
              My Outfits
            </Link>
            <Link
              href="/outfits/new"
              className="flex items-center justify-center px-6 py-3 bg-warm-dark text-white font-montserrat font-semibold text-lg rounded-[21px] w-44 hover:bg-warm-brown transition-colors"
            >
              DIY Outfit
            </Link>
            <Link
              href="/wardrobe/new"
              className="flex items-center justify-center px-6 py-3 bg-warm-dark text-white font-montserrat font-semibold text-lg rounded-[21px] w-44 hover:bg-warm-brown transition-colors"
            >
              Upload
            </Link>
          </div>

          {/* Category circles */}
          <div className="flex-1 flex items-start justify-center gap-8 flex-wrap">
            {MAIN_CATEGORIES.map(({ value, label }, idx) => {
              const rep = categoryRepresentatives[idx];
              const isActive = validCategory === value;
              return (
                <Link
                  key={value}
                  href={isActive ? "/wardrobe" : `/wardrobe?category=${value}`}
                  className="flex flex-col items-center gap-3 group"
                >
                  <div
                    className={`w-54.5 h-54.5 rounded-full overflow-hidden bg-white flex items-center justify-center transition-all ${
                      isActive ? "ring-4 ring-warm-dark" : "hover:ring-2 hover:ring-warm-brown"
                    }`}
                  >
                    {rep?.imageUrl ? (
                      <Image
                        src={rep.imageUrl}
                        alt={label}
                        width={220}
                        height={220}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-warm-dark/30 text-4xl font-lora font-bold">
                        {label[0]}
                      </span>
                    )}
                  </div>
                  <span
                    className={`font-lora font-semibold text-[28px] tracking-tight ${
                      isActive ? "text-warm-dark" : "text-black"
                    }`}
                  >
                    {label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* All categories filter + grid */}
      <div className="px-16 pb-16">
        <div className="mb-6">
          <Suspense>
            <CategoryFilter />
          </Suspense>
        </div>
        <ClothingGrid initialItems={items} />
      </div>
    </div>
  );
}
