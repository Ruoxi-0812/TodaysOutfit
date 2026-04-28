import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { CalendarGrid } from "@/components/calendar/CalendarGrid";

export default async function CalendarPage() {
  const session = await auth();

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0, 23, 59, 59);

  const rawEntries = await prisma.calendarEntry.findMany({
    where: {
      userId: session!.user!.id,
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

  const entries = rawEntries.map((e) => ({
    id: e.id,
    date: e.date.toISOString().split("T")[0],
    outfitId: e.outfitId,
    outfitName: e.outfit.name,
    thumbnail: e.outfit.items[0]?.clothingItem.imageUrl ?? null,
  }));

  return (
    <div className="min-h-screen bg-warm-dark py-14 px-8">
      <CalendarGrid initialYear={year} initialMonth={month} initialEntries={entries} />
    </div>
  );
}
