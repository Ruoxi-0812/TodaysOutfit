import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/layout/PageHeader";
import { OutfitBuilder } from "@/components/outfits/OutfitBuilder";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditOutfitPage({ params }: PageProps) {
  const session = await auth();
  const { id } = await params;

  const [outfit, wardrobeItems] = await Promise.all([
    prisma.outfit.findFirst({
      where: { id, userId: session!.user!.id },
      include: {
        items: { include: { clothingItem: true } },
        oneOffItems: true,
      },
    }),
    prisma.clothingItem.findMany({
      where: { userId: session!.user!.id },
      orderBy: [{ category: "asc" }, { name: "asc" }],
    }),
  ]);

  if (!outfit) notFound();

  return (
    <div>
      <PageHeader title="Edit Outfit" description={outfit.name} />
      <OutfitBuilder allWardrobeItems={wardrobeItems} outfit={outfit} />
    </div>
  );
}
