import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Category } from "@prisma/client";

export async function GET(request: Request) {
  const session = await getSession();
  if (!session?.user?.id) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") as Category | null;

  const items = await prisma.clothingItem.findMany({
    where: {
      userId: session.user.id,
      ...(category && { category }),
    },
    orderBy: { createdAt: "desc" },
  });

  return Response.json(items);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session?.user?.id) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { name, category, color, brand, notes, imageUrl } = body;

  if (!name || !category) {
    return Response.json({ error: "Name and category are required" }, { status: 400 });
  }

  const item = await prisma.clothingItem.create({
    data: {
      userId: session.user.id,
      name,
      category,
      color: color || null,
      brand: brand || null,
      notes: notes || null,
      imageUrl: imageUrl || null,
    },
  });

  return Response.json(item, { status: 201 });
}
