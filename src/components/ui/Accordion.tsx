'use client';

import { useState } from 'react';

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export function Accordion({ items, className = '' }: AccordionProps) {
  const [openSet, setOpenSet] = useState<Set<number>>(new Set());

  if (!items || items.length === 0) return null;

  const toggle = (idx: number) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
      } else {
        next.add(idx);
      }
      return next;
    });
  };

  return (
    <div className={`divide-y divide-border border-y border-border ${className}`}>
      {items.map((item, idx) => {
        const isOpen = openSet.has(idx);
        return (
          <div key={idx} className="py-4.5 select-none transition-colors">
            <button
              type="button"
              onClick={() => toggle(idx)}
              aria-expanded={isOpen}
              className="flex w-full items-center gap-3 text-left font-bold text-[18px] leading-[26px] md:text-[20px] md:leading-[28px] text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-trust rounded-lg cursor-pointer"
            >
              {/* Triangular arrow matching the screenshot */}
              <span
                className={`text-ink text-[13px] transition-transform duration-200 inline-block ${
                  isOpen ? 'rotate-90' : ''
                }`}
                aria-hidden="true"
              >
                ▶
              </span>
              <span>{item.question}</span>
            </button>
            {isOpen && (
              <div className="mt-3 pl-6 text-[15px] md:text-[16px] leading-[26px] text-muted">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
