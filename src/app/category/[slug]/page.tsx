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
        className="py-10 lg:py-14 border-b border-black/5"
        style={{ backgroundColor: category.tintBg }}
      >
        <div className="container-page">
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
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: category.dotColor }}
                  aria-hidden="true"
                />
                <span className="text-[13.5px] font-bold text-[#1A1D21]">
                  {category.name}
                </span>
              </div>

              <h1 className="h-1 text-[#1A1D21]">{category.name}</h1>

              <p className="text-[15px] md:text-[16px] leading-[26px] text-[#1A1D21] max-w-3xl">
                {category.description}
              </p>

              {/* Metadata Pills */}
              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                <span className="pill-outline text-[13px] font-semibold text-[#1A1D21]">
                  Updated Oct 2026
                </span>
                <span className="pill-outline text-[13px] font-semibold text-[#1A1D21]">
                  {category.reviewCount} guides
                </span>
                {editor && (
                  <span className="pill-outline text-[13px] font-semibold text-[#1A1D21]">
                    Edited by {editor.name}
                  </span>
                )}
              </div>
            </div>

            {/* Right: Jump to a Subcategory */}
            {category.subcategories && category.subcategories.length > 0 && (
              <div className="lg:col-span-4 bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-black/5 space-y-3">
                <h4 className="text-[13.5px] font-bold uppercase tracking-wider text-[#5B6470]">
                  Jump to a subcategory
                </h4>
                <div className="space-y-2">
                  {category.subcategories.map((sub, sIdx) => (
                    <Link
                      key={sIdx}
                      href={`/category/${category.slug}?sub=${sub.slug}`}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#E4E7EB] hover:border-[#8A929C] transition-colors text-[14px] font-medium text-[#1A1D21]"
                    >
                      <span>{sub.name}</span>
                      <span className="text-[12.5px] text-[#5B6470]">({sub.count})</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Start Here (3 Featured Cards) */}
      <section className="section bg-white border-b border-[#E4E7EB]">
        <div className="container-page">
          <h2 className="h-2 mb-6">Start here</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            {startHerePicks.map((pick, pIdx) => (
              <div
                key={pIdx}
                className="card flex flex-col justify-between hover:shadow-md transition-all duration-200"
              >
                <div>
                  <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-[#F6F7F9]">
                    <span className="absolute top-2.5 left-2.5 z-10 pill-dark text-[12px] px-2.5 py-0.5">
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

                  <h3 className="h-3 text-[#1A1D21] mb-2 line-clamp-2">
                    {pick.title}
                  </h3>

                  <p className="text-[14px] leading-[22px] text-[#5B6470] line-clamp-3 mb-4">
                    {pick.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#E4E7EB]">
                  <p className="text-[12px] text-[#5B6470] mb-3">{pick.date}</p>
                  <Link
                    href={pick.url}
                    className="btn-cta btn-block text-center py-2 text-[14px]"
                  >
                    See top picks
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[13px] text-[#5B6470] mt-4">
            Recommendations here follow the same research-based approach described in{' '}
            <Link href="/about" className="text-[#2B5D7C] underline">
              How We Research
            </Link>
            . They are not in-house product tests.
          </p>
        </div>
      </section>

      {/* Filter Sidebar + Guide Grid + Pagination */}
      <section className="section bg-white">
        <div className="container-page">
          <CategoryListing
            initialGuides={categoryGuides}
            subcategories={category.subcategories}
            categoryName={category.name}
          />
        </div>
      </section>

      {/* Category FAQ */}
      <section className="section bg-[#F6F7F9] border-t border-[#E4E7EB]">
        <div className="container-page max-w-4xl">
          <h2 className="h-2 text-center mb-8">
            {category.name}: common questions
          </h2>
          <Accordion items={faqs} />
        </div>
      </section>
    </div>
  );
}
