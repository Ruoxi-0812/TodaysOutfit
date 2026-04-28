import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const year = parseInt(searchParams.get("year") ?? String(new Date().getFullYear()));
  const month = parseInt(searchParams.get("month") ?? String(new Date().getMonth() + 1));

  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0, 23, 59, 59);

  const entries = await prisma.calendarEntry.findMany({
    where: {
      userId: session.user.id,
      date: { gte: start, lte: end },
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
    orderBy: { date: "asc" },
  });

  return Response.json(
    entries.map((e) => ({
      id: e.id,
      date: e.date.toISOString().split("T")[0],
      outfitId: e.outfitId,
      outfitName: e.outfit.name,
      thumbnail: e.outfit.items[0]?.clothingItem.imageUrl ?? null,
    }))
  );
}
