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
          className={`inline-flex items-center gap-1.5 h-[34px] text-[15px] font-semibold transition-colors ${
            isActive
              ? 'text-white border-b-2 border-nav-active'
              : 'text-white hover:text-white/85'
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
          <div className="bg-ink border border-footer-divider rounded-[var(--r-card)] shadow-[var(--sh-dropdown)] py-2 overflow-hidden backdrop-blur-md">
            <Link
              href={href}
              className="flex items-center justify-between px-4 py-2.5 text-[length:var(--fs-caption)] leading-[var(--lh-caption)] font-semibold text-white hover:bg-footer-divider transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <span>All {name} Guides</span>
              <span className="text-[length:var(--fs-eyebrow)] leading-[var(--lh-eyebrow)] tracking-[var(--ls-eyebrow)] text-on-ink">→</span>
            </Link>
            <div className="h-px bg-footer-divider my-1" />
            {items.map((sub, idx) => (
              <Link
                key={idx}
                href={sub.href}
                className="flex items-center justify-between px-4 py-2 text-[13.5px] text-on-ink hover:text-white hover:bg-footer-divider transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <span>{sub.name}</span>
                {sub.count !== undefined && (
                  <span className="text-[11.5px] px-2 py-0.5 rounded-full bg-footer-divider text-on-ink">
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
