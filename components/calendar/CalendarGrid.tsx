"use client";

import { useState } from "react";
import { DayCell } from "./DayCell";
import { OutfitAssignModal } from "./OutfitAssignModal";

interface CalendarEntry {
  id: string;
  date: string;
  outfitId: string;
  outfitName: string;
  thumbnail: string | null;
}

interface CalendarGridProps {
  initialYear: number;
  initialMonth: number;
  initialEntries: CalendarEntry[];
}

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function CalendarGrid({ initialYear, initialMonth, initialEntries }: CalendarGridProps) {
  const [year, setYear] = useState(initialYear);
  const [month, setMonth] = useState(initialMonth);
  const [entries, setEntries] = useState<CalendarEntry[]>(initialEntries);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedEntry, setSelectedEntry] = useState<CalendarEntry | null>(null);

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  async function navigate(delta: number) {
    let newMonth = month + delta;
    let newYear = year;
    if (newMonth > 12) { newMonth = 1; newYear++; }
    if (newMonth < 1) { newMonth = 12; newYear--; }

    setLoading(true);
    const res = await fetch(`/api/calendar?year=${newYear}&month=${newMonth}`);
    const data = await res.json();
    setEntries(data);
    setYear(newYear);
    setMonth(newMonth);
    setLoading(false);
  }

  const entryMap = new Map(entries.map((e) => [e.date, e]));

  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);
  const startPadding = firstDay.getDay();
  const totalDays = lastDay.getDate();

  const cells: { day: number; date: string; isCurrentMonth: boolean }[] = [];

  const prevLastDay = new Date(year, month - 1, 0).getDate();
  for (let i = startPadding - 1; i >= 0; i--) {
    const d = prevLastDay - i;
    const m = month - 1 === 0 ? 12 : month - 1;
    const y = month - 1 === 0 ? year - 1 : year;
    cells.push({ day: d, date: `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`, isCurrentMonth: false });
  }

  for (let d = 1; d <= totalDays; d++) {
    cells.push({
      day: d,
      date: `${year}-${String(month).padStart(2, "0")}-${String(d).padStart(2, "0")}`,
      isCurrentMonth: true,
    });
  }

  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    const m = month + 1 === 13 ? 1 : month + 1;
    const y = month + 1 === 13 ? year + 1 : year;
    cells.push({ day: d, date: `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`, isCurrentMonth: false });
  }

  const monthName = new Date(year, month - 1).toLocaleString("default", { month: "long" });

  function handleDayClick(date: string, entry: CalendarEntry | null) {
    setSelectedDate(date);
    setSelectedEntry(entry);
  }

  function handleAssign(date: string, entry: CalendarEntry) {
    setEntries((prev) => {
      const next = prev.filter((e) => e.date !== date);
      return [...next, entry];
    });
  }

  function handleRemove(date: string) {
    setEntries((prev) => prev.filter((e) => e.date !== date));
  }

  return (
    <div className="max-w-306.5 mx-auto">
      <div className="bg-warm-cream rounded-[22px] overflow-hidden shadow-xl">
        {/* Month header */}
        <div className="flex items-center justify-between px-10 py-7">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 flex items-center justify-center text-warm-dark hover:text-warm-brown transition-colors text-xl font-bold"
            aria-label="Previous month"
          >
            ‹
          </button>
          <h2 className="font-lora font-bold text-[32px] text-[#333]">{monthName} {year}</h2>
          <button
            onClick={() => navigate(1)}
            className="w-9 h-9 flex items-center justify-center text-warm-dark hover:text-warm-brown transition-colors text-xl font-bold"
            aria-label="Next month"
          >
            ›
          </button>
        </div>

        {/* Day name headers */}
        <div className="grid grid-cols-7 px-6 pb-3">
          {DAYS.map((d) => (
            <div key={d} className="text-center font-lora font-semibold text-[#9b3c3c] text-sm py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div className={`grid grid-cols-7 px-6 pb-8 gap-1 ${loading ? "opacity-50 pointer-events-none" : ""}`}>
          {cells.map(({ day, date, isCurrentMonth }) => (
            <DayCell
              key={date}
              day={day}
              date={date}
              isToday={date === todayStr}
              isCurrentMonth={isCurrentMonth}
              entry={entryMap.get(date)}
              onClick={handleDayClick}
            />
          ))}
        </div>
      </div>

      <OutfitAssignModal
        date={selectedDate}
        currentEntry={selectedEntry}
        onClose={() => { setSelectedDate(null); setSelectedEntry(null); }}
        onAssign={handleAssign}
        onRemove={handleRemove}
      />
    </div>
  );
}
