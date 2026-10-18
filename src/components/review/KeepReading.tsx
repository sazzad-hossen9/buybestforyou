import Link from 'next/link';
import type { ReviewRoundup } from '@/types';

interface KeepReadingProps {
  currentSlug: string;
  relatedReviews: ReviewRoundup[];
}

export function KeepReading({ currentSlug, relatedReviews }: KeepReadingProps) {
  const items = relatedReviews.filter((r) => r.slug !== currentSlug).slice(0, 3);
  if (items.length === 0) return null;

  return (
    <section className="mt-14 pt-8 border-t border-border">
      <h2 className="text-[24px] font-bold text-ink mb-6">Keep reading</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {items.map((item) => (
          <Link
            key={item.slug}
            href={`/reviews/${item.slug}`}
            className="group bg-white border border-border rounded-[var(--r-card)] p-5 hover:border-border-strong transition-all block"
          >
            <span className="text-[12px] font-bold text-trust block mb-2">
              {item.guideType || 'Roundup'}
            </span>
            <h3 className="font-bold text-[16px] text-ink group-hover:text-cta transition-colors leading-snug">
              {item.title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
