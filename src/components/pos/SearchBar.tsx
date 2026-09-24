"use client";

import { Search } from "lucide-react";
import type { ProductCategory } from "@/data/mockProducts";

export type CategoryFilter = "all" | ProductCategory;

const CATEGORIES: { id: CategoryFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "beverages", label: "Beverages" },
  { id: "packaged-goods", label: "Packaged Goods" },
];

interface SearchBarProps {
  query: string;
  category: CategoryFilter;
  onQueryChange: (query: string) => void;
  onCategoryChange: (category: CategoryFilter) => void;
}

export default function SearchBar({
  query,
  category,
  onQueryChange,
  onCategoryChange,
}: SearchBarProps) {
  return (
    <div className="flex flex-col gap-3">
      <label className="relative block">
        <span className="sr-only">Search products</span>
        <Search
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400"
          aria-hidden
        />
        <input
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search products…"
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white pl-10 pr-3 text-sm text-zinc-900 outline-none ring-emerald-500/40 placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-2"
        />
      </label>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {CATEGORIES.map((item) => {
          const isActive = category === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onCategoryChange(item.id)}
              className={`h-9 shrink-0 rounded-full px-3.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-emerald-700 text-white"
                  : "bg-white text-zinc-600 ring-1 ring-zinc-200 hover:bg-zinc-50"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
