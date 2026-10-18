'use client';

import { useState } from 'react';
import { SearchBox } from '@/components/ui/SearchBox';

export function HeaderSearchTrigger() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open search input"
        className="w-[34px] h-[34px] inline-flex items-center justify-center text-white hover:text-cta rounded-full hover:bg-footer-divider transition-colors focus:outline-none"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 md:w-96 z-50">
          <SearchBox
            autoFocus
            onSelect={() => setIsOpen(false)}
            placeholder="Search reviews and guides..."
          />
        </div>
      )}
    </div>
  );
}
