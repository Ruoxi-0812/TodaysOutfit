import Image from "next/image";

interface CalendarEntry {
  id: string;
  date: string;
  outfitId: string;
  outfitName: string;
  thumbnail: string | null;
}

interface DayCellProps {
  day: number;
  date: string;
  isToday: boolean;
  isCurrentMonth: boolean;
  entry?: CalendarEntry;
  onClick: (date: string, entry: CalendarEntry | null) => void;
}

export function DayCell({ day, date, isToday, isCurrentMonth, entry, onClick }: DayCellProps) {
  return (
    <button
      type="button"
      onClick={() => onClick(date, entry ?? null)}
      className={`relative min-h-22.5 p-2 text-left transition-all hover:bg-warm-gray/30 rounded-lg ${
        !isCurrentMonth ? "opacity-30" : ""
      }`}
    >
      <span
        className={`font-lora font-bold text-[22px] block mb-1 leading-none ${
          isToday
            ? "w-10 h-10 bg-warm-dark text-white rounded-full flex items-center justify-center text-lg"
            : "text-[#333]"
        }`}
      >
        {day}
      </span>
      {entry && (
        <div className="mt-1">
          {entry.thumbnail ? (
            <div className="relative w-full aspect-square rounded overflow-hidden">
              <Image
                src={entry.thumbnail}
                alt={entry.outfitName}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 14vw, 10vw"
              />
            </div>
          ) : (
            <div className="w-full aspect-square rounded bg-warm-gray flex items-center justify-center text-sm">
              ✨
            </div>
          )}
        </div>
      )}
    </button>
  );
}
