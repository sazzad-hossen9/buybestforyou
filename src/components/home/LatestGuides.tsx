'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SafeImage } from '@/components/ui/SafeImage';
import type { ReviewRoundup } from '@/types';

interface LatestGuidesProps {
  initialReviews: ReviewRoundup[];
}

const CATEGORIES = [
  { label: 'All', slug: 'all' },
  { label: 'Automotive', slug: 'automotive' },
  { label: 'Electronics', slug: 'electronics' },
  { label: 'Home', slug: 'home-appliances' },
  { label: 'Health', slug: 'health-and-fitness' },
  { label: 'Lawn & Garden', slug: 'lawn-and-garden' },
];

export function LatestGuides({ initialReviews }: LatestGuidesProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [visibleCount, setVisibleCount] = useState(6);

  const filtered = initialReviews.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.categorySlug === selectedCategory;
  });

  const displayed = filtered.slice(0, visibleCount);
  const canLoadMore = visibleCount < filtered.length;

  return (
    <section className="py-10 md:py-14 lg:py-[72px] bg-white">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-16">
        {/* Section Title & Filter Pills */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h2 className="text-[length:var(--fs-h2)] leading-[var(--lh-h2)] tracking-[var(--ls-h2)] font-extrabold tracking-tight text-ink">
            Latest reviews and guides
          </h2>

          {/* Category Filter Pills (Hidden on mobile or horizontally scrollable) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.slug;
              return (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat.slug);
                    setVisibleCount(6);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-[13px] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-ink text-white'
                      : 'bg-surface-muted text-ink hover:bg-border'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Desktop Grid Layout (3 cols) */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {displayed.map((guide) => (
            <Link
              key={guide.slug}
              href={`/reviews/${guide.slug}`}
              className="bg-surface border border-border rounded-[var(--r-card)] overflow-hidden shadow-[var(--sh-card)] group flex flex-col justify-between hover:shadow-[var(--sh-card-hover)] transition-all duration-200"
            >
              {/* Full-bleed top image 160px */}
              <div className="relative w-full h-[160px] overflow-hidden bg-surface-muted">
                <SafeImage
                  src={guide.featuredImage}
                  alt={guide.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Card Body: 20px padding */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-positive" aria-hidden="true" />
                    <span className="text-[12.5px] font-semibold text-muted">
                      {guide.categoryName} · {guide.guideType}
                    </span>
                  </div>

                  <h3 className="text-[length:var(--fs-h3)] leading-[var(--lh-h3)] tracking-[var(--ls-h3)] font-bold tracking-tight text-ink group-hover:text-cta transition-colors mb-3">
                    {guide.title}
                  </h3>
                </div>

                <div className="pt-3 border-t border-border text-[13px] text-muted mt-auto">
                  Updated {guide.updatedDate}
                  {guide.readTimeMinutes > 0 && ` · ${guide.readTimeMinutes} min read`}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile Compact Row Layout (from Mobile Homepage Screenshot 11) */}
        <div className="md:hidden divide-y divide-border mb-8">
          {displayed.map((guide) => (
            <Link
              key={guide.slug}
              href={`/reviews/${guide.slug}`}
              className="py-4 flex items-center gap-4 group"
            >
              <div className="relative w-24 h-20 rounded-xl overflow-hidden shrink-0 bg-tint-light">
                <SafeImage
                  src={guide.featuredImage}
                  alt={guide.title}
                  fill
                  sizes="100px"
                  className="object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-semibold text-muted mb-0.5">
                  {guide.categoryName}
                </p>
                <h4 className="text-[14px] font-bold text-ink leading-snug line-clamp-2 group-hover:text-cta">
                  {guide.title}
                </h4>
                <p className="text-[12px] text-muted mt-1">
                  Updated {guide.updatedDate}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More Button */}
        {canLoadMore && (
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + 3)}
              className="inline-flex items-center justify-center rounded-full bg-surface border-2 border-ink px-8 py-2.5 text-[14px] md:text-[15px] font-semibold text-ink hover:bg-surface-muted transition-colors select-none text-center cursor-pointer"
            >
              Load more
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
