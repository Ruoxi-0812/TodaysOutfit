import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const outfit = await prisma.outfit.findFirst({
    where: { id, userId: session.user.id },
    include: {
      items: { include: { clothingItem: true } },
      oneOffItems: true,
    },
  });

  if (!outfit) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(outfit);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const existing = await prisma.outfit.findFirst({ where: { id, userId: session.user.id } });
  if (!existing) return Response.json({ error: "Not found" }, { status: 404 });

  const body = await request.json();
  const { name, notes, items, oneOffItems } = body;

  const updated = await prisma.$transaction(async (tx) => {
    await tx.outfitItem.deleteMany({ where: { outfitId: id } });
    await tx.oneOffItem.deleteMany({ where: { outfitId: id } });

    return tx.outfit.update({
      where: { id },
      data: {
        name: name ?? existing.name,
        notes: notes !== undefined ? notes || null : existing.notes,
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
  });

  return Response.json(updated);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const existing = await prisma.outfit.findFirst({ where: { id, userId: session.user.id } });
  if (!existing) return Response.json({ error: "Not found" }, { status: 404 });

  await prisma.outfit.delete({ where: { id } });
  return Response.json({ ok: true });
}
