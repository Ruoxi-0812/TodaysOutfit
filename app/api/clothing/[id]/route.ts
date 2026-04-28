import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const item = await prisma.clothingItem.findFirst({
    where: { id, userId: session.user.id },
  });

  if (!item) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(item);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await request.json();
  const { name, category, color, brand, notes, imageUrl } = body;

  const existing = await prisma.clothingItem.findFirst({
    where: { id, userId: session.user.id },
  });
  if (!existing) return Response.json({ error: "Not found" }, { status: 404 });

  const updated = await prisma.clothingItem.update({
    where: { id },
    data: {
      name: name ?? existing.name,
      category: category ?? existing.category,
      color: color !== undefined ? color || null : existing.color,
      brand: brand !== undefined ? brand || null : existing.brand,
      notes: notes !== undefined ? notes || null : existing.notes,
      imageUrl: imageUrl !== undefined ? imageUrl || null : existing.imageUrl,
    },
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
  const existing = await prisma.clothingItem.findFirst({
    where: { id, userId: session.user.id },
  });
  if (!existing) return Response.json({ error: "Not found" }, { status: 404 });

  await prisma.clothingItem.delete({ where: { id } });
  return Response.json({ ok: true });
}
