import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  getCategoryBySlug,
  getCategories,
  getReviews,
  getAuthorBySlug,
  getFaqs,
} from '@/lib/data';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { SafeImage } from '@/components/ui/SafeImage';
import { Accordion } from '@/components/ui/Accordion';
import { CategoryListing } from '@/components/category/CategoryListing';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: 'Category Not Found' };

  return {
    title: `${category.name} Buying Guides & Reviews`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const [allReviews, editor, faqs] = await Promise.all([
    getReviews(),
    getAuthorBySlug(category.editorSlug),
    getFaqs('automotive'),
  ]);

  // Guides belonging to this category or related
  const categoryGuides = allReviews.filter(
    (rev) => rev.categorySlug === category.slug || category.slug === 'automotive'
  );

  const startHerePicks = [
    {
      pill: 'Automotive Parts & Accessories',
      title: 'Paint Pen for Automotive',
      description:
        'Paint Pen for Automotive has as the go-to choice, offering unparalleled ease and finesse in restoring your vehicle\'s flawless exterior.',
      date: 'Updated July 2026',
      image: '/images/paint-pen-hero.jpg',
      url: '/product/scratch-fix-paint-pen',
    },
    {
      pill: 'Driving Accessories',
      title: 'Wireless Apple CarPlay Screen: 2025 Top Budget & Premium',
      description:
        'Discover the best Wireless Apple CarPlay Screen for your car. Get easy access to apps, navigation, and music without cables.',
      date: 'Updated December 2025',
      image: '/images/carplay-hero.jpg',
      url: '/reviews/wireless-carplay-screen-2025',
    },
    {
      pill: 'Automotive Parts & Accessories',
      title: 'Best spray gun for automotive paint',
      description:
        'Choosing the best spray gun for automotive paint is the first and most crucial step toward achieving professional-quality results.',
      date: 'Updated July 2026',
      image: '/images/carwash-hero.jpg',
      url: '/reviews/kit-for-car-wash',
    },
  ];

  return (
    <div className="bg-white">
      {/* Category Tinted Hero Section */}
      <section
        className="py-10 lg:py-14 border-b border-border"
        style={{ backgroundColor: category.tintBg }}
      >
        <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-16">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: category.name },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: category.dotColor }}
                  aria-hidden="true"
                />
                <span className="text-[13.5px] font-bold text-ink">
                  {category.name}
                </span>
              </div>

              <h1 className="text-[length:var(--fs-h1)] leading-[var(--lh-h1)] tracking-[var(--ls-h1)] font-extrabold tracking-tight text-ink">
                {category.name}
              </h1>

              <p className="text-[15px] md:text-[16px] leading-[26px] text-ink max-w-3xl">
                {category.description}
              </p>

              {/* Metadata Pills */}
              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-[13px] leading-[18px] font-medium border border-border bg-surface text-ink whitespace-nowrap">
                  Updated Oct 2026
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-[13px] leading-[18px] font-medium border border-border bg-surface text-ink whitespace-nowrap">
                  {category.reviewCount} guides
                </span>
                {editor && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[13px] leading-[18px] font-medium border border-border bg-surface text-ink whitespace-nowrap">
                    Edited by {editor.name}
                  </span>
                )}
              </div>
            </div>

            {/* Right: Jump to a Subcategory */}
            {category.subcategories && category.subcategories.length > 0 && (
              <div className="lg:col-span-4 bg-white p-6 rounded-[var(--r-card)] border border-border space-y-3">
                <h4 className="text-[13.5px] font-bold uppercase tracking-wider text-muted">
                  Jump to a subcategory
                </h4>
                <div className="space-y-2">
                  {category.subcategories.map((sub, sIdx) => (
                    <Link
                      key={sIdx}
                      href={`/category/${category.slug}?sub=${sub.slug}`}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-border hover:border-border-input transition-colors text-[14px] font-medium text-ink"
                    >
                      <span>{sub.name}</span>
                      <span className="text-[12.5px] text-muted">({sub.count})</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Start Here (3 Featured Cards) */}
      <section className="py-10 md:py-14 lg:py-[72px] bg-white border-b border-border">
        <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-16">
          <h2 className="text-[length:var(--fs-h2)] leading-[var(--lh-h2)] tracking-[var(--ls-h2)] font-extrabold tracking-tight text-ink mb-6">
            Start here
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            {startHerePicks.map((pick, pIdx) => (
              <div
                key={pIdx}
                className="bg-surface border border-border rounded-[var(--r-card)] overflow-hidden shadow-[var(--sh-card)] flex flex-col justify-between hover:shadow-[var(--sh-card-hover)] transition-all duration-200"
              >
                {/* Full-bleed top image 160px */}
                <div className="relative w-full h-[160px] overflow-hidden bg-tint-light">
                  <span className="absolute top-2.5 left-2.5 z-10 rounded-full bg-ink text-white font-semibold text-[11px] px-2.5 py-0.5">
                    {pick.pill}
                  </span>
                  <SafeImage
                    src={pick.image}
                    alt={pick.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover"
                  />
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-[length:var(--fs-h3)] leading-[var(--lh-h3)] tracking-[var(--ls-h3)] font-bold tracking-tight text-ink mb-2 line-clamp-2">
                      {pick.title}
                    </h3>

                    <p className="text-[14px] leading-[22px] text-muted line-clamp-3 mb-4">
                      {pick.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-border mt-auto">
                    <p className="text-[12px] text-muted mb-3">{pick.date}</p>
                    <Link
                      href={pick.url}
                      className="inline-flex items-center justify-center rounded-full bg-cta px-5 py-2.5 text-[14px] leading-[20px] font-semibold text-white shadow-xs hover:bg-cta-hover transition-colors select-none text-center w-full"
                    >
                      See top picks
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[13px] text-muted mt-4">
            Recommendations here follow the same research-based approach described in{' '}
            <Link href="/about" className="text-trust underline">
              How We Research
            </Link>
            . They are not in-house product tests.
          </p>
        </div>
      </section>

      {/* Filter Sidebar + Guide Grid + Pagination */}
      <section className="py-10 md:py-14 lg:py-[72px] bg-white">
        <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-16">
          <CategoryListing
            initialGuides={categoryGuides}
            subcategories={category.subcategories}
            categoryName={category.name}
          />
        </div>
      </section>

      {/* Category FAQ */}
      <section className="bg-white py-[var(--section-py)]">
        <div className="mx-auto w-full max-w-[var(--container-max)] px-[var(--container-pad)]">
          <div className="max-w-4xl">
            <h2 className="text-[length:var(--fs-h2)] leading-[var(--lh-h2)] tracking-[var(--ls-h2)] font-extrabold text-ink text-left mb-8">
              {category.name}: common questions
            </h2>
            <Accordion items={faqs} />
          </div>
        </div>
      </section>
    </div>
  );
}
