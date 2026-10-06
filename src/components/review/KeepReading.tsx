import Link from 'next/link';
import { SafeImage } from '@/components/ui/SafeImage';
import { ArrowRight, Clock } from 'lucide-react';
import type { ReviewRoundup } from '@/types';

interface KeepReadingProps {
  currentSlug: string;
  relatedReviews: ReviewRoundup[];
}

export function KeepReading({ currentSlug, relatedReviews }: KeepReadingProps) {
  const items = relatedReviews.filter((r) => r.slug !== currentSlug).slice(0, 3);
  if (items.length === 0) return null;

  return (
    <section className="mt-14 pt-10 border-t border-[#E4E7EB]">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <div className="eyebrow text-[#5B6470] mb-1 font-bold">MORE GUIDES</div>
          <h2 className="h-2">Keep reading</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {items.map((item) => (
          <Link
            key={item.slug}
            href={`/reviews/${item.slug}`}
            className="group card bg-white border border-[#E4E7EB] rounded-[16px] p-5 hover:border-[#8A929C] hover:shadow-sm transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-16/10 rounded-[12px] bg-neutral-100 overflow-hidden mb-4 border border-[#E4E7EB]">
                <SafeImage
                  src={item.featuredImage || '/images/placeholder.jpg'}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-[12px] font-semibold text-[#2B5D7C]">
                  {item.categoryName}
                </span>
                <span className="text-neutral-300">•</span>
                <span className="text-[12px] text-[#5B6470] flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {item.readTimeMinutes} min read
                </span>
              </div>

              <h3 className="font-bold text-[16px] text-[#1A1D21] group-hover:text-[#B84A14] transition-colors leading-snug line-clamp-2">
                {item.title}
              </h3>
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-[13px] font-semibold text-[#B84A14]">
              <span>Read guide</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
