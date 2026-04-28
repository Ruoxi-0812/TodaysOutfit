import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ date: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { date } = await params;
  const { outfitId } = await request.json();

  if (!outfitId) return Response.json({ error: "outfitId required" }, { status: 400 });

  const outfit = await prisma.outfit.findFirst({
    where: { id: outfitId, userId: session.user.id },
  });
  if (!outfit) return Response.json({ error: "Outfit not found" }, { status: 404 });

  const entry = await prisma.calendarEntry.upsert({
    where: {
      userId_date: {
        userId: session.user.id,
        date: new Date(date),
      },
    },
    update: { outfitId },
    create: {
      userId: session.user.id,
      date: new Date(date),
      outfitId,
    },
    include: {
      outfit: {
        include: {
          items: {
            take: 1,
            include: { clothingItem: { select: { imageUrl: true } } },
          },
        },
      },
    },
  });

  return Response.json({
    id: entry.id,
    date,
    outfitId: entry.outfitId,
    outfitName: entry.outfit.name,
    thumbnail: entry.outfit.items[0]?.clothingItem.imageUrl ?? null,
  });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ date: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { date } = await params;

  await prisma.calendarEntry.deleteMany({
    where: {
      userId: session.user.id,
      date: new Date(date),
    },
  });

  return Response.json({ ok: true });
}
