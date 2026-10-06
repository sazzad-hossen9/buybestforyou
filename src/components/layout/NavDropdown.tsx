'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import type { NavDropdownItem } from '@/types';

interface NavDropdownProps {
  name: string;
  href: string;
  items?: NavDropdownItem[];
  isActive?: boolean;
}

export function NavDropdown({ name, href, items = [], isActive = false }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="flex items-center">
        <Link
          href={href}
          className={`inline-flex items-center gap-1.5 py-4 text-[15px] font-medium transition-colors ${
            isActive
              ? 'text-white border-b-2 border-[#B84A14] -mb-[2px]'
              : 'text-[#E4E7EB] hover:text-white'
          }`}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <span>{name}</span>
          {items.length > 0 && (
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              className={`transition-transform duration-200 opacity-70 ${isOpen ? 'rotate-180' : ''}`}
              aria-hidden="true"
            >
              <path
                d="M2.5 4.5L6 8L9.5 4.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </Link>
      </div>

      {/* Dropdown Menu */}
      {items.length > 0 && isOpen && (
        <div
          className="absolute left-0 top-full pt-1 z-50 min-w-[240px] animate-in fade-in slide-in-from-top-1 duration-150"
          role="menu"
        >
          <div className="bg-[#1A1D21] border border-white/10 rounded-2xl shadow-2xl py-2 overflow-hidden backdrop-blur-md">
            <Link
              href={href}
              className="flex items-center justify-between px-4 py-2.5 text-[14px] font-semibold text-white hover:bg-white/10 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <span>All {name} Guides</span>
              <span className="text-[12px] text-[#B4BBC4]">→</span>
            </Link>
            <div className="h-px bg-white/10 my-1" />
            {items.map((sub, idx) => (
              <Link
                key={idx}
                href={sub.href}
                className="flex items-center justify-between px-4 py-2 text-[13.5px] text-[#B4BBC4] hover:text-white hover:bg-white/10 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <span>{sub.name}</span>
                {sub.count !== undefined && (
                  <span className="text-[11.5px] px-2 py-0.5 rounded-full bg-white/10 text-white/80">
                    {sub.count}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
