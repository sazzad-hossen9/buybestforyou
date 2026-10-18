import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  getReviewBySlug,
  getReviews,
  getProductsByIds,
  getAuthorBySlug,
  getCategoryBySlug
} from '@/lib/data';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Accordion } from '@/components/ui/Accordion';
import { TOC } from '@/components/review/TOC';
import { QuickAnswer } from '@/components/review/QuickAnswer';
import { CompareTable } from '@/components/review/CompareTable';
import { ProductBlock } from '@/components/review/ProductBlock';
import { HowToChoose } from '@/components/review/HowToChoose';
import { HowWeRanked } from '@/components/review/HowWeRanked';
import { AuthorBox } from '@/components/review/AuthorBox';
import { KeepReading } from '@/components/review/KeepReading';
import { StickyMobileCta } from '@/components/review/StickyMobileCta';

interface ReviewPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ReviewPageProps): Promise<Metadata> {
  const { slug } = await params;
  const review = await getReviewBySlug(slug);
  if (!review) return { title: 'Review Not Found | buybestforyou' };

  return {
    title: `${review.title} | buybestforyou`,
    description: review.quickAnswerSummary.slice(0, 155),
    openGraph: {
      title: review.title,
      description: review.quickAnswerSummary.slice(0, 155),
      type: 'article',
      images: [review.featuredImage || '/images/og-default.jpg']
    }
  };
}

export async function generateStaticParams() {
  const reviews = await getReviews();
  return reviews.map((r) => ({ slug: r.slug }));
}

export default async function ReviewPage({ params }: ReviewPageProps) {
  const { slug } = await params;
  const review = await getReviewBySlug(slug);

  if (!review) {
    notFound();
  }

  const [products, author, allReviews, category] = await Promise.all([
    getProductsByIds(review.productIds),
    getAuthorBySlug(review.authorSlug),
    getReviews(),
    getCategoryBySlug(review.categorySlug)
  ]);

  const topPick = products[0];

  const isMowers = review.slug === 'best-robot-lawn-mower-2025';

  // TOC items (matching design 3 for robot lawn mower, dynamic for other review guides)
  const tocItems = isMowers
    ? [
        { id: 'compare-at-a-glance', label: 'Compare at a glance' },
        { id: 'product-1', label: '1. GARDENA SILENO Minimo' },
        { id: 'product-2', label: '2. NO Wire RTK mower' },
        { id: 'how-to-choose', label: 'How to choose' },
        { id: 'how-we-ranked', label: 'How we ranked' },
        { id: 'faq', label: 'FAQ' }
      ]
    : [
        { id: 'compare-at-a-glance', label: 'Compare at a glance' },
        ...products.map((p, idx) => ({
          id: `product-${idx + 1}`,
          label: `${idx + 1}. ${p.tableName || p.shortName || p.brand || p.name.split(' ').slice(0, 4).join(' ')}`
        })),
        { id: 'how-to-choose', label: 'How to choose' },
        { id: 'how-we-ranked', label: 'How we ranked' },
        ...(review.faqs && review.faqs.length > 0 ? [{ id: 'faq', label: 'FAQ' }] : [])
      ];

  const subcategoryLabel =
    review.slug === 'best-robot-lawn-mower-2025'
      ? 'Robot lawn mowers'
      : review.subcategoryName || 'Roundup';

  // Breadcrumbs matching design 3: Home › Lawn and Garden › Robot lawn mowers
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    {
      label: category?.name || review.categoryName,
      href: `/category/${review.categorySlug}`
    },
    { label: subcategoryLabel }
  ];

  const authorRole = (author?.role || 'Automotive Editor').replace(' & Tools', '');

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: review.title,
    description: review.quickAnswerSummary,
    image: review.featuredImage,
    dateModified: review.updatedDate,
    author: {
      '@type': 'Person',
      name: author?.name || 'Marcus Webb'
    },
    publisher: {
      '@type': 'Organization',
      name: 'buybestforyou'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-16 py-6 lg:py-8">
        {/* Breadcrumb matching design 3 */}
        <div className="mb-4">
          <Breadcrumb items={breadcrumbs} />
        </div>

        {/* Article Header matching design 3 */}
        <header className="max-w-4xl mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-positive shrink-0"></span>
            <span className="text-[13.5px] font-bold text-ink">
              {category?.name || review.categoryName} · {review.guideType || 'Roundup'}
            </span>
          </div>

          <h1 className="text-[length:var(--fs-h1)] leading-[var(--lh-h1)] tracking-[var(--ls-h1)] font-extrabold text-ink tracking-tight mb-5">
            {review.title}
          </h1>

          {/* Author row matching design 3: MW circle, Marcus Webb, Automotive Editor */}
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-[14px] text-white shrink-0"
              style={{ backgroundColor: author?.avatarBg || 'var(--tint-auto-dot)' }}
            >
              {author?.initials || 'MW'}
            </div>
            <div>
              <div className="font-bold text-ink text-[15px] leading-tight">
                {author?.name || 'Marcus Webb'}
              </div>
              <div className="text-[13px] text-muted leading-snug mt-0.5">
                {authorRole} · Updated {review.updatedDate} · {review.readTimeMinutes} min read · {products.length} {isMowers ? 'mowers' : products.length === 1 ? 'product' : 'products'} compared
              </div>
            </div>
          </div>
        </header>

        {/* Quick Answer (Full width, right below Article Header, matching design 3) */}
        <div className="mb-12">
          <QuickAnswer
            summary={review.quickAnswerSummary}
            picks={review.quickAnswerPicks}
            products={products}
          />
        </div>

        {/* 2-Column Grid with Sticky TOC on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-[268px_1fr] gap-10">
          {/* Left Plain Sticky Sidebar (Desktop only) */}
          <aside className="hidden lg:block w-full h-full">
            <div className="sticky top-[calc(var(--header-total-height,109px)+1.5rem)]">
              <TOC items={tocItems} />
            </div>
          </aside>

          {/* Right Main Content */}
          <div className="w-full min-w-0">
            {/* Compare Table */}
            <CompareTable products={products} />

            {/* Product Blocks (no extra headers/eyebrows) */}
            <section className="mb-14">
              {products.map((product, idx) => (
                <ProductBlock
                  key={product.id}
                  index={idx + 1}
                  product={product}
                />
              ))}
            </section>

            {/* How to Choose */}
            <HowToChoose
              categoryOrTopic="a robot lawn mower"
              criteria={review.buyingCriteria}
            />

            {/* How we ranked these */}
            <HowWeRanked
              methodNote={review.methodNote}
              sources={review.methodSources}
              updatedDate={review.updatedDate}
            />

            {/* Frequently asked questions */}
            {review.faqs && review.faqs.length > 0 && (
              <section id="faq" className="mb-14 scroll-mt-[calc(var(--header-total-height,109px)+1.5rem)]">
                <h2 className="text-[length:var(--fs-h2)] leading-[var(--lh-h2)] tracking-[var(--ls-h2)] font-extrabold tracking-tight text-ink mb-6">Frequently asked questions</h2>
                <Accordion items={review.faqs} />
              </section>
            )}

            {/* Author Box */}
            {author && <AuthorBox author={author} />}
          </div>
        </div>

        {/* Keep Reading (spans full container below 2-col grid) */}
        <KeepReading
          currentSlug={review.slug}
          relatedReviews={allReviews}
        />
      </main>

      {/* Sticky Mobile CTA Bar (Mobile only, white theme matching design 12) */}
      {topPick && (
        <StickyMobileCta
          productName={topPick.tableName || 'GARDENA SILENO Minimo'}
          affiliateUrl={topPick.affiliateUrl}
        />
      )}
    </>
  );
}
