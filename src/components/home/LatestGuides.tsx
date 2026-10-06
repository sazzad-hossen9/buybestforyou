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
    <section className="section bg-white">
      <div className="container-page">
        {/* Section Title & Filter Pills */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h2 className="h-2">Latest reviews and guides</h2>

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
                  className={`px-3.5 py-1.5 rounded-full text-[13px] font-semibold whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-[#1A1D21] text-white'
                      : 'bg-[#F1F3F5] text-[#1A1D21] hover:bg-[#E4E7EB]'
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
              className="card group flex flex-col justify-between hover:shadow-md transition-all duration-200"
            >
              <div>
                <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-[#F6F7F9]">
                  <SafeImage
                    src={guide.featuredImage}
                    alt={guide.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#007A58]" aria-hidden="true" />
                  <span className="text-[12.5px] font-semibold text-[#5B6470]">
                    {guide.categoryName} · {guide.guideType}
                  </span>
                </div>

                <h3 className="h-3 text-[#1A1D21] group-hover:text-[#B84A14] transition-colors mb-3">
                  {guide.title}
                </h3>
              </div>

              <div className="pt-3 border-t border-[#E4E7EB] text-[13px] text-[#5B6470]">
                <span>Updated {guide.updatedDate}</span>
                {guide.readTimeMinutes > 0 && <span> · {guide.readTimeMinutes} min read</span>}
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile Compact Row Layout (from Mobile Homepage Screenshot 11) */}
        <div className="md:hidden divide-y divide-[#E4E7EB] mb-8">
          {displayed.map((guide) => (
            <Link
              key={guide.slug}
              href={`/reviews/${guide.slug}`}
              className="py-4 flex items-center gap-4 group"
            >
              <div className="relative w-24 h-20 rounded-xl overflow-hidden shrink-0 bg-[#F6F7F9]">
                <SafeImage
                  src={guide.featuredImage}
                  alt={guide.title}
                  fill
                  sizes="100px"
                  className="object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-semibold text-[#5B6470] mb-0.5">
                  {guide.categoryName}
                </p>
                <h4 className="text-[14px] font-bold text-[#1A1D21] leading-snug line-clamp-2 group-hover:text-[#B84A14]">
                  {guide.title}
                </h4>
                <p className="text-[12px] text-[#5B6470] mt-1">
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
              className="btn-secondary px-8 py-2.5 text-[14px] md:text-[15px]"
            >
              Load more
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
