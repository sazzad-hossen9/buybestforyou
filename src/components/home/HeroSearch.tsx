'use client';

import Link from 'next/link';
import { SearchBox } from '@/components/ui/SearchBox';

const POPULAR_SEARCHES = [
  { label: 'Paint pens', query: 'paint pen' },
  { label: 'Dash cams', query: 'dash cam' },
  { label: 'Robot vacuums', query: 'robot vacuum' },
  { label: 'Adjustable dumbbells', query: 'dumbbell' },
];

export function HeroSearch() {
  return (
    <div className="space-y-4 pt-2">
      <SearchBox placeholder="What are you shopping for? e.g. paint pen" />

      {/* Popular Chips */}
      <div className="flex items-center flex-wrap gap-2 text-[13px] md:text-[14px]">
        <span className="text-[#5B6470] font-medium mr-1 select-none">Popular:</span>
        {POPULAR_SEARCHES.map((chip, idx) => (
          <Link
            key={idx}
            href={`/search?q=${encodeURIComponent(chip.query)}`}
            className="inline-flex items-center px-3 py-1 rounded-full border border-[#E4E7EB] bg-white text-[#5B6470] hover:text-[#1A1D21] hover:border-[#8A929C] transition-colors"
          >
            {chip.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
