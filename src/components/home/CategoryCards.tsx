import Link from 'next/link';
import { SafeImage } from '@/components/ui/SafeImage';
import type { Category } from '@/types';

interface CategoryCardsProps {
  categories: Category[];
}

export function CategoryCards({ categories }: CategoryCardsProps) {
  // Show top 4 categories as in homepage screenshot
  const displayCats = categories.slice(0, 4);

  return (
    <section className="section bg-white">
      <div className="container-page">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="eyebrow mb-1">BROWSE</p>
            <h2 className="h-2">Start with what you need</h2>
          </div>
          <Link
            href="/category/automotive"
            className="text-[14px] font-semibold text-[#2B5D7C] hover:text-[#1A1D21] transition-colors"
          >
            All categories →
          </Link>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayCats.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="card-tint group flex flex-col justify-between overflow-hidden hover:shadow-md transition-all duration-200"
              style={{
                backgroundColor: cat.tintBg,
                borderColor: cat.accentBorder,
              }}
            >
              <div>
                {/* Category Thumbnail */}
                <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-white/40">
                  <SafeImage
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Dot & Title */}
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: cat.dotColor }}
                    aria-hidden="true"
                  />
                  <h3 className="h-3 text-[#1A1D21] group-hover:text-[#B84A14] transition-colors">
                    {cat.name}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-[14px] leading-[20px] text-[#5B6470] line-clamp-3 mb-4">
                  {cat.description}
                </p>
              </div>

              {/* Bottom Metadata */}
              <div className="pt-3 border-t border-black/5 mt-auto">
                <p className="text-[12.5px] text-[#5B6470] mb-2">
                  <span className="font-semibold text-[#1A1D21]">{cat.reviewCount} reviews</span>
                  {cat.mostSearched.length > 0 && ` · Most searched: ${cat.mostSearched[0]}`}
                </p>
                <span className="inline-flex items-center text-[13.5px] font-bold text-[#1A1D21] group-hover:text-[#B84A14] transition-colors">
                  View category →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
