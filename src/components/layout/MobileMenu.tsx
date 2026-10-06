'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { NavItem } from '@/types';
import { SearchBox } from '@/components/ui/SearchBox';

interface MobileMenuProps {
  items: NavItem[];
}

export function MobileMenu({ items }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="flex items-center gap-2 lg:hidden">
      {/* Search Toggle Icon */}
      <button
        type="button"
        onClick={() => setShowSearch(!showSearch)}
        aria-label="Toggle search bar"
        className="p-2 text-white/90 hover:text-white rounded-lg focus:outline-none"
      >
        <svg
          width="21"
          height="21"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>

      {/* Hamburger Toggle */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
        className="p-2 text-white/90 hover:text-white rounded-lg focus:outline-none"
      >
        {isOpen ? (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" y1="7" x2="20" y2="7" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="17" x2="20" y2="17" />
          </svg>
        )}
      </button>

      {/* Mobile Search Overlay Bar */}
      {showSearch && (
        <div className="absolute left-0 right-0 top-full bg-[#1A1D21] border-b border-white/10 p-4 z-50">
          <SearchBox
            autoFocus
            onSelect={() => setShowSearch(false)}
            placeholder="Search reviews and guides..."
          />
        </div>
      )}

      {/* Mobile Drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 top-[60px] bg-[#1A1D21]/95 backdrop-blur-md z-40 flex flex-col p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="mb-6">
            <SearchBox onSelect={() => setIsOpen(false)} />
          </div>

          <nav className="flex flex-col space-y-3">
            {items.map((item, idx) => (
              <div key={idx} className="border-b border-white/10 pb-2">
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-[18px] font-semibold text-white py-1 hover:text-[#B84A14] transition-colors"
                >
                  {item.name}
                </Link>
                {item.dropdownItems && item.dropdownItems.length > 0 && (
                  <div className="pl-4 mt-1 space-y-1">
                    {item.dropdownItems.map((sub, sIdx) => (
                      <Link
                        key={sIdx}
                        href={sub.href}
                        onClick={() => setIsOpen(false)}
                        className="block text-[14px] text-[#B4BBC4] py-1 hover:text-white"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="mt-8 pt-4 border-t border-white/10 text-xs text-[#B4BBC4]">
            <p>Independent buying guides and evidence-backed reviews.</p>
          </div>
        </div>
      )}
    </div>
  );
}
