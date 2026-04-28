"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

const categories = [
  { value: "", label: "All" },
  { value: "TOPS", label: "Tops" },
  { value: "BOTTOMS", label: "Bottoms" },
  { value: "DRESSES", label: "Dresses" },
  { value: "OUTERWEAR", label: "Outerwear" },
  { value: "SHOES", label: "Shoes" },
  { value: "BAGS", label: "Bags" },
  { value: "JEWELRY", label: "Jewelry" },
  { value: "ACCESSORIES", label: "Accessories" },
];

export function CategoryFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = searchParams.get("category") ?? "";

  function select(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("category", value);
    } else {
      params.delete("category");
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {categories.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => select(value)}
          className={`flex-shrink-0 px-4 py-1.5 rounded-btn text-sm font-medium transition-colors ${
            current === value
              ? "bg-blush-500 text-white shadow-sm"
              : "bg-white text-gray-600 border border-blush-200 hover:bg-blush-50"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
