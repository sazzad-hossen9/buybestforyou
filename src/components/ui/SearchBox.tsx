'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { SearchIndexItem } from '@/types';

interface SearchBoxProps {
  placeholder?: string;
  initialQuery?: string;
  autoFocus?: boolean;
  onSelect?: () => void;
  className?: string;
}

export function SearchBox({
  placeholder = 'What are you shopping for? e.g. paint pen',
  initialQuery = '',
  autoFocus = false,
  onSelect,
  className = ''
}: SearchBoxProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchIndexItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [indexData, setIndexData] = useState<SearchIndexItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load search index once on client
  useEffect(() => {
    fetch('/data/search-index.json')
      .then((res) => res.json())
      .then((data: SearchIndexItem[]) => setIndexData(data))
      .catch((err) => console.error('Failed to load search index', err));
  }, []);

  // Debounced search logic (300ms)
  useEffect(() => {
    const handler = setTimeout(() => {
      if (!query.trim()) {
        setResults([]);
        setIsOpen(false);
        return;
      }

      const q = query.toLowerCase().trim();
      const matched = indexData.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.categoryName.toLowerCase().includes(q) ||
          item.excerpt.toLowerCase().includes(q)
      );
      setResults(matched.slice(0, 6));
      setIsOpen(true);
      setSelectedIndex(-1);
    }, query.trim() ? 300 : 0);

    return () => clearTimeout(handler);
  }, [query, indexData]);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsOpen(false);
    if (onSelect) onSelect();
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter' && selectedIndex >= 0 && results[selectedIndex]) {
      e.preventDefault();
      setIsOpen(false);
      if (onSelect) onSelect();
      router.push(results[selectedIndex].url);
    }
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.trim() && setIsOpen(true)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="w-full bg-white border border-[#8A929C] focus:border-[#2B5D7C] focus:ring-2 focus:ring-[#2B5D7C]/20 rounded-full py-2.5 sm:py-3 pl-4 sm:pl-5 pr-22 sm:pr-28 text-[14px] sm:text-[15px] md:text-[16px] text-[#1A1D21] placeholder-[#5B6470] outline-none shadow-sm transition-all"
        />
        <button
          type="submit"
          className="absolute right-1.5 bg-[#B84A14] hover:bg-[#9E3F10] text-white px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full font-semibold text-[13px] md:text-[15px] transition-colors select-none"
        >
          Search
        </button>
      </form>

      {/* Autocomplete Dropdown */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-[#E4E7EB] py-2 z-50 overflow-hidden">
          {results.length > 0 ? (
            <div className="divide-y divide-[#F1F3F5]">
              {results.map((item, idx) => (
                <Link
                  key={item.id}
                  href={item.url}
                  onClick={() => {
                    setIsOpen(false);
                    if (onSelect) onSelect();
                  }}
                  className={`flex items-start gap-3 px-4 py-3 hover:bg-[#F6F7F9] transition-colors text-left ${
                    selectedIndex === idx ? 'bg-[#F6F7F9]' : ''
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0"
                    style={{ backgroundColor: item.categoryDot || '#2B5D7C' }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-bold text-[#1A1D21] truncate">
                      {item.title}
                    </p>
                    <p className="text-[12.5px] text-[#5B6470] truncate">
                      {item.excerpt}
                    </p>
                  </div>
                  {item.score && (
                    <span className="shrink-0 text-[12px] font-bold bg-[#E8F2EB] text-[#007A58] px-2 py-0.5 rounded-full">
                      {item.score.toFixed(1)}
                    </span>
                  )}
                </Link>
              ))}
              <div className="p-2 text-center bg-[#F9FAFB]">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="text-[13px] font-semibold text-[#2B5D7C] hover:underline"
                >
                  See all results for &quot;{query}&quot; →
                </button>
              </div>
            </div>
          ) : (
            <div className="px-4 py-6 text-center text-[#5B6470] text-[14px]">
              No results found for &quot;<span className="font-semibold">{query}</span>&quot;
            </div>
          )}
        </div>
      )}
    </div>
  );
}
