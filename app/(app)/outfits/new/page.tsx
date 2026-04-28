import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/layout/PageHeader";
import { OutfitBuilder } from "@/components/outfits/OutfitBuilder";

export default async function NewOutfitPage() {
  const session = await auth();

  const wardrobeItems = await prisma.clothingItem.findMany({
    where: { userId: session!.user!.id },
    orderBy: [{ category: "asc" }, { name: "asc" }],
  });

  return (
    <div>
      <PageHeader title="Create Outfit" description="Mix and match your wardrobe" />
      <OutfitBuilder allWardrobeItems={wardrobeItems} />
    </div>
  );
}
