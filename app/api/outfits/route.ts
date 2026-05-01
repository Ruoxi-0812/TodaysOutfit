import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(_request: Request) {
  const session = await getSession();
  if (!session?.user?.id) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const outfits = await prisma.outfit.findMany({
    where: { userId: session.user.id },
    include: {
      items: {
        include: { clothingItem: true },
      },
      oneOffItems: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return Response.json(outfits);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session?.user?.id) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { name, notes, items, oneOffItems } = body;

  if (!name) return Response.json({ error: "Name is required" }, { status: 400 });

  const outfit = await prisma.outfit.create({
    data: {
      userId: session.user.id,
      name,
      notes: notes || null,
      items: {
        create: (items ?? []).map((clothingItemId: string) => ({ clothingItemId })),
      },
      oneOffItems: {
        create: (oneOffItems ?? []).map((o: { name: string; description?: string }) => ({
          name: o.name,
          description: o.description ?? null,
        })),
      },
    },
    include: {
      items: { include: { clothingItem: true } },
      oneOffItems: true,
    },
  });

  return Response.json(outfit, { status: 201 });
}
