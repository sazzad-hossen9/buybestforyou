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
    const handleScroll = () => {
      // Offset for sticky header (64px) + disclosure bar (40px) + margin
      const scrollPos = window.scrollY + 130;
      let currentId = items[0]?.id || '';

      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (top <= scrollPos) {
            currentId = item.id;
          }
        }
      }
      setActiveId(currentId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const offset = 120;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveId(id);
      window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <nav className="text-[length:var(--fs-caption)] leading-[var(--lh-caption)]" aria-label="On this page">
      <div className="text-[length:var(--fs-eyebrow)] leading-[var(--lh-eyebrow)] tracking-[var(--ls-eyebrow)] font-bold uppercase tracking-wider text-ink mb-3">
        ON THIS PAGE
      </div>
      <ul className="space-y-2.5 border-l border-border pl-3.5">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id} className="relative">
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={`block leading-snug transition-colors ${
                  isActive
                    ? 'font-bold text-ink -ml-[15px] pl-[13px] border-l-2 border-ink'
                    : 'text-muted hover:text-ink'
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
