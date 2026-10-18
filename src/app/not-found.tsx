import Link from 'next/link';
import { getCategories, getReviews } from '@/lib/data';
import { SearchBox } from '@/components/ui/SearchBox';
import { SafeImage } from '@/components/ui/SafeImage';

export default async function NotFound() {
  const [categories, reviews] = await Promise.all([
    getCategories(),
    getReviews()
  ]);

  const featuredGuides = reviews.slice(0, 3);
  const mainCats = categories.slice(0, 4);

  return (
    <div className="bg-surface min-h-screen py-12 lg:py-16">
      <main className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-16">
        {/* Error Hero */}
        <div className="max-w-3xl mx-auto text-center mb-14 lg:mb-20">
          <p className="text-[length:var(--fs-eyebrow)] leading-[var(--lh-eyebrow)] tracking-[var(--ls-eyebrow)] uppercase text-trust mb-3 font-bold">
            ERROR 404
          </p>
          <h1 className="text-[length:var(--fs-h1)] leading-[var(--lh-h1)] tracking-[-0.012em] font-extrabold text-ink mb-4 max-w-[760px] mx-auto">
            That page has moved or never existed.
          </h1>
          <p className="text-[length:var(--fs-subhero)] leading-[var(--lh-subhero)] text-muted mb-8">
            Search for what you were after, or jump to a category.
          </p>

          {/* Search Box */}
          <div className="w-full max-w-[560px] mx-auto mb-6">
            <SearchBox placeholder="Search reviews and guides" />
          </div>

          {/* Category Tint Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {mainCats.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[14px] font-semibold transition-transform hover:scale-105"
                style={{
                  backgroundColor: cat.tintBg,
                  color: cat.dotColor
                }}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: cat.dotColor }}
                />
                <span>{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Start with our latest guides */}
        <section className="pt-4 pb-12">
          <h2 className="text-[length:var(--fs-h2)] leading-[var(--lh-h2)] tracking-[var(--ls-h2)] font-extrabold text-ink tracking-tight mb-8">Or start with our latest guides</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredGuides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/reviews/${guide.slug}`}
                className="group rounded-[var(--r-card)] border border-border bg-white overflow-hidden hover:border-border-input hover:shadow-[var(--sh-card-hover)] transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Full-bleed top image 160px */}
                  <div className="relative w-full h-[160px] overflow-hidden bg-surface-muted">
                    <SafeImage
                      src={guide.featuredImage || '/images/placeholder.jpg'}
                      alt={guide.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-4 space-y-2">
                    <p className="text-[13px] font-bold text-ink">
                      {guide.categoryName}
                    </p>
                    <h3 className="text-[18px] leading-[24px] font-bold text-ink group-hover:text-cta transition-colors line-clamp-2">
                      {guide.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
