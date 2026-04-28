"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface OneOffItem {
  id: string;
  name: string;
  description: string;
}

interface OneOffItemFormProps {
  items: OneOffItem[];
  onChange: (items: OneOffItem[]) => void;
}

export function OneOffItemForm({ items, onChange }: OneOffItemFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleAdd() {
    if (!name.trim()) return;
    onChange([
      ...items,
      { id: crypto.randomUUID(), name: name.trim(), description: description.trim() },
    ]);
    setName("");
    setDescription("");
  }

  function handleRemove(id: string) {
    onChange(items.filter((i) => i.id !== id));
  }

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-gray-700">One-off items (not in wardrobe)</p>
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-2 bg-lavender-50 rounded-xl px-3 py-2"
        >
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
            {item.description && (
              <p className="text-xs text-gray-400 truncate">{item.description}</p>
            )}
          </div>
          <button
            type="button"
            onClick={() => handleRemove(item.id)}
            className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
            aria-label="Remove"
          >
            ✕
          </button>
        </div>
      ))}
      <div className="flex gap-2">
        <Input
          placeholder="Item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAdd())}
        />
        <Input
          placeholder="Note (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAdd())}
        />
        <Button type="button" variant="secondary" size="md" onClick={handleAdd}>
          +
        </Button>
      </div>
    </div>
  );
}
