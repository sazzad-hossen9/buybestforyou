'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { SafeImage } from '@/components/ui/SafeImage';
import { EmptyState } from '@/components/ui/EmptyState';
import type { ReviewRoundup, SubcategoryMeta } from '@/types';

interface CategoryListingProps {
  initialGuides: ReviewRoundup[];
  subcategories: SubcategoryMeta[];
  categoryName: string;
}

export function CategoryListing({
  initialGuides,
  subcategories,
  categoryName,
}: CategoryListingProps) {
  const [selectedSubs, setSelectedSubs] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'newest' | 'rating' | 'popular'>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // Toggle subcategory filter
  const handleSubToggle = (name: string) => {
    setSelectedSubs((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
    );
    setCurrentPage(1);
  };

  // Toggle guide type filter
  const handleTypeToggle = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSelectedSubs([]);
    setSelectedTypes([]);
    setCurrentPage(1);
  };

  // Filtering
  const filteredGuides = useMemo(() => {
    return initialGuides.filter((guide) => {
      if (selectedSubs.length > 0 && !selectedSubs.includes(guide.subcategoryName)) {
        return false;
      }
      if (selectedTypes.length > 0 && !selectedTypes.includes(guide.guideType)) {
        return false;
      }
      return true;
    });
  }, [initialGuides, selectedSubs, selectedTypes]);

  // Sorting
  const sortedGuides = useMemo(() => {
    const list = [...filteredGuides];
    if (sortBy === 'newest') {
      return list;
    }
    return list;
  }, [filteredGuides, sortBy]);

  // Pagination
  const totalItems = sortedGuides.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const currentGuides = sortedGuides.slice(startIndex, startIndex + pageSize);

  const guideTypes = ['Roundup', 'Single review', 'Buying guide'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[274px_1fr] gap-6">
      {/* Left Filter Sidebar */}
      <aside className="w-full h-full">
        <div className="lg:sticky lg:top-[calc(var(--header-total-height,109px)+1.5rem)] space-y-6 bg-white p-5 rounded-2xl border border-border">
          {/* Subcategory Checkboxes */}
          <div>
            <h4 className="font-bold text-[15px] text-ink mb-3">Subcategory</h4>
            <div className="space-y-2.5">
              {subcategories.map((sub, idx) => {
                const isChecked = selectedSubs.includes(sub.name);
                return (
                  <label
                    key={idx}
                    className="flex items-center justify-between text-[14px] text-ink cursor-pointer select-none hover:text-trust"
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleSubToggle(sub.name)}
                        className="w-4.5 h-4.5 rounded border border-border-input accent-trust cursor-pointer"
                      />
                      <span>{sub.name}</span>
                    </div>
                    <span className="text-[12.5px] text-muted">{sub.count}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Guide Type Checkboxes */}
          <div className="pt-4 border-t border-border">
            <h4 className="font-bold text-[15px] text-ink mb-3">Guide type</h4>
            <div className="space-y-2.5">
              {guideTypes.map((type, idx) => {
                const isChecked = selectedTypes.includes(type);
                return (
                  <label
                    key={idx}
                    className="flex items-center gap-2.5 text-[14px] text-ink cursor-pointer select-none hover:text-trust"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleTypeToggle(type)}
                      className="w-4.5 h-4.5 rounded border border-border-input accent-trust cursor-pointer"
                    />
                    <span>{type}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Clear Filters Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleClearFilters}
              className="w-full py-2.5 px-4 rounded-xl border border-border-input text-[14px] font-semibold text-ink hover:bg-surface-muted transition-colors whitespace-nowrap cursor-pointer"
            >
              Clear filters
            </button>
          </div>
        </div>
      </aside>

      {/* Right Guide Grid */}
      <div className="w-full space-y-6 min-w-0">
        {/* Counter and Sort Dropdown Bar */}
        <div className="flex items-center justify-between">
          <p className="text-[14.5px] font-semibold text-ink">
            Showing {Math.min(currentGuides.length, pageSize)} of {totalItems} guides
          </p>

          <div className="flex items-center gap-2">
            <span className="text-[14px] text-muted">Sort by</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'rating' | 'popular')}
              className="py-1.5 px-3 rounded-lg border border-border-input text-[13.5px] bg-white text-ink font-medium outline-none focus:ring-1 focus:ring-trust cursor-pointer"
            >
              <option value="newest">Newest</option>
              <option value="rating">Highest Rated</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>

        {/* Guides Grid (3x2) */}
        {currentGuides.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentGuides.map((guide) => (
              <div
                key={guide.slug}
                className="bg-surface border border-border rounded-[var(--r-card)] overflow-hidden shadow-[var(--sh-card)] flex flex-col justify-between hover:shadow-[var(--sh-card-hover)] transition-all duration-200"
              >
                {/* Full-bleed top image 150px */}
                <div className="relative w-full h-[150px] overflow-hidden bg-tint-light">
                  <SafeImage
                    src={guide.featuredImage}
                    alt={guide.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 350px"
                    className="object-cover"
                  />
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-[12px] font-semibold text-muted mb-1">
                      {guide.categoryName || categoryName}
                    </p>

                    <h3 className="text-[length:var(--fs-h3)] leading-[var(--lh-h3)] tracking-[var(--ls-h3)] font-bold tracking-tight text-ink line-clamp-2 mb-2">
                      {guide.title}
                    </h3>

                    <p className="text-[12.5px] text-muted mb-4">
                      Updated {guide.updatedDate}
                    </p>
                  </div>

                  <div className="pt-2 mt-auto">
                    <Link
                      href={`/reviews/${guide.slug}`}
                      className="inline-flex items-center justify-center rounded-full bg-cta px-5 py-2.5 text-[14px] leading-[20px] font-semibold text-white shadow-xs hover:bg-cta-hover transition-colors select-none text-center w-full"
                    >
                      Read the guide
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No matching guides"
            description="No guides matched your selected filters. Try unchecking some filters or clearing all filters."
          />
        )}

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-6">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className={`w-9 h-9 rounded-lg flex items-center justify-center text-[14px] font-bold cursor-pointer ${
                currentPage === 1
                  ? 'bg-ink text-white'
                  : 'bg-white border border-border text-ink hover:bg-surface-muted'
              }`}
            >
              1
            </button>
            <button
              type="button"
              disabled={currentPage === 2}
              onClick={() => setCurrentPage(2)}
              className={`w-9 h-9 rounded-lg flex items-center justify-center text-[14px] font-bold cursor-pointer ${
                currentPage === 2
                  ? 'bg-ink text-white'
                  : 'bg-white border border-border text-ink hover:bg-surface-muted'
              }`}
            >
              2
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 h-9 rounded-lg flex items-center justify-center text-[13px] font-semibold border border-border bg-white text-ink hover:bg-surface-muted cursor-pointer"
            >
              Next »
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
