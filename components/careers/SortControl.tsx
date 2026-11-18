"use client";

import { SortOption } from "@/lib/filters";

interface SortControlProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export function SortControl({ value, onChange }: SortControlProps) {
  return (
    <div className="flex items-center gap-3">
      <label htmlFor="sort" className="text-sm font-black uppercase text-black">
        SORT:
      </label>
      <select
        id="sort"
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="px-4 py-2 border-4 border-black bg-white text-black font-bold uppercase focus:outline-none focus:border-red-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] cursor-pointer transition-all"
      >
        <option value="relevance">RELEVANCE</option>
        <option value="a-z">A-Z</option>
        <option value="internships-first">INTERNSHIPS FIRST</option>
      </select>
    </div>
  );
}
