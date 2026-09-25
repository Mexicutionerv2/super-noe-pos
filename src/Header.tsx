'use client';

import { Search } from 'lucide-react';
import type { Category } from '@/types/pos';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: Category;
  setSelectedCategory: (category: Category) => void;
}

const CATEGORIES: Category[] = ['Bebidas', 'Pan Dulce', 'Pastelitos', 'Todos'];

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F5D4E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFCF7]';

export default function Header({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-[#DCD3C0] bg-[#FFFCF7]/95 px-4 py-3 backdrop-blur sm:px-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#2B2118]/40"
            strokeWidth={2}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search products..."
            aria-label="Search products"
            className={`w-full rounded-full border border-[#DCD3C0] bg-white py-2 pl-9 pr-3 text-sm text-[#2B2118] placeholder:text-[#2B2118]/40 ${FOCUS_RING}`}
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0" role="group" aria-label="Filter by category">
          {CATEGORIES.map((category) => {
            const isActive = category === selectedCategory;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                aria-pressed={isActive}
                className={`shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${FOCUS_RING} ${
                  isActive
                    ? 'border-[#2B2118] bg-[#2B2118] text-[#FFFCF7]'
                    : 'border-[#DCD3C0] bg-transparent text-[#2B2118]/70 hover:border-[#2B2118]/40'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
