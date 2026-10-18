import Link from "next/link";
import { SafeImage } from "@/components/ui/SafeImage";
import type { Category } from "@/types";

interface CategoryCardsProps {
  categories: Category[];
}

export function CategoryCards({ categories }: CategoryCardsProps) {
  // Show top 4 categories as in homepage screenshot
  const displayCats = categories.slice(0, 4);

  return (
    <section className="py-10 md:py-14 lg:py-[72px] bg-white">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-16">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-[length:var(--fs-eyebrow)] leading-[var(--lh-eyebrow)] tracking-[var(--ls-eyebrow)] font-bold uppercase tracking-[0.08em] text-muted mb-1">
              BROWSE
            </p>
            <h2 className=" mt-3 mb-1.7 text-[length:var(--fs-h2)] leading-[var(--lh-h2)] tracking-[var(--ls-h2)] font-extrabold tracking-tight text-ink">
              Start with what you need
            </h2>
          </div>
          <Link
            href="/category/automotive"
            className="text-[length:var(--fs-caption)] leading-[var(--lh-caption)] font-semibold text-trust hover:text-ink transition-colors"
          >
            All categories →
          </Link>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-between gap-5 ">
          {displayCats.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="rounded-[var(--r-card-feature)] overflow-hidden border group flex flex-col justify-between hover:shadow-[var(--sh-card-hover)] transition-all duration-200"
              style={{
                backgroundColor: cat.tintBg,
                borderColor: cat.accentBorder,
              }}
            >
              {/* Category Thumbnail: Full-bleed top image 150px */}
              <div className="relative w-full h-[150px] overflow-hidden bg-surface-muted">
                <SafeImage
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Text Body with 20px padding */}
              <div className="p-5 pb-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Dot & Title */}
                  <div className="flex items-center gap-2 mb-3.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: cat.dotColor }}
                      aria-hidden="true"
                    />
                    <h3 className="text-[length:var(--fs-h3)] leading-[var(--lh-h3)] tracking-[var(--ls-h3)] font-bold tracking-tight text-ink group-hover:text-cta transition-colors">
                      {cat.name}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-[14px] leading-[22px] text-muted line-clamp-3 mb-6">
                    {cat.description}
                  </p>
                </div>

                {/* Bottom Metadata */}
                <div className="mt-auto">
                  <p className="text-[13px] leading-[19px] text-muted mb-7">
                    <span className="font-semibold text-ink">
                      {cat.reviewCount} reviews
                    </span>
                    {cat.mostSearched.length > 0 &&
                      ` · Most searched: ${cat.mostSearched[0]}`}
                  </p>
                  <div className="flex items-center text-[13.5px] justify-between  font-bold text-ink group-hover:text-cta transition-colors">
                    View category <div>→</div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
