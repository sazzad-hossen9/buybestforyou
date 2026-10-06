'use client';

import { useState, useEffect } from 'react';

interface TOCItem {
  id: string;
  label: string;
}

interface TOCProps {
  items: TOCItem[];
}

export function TOC({ items }: TOCProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id || '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -60% 0px',
        threshold: 0.1
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className="p-4 bg-white border border-[#E4E7EB] rounded-[16px] shadow-xs" aria-label="Table of contents">
      <div className="eyebrow text-[#5B6470] mb-3 font-bold tracking-wider">ON THIS PAGE</div>
      <ul className="space-y-2 text-[14px]">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`block py-1 transition-colors ${
                  isActive
                    ? 'font-bold text-[#B84A14] border-l-2 border-[#B84A14] pl-2 -ml-2'
                    : 'text-[#5B6470] hover:text-[#1A1D21] hover:underline'
                }`}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
