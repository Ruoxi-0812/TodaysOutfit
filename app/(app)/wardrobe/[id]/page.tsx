import { notFound } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/layout/PageHeader";
import { ClothingForm } from "@/components/wardrobe/ClothingForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditClothingItemPage({ params }: PageProps) {
  const session = await getSession();
  const { id } = await params;

  const item = await prisma.clothingItem.findFirst({
    where: { id, userId: session!.user!.id },
  });

  if (!item) notFound();

  return (
    <div>
      <PageHeader title="Edit Item" description={item.name} />
      <ClothingForm item={item} />
    </div>
  );
}
