import { HTMLAttributes } from "react";

type Category =
  | "TOPS"
  | "BOTTOMS"
  | "DRESSES"
  | "OUTERWEAR"
  | "SHOES"
  | "BAGS"
  | "JEWELRY"
  | "ACCESSORIES";

const categoryColors: Record<Category, string> = {
  TOPS: "bg-blush-100 text-blush-600",
  BOTTOMS: "bg-lavender-100 text-lavender-600",
  DRESSES: "bg-rose-100 text-rose-600",
  OUTERWEAR: "bg-peach-100 text-peach-400",
  SHOES: "bg-yellow-100 text-yellow-700",
  BAGS: "bg-green-100 text-green-700",
  JEWELRY: "bg-sky-100 text-sky-600",
  ACCESSORIES: "bg-pink-100 text-pink-600",
};

const categoryLabels: Record<Category, string> = {
  TOPS: "Tops",
  BOTTOMS: "Bottoms",
  DRESSES: "Dresses",
  OUTERWEAR: "Outerwear",
  SHOES: "Shoes",
  BAGS: "Bags",
  JEWELRY: "Jewelry",
  ACCESSORIES: "Accessories",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  category?: Category;
}

export function Badge({ category, className = "", children, ...props }: BadgeProps) {
  const colorClass = category ? categoryColors[category] : "bg-gray-100 text-gray-600";
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-btn text-xs font-medium ${colorClass} ${className}`}
      {...props}
    >
      {category ? categoryLabels[category] : children}
    </span>
  );
}
