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
import { Clock, Calendar, UserCheck } from 'lucide-react';

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

  // TOC items
  const tocItems = [
    { id: 'the-quick-answer', label: 'The quick answer' },
    { id: 'compare-at-a-glance', label: 'Compare at a glance' },
    ...products.map((p, idx) => ({
      id: `product-${idx + 1}`,
      label: `${idx + 1}. ${p.name.split('-')[0].trim()}`
    })),
    { id: 'how-to-choose', label: 'How to choose' },
    { id: 'how-we-ranked-these', label: 'How we ranked these' },
    { id: 'frequently-asked-questions', label: 'Frequently asked questions' }
  ];

  // Breadcrumbs
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    {
      label: category?.name || review.categoryName,
      href: `/category/${review.categorySlug}`
    },
    { label: review.title }
  ];

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

      <div className="bg-[#F6F7F9] border-b border-[#E4E7EB] py-3">
        <div className="container-page">
          <Breadcrumb items={breadcrumbs} />
        </div>
      </div>

      <main className="container-page py-8 lg:py-12">
        {/* Article Header */}
        <header className="max-w-4xl mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3A8452]"></span>
            <span className="text-[13px] font-bold uppercase tracking-wider text-[#3A8452]">
              {review.subcategoryName || review.categoryName}
            </span>
          </div>

          <h1 className="h-1 mb-4">
            {review.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-caption text-[14px] text-[#5B6470]">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#8A929C]" />
              Updated {review.updatedDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#8A929C]" />
              {review.readTimeMinutes} min read
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-[#2B5D7C]" />
              By {author?.name || 'Marcus Webb'} ({author?.role || 'Senior Editor'})
            </span>
          </div>
        </header>

        {/* 2-Column Grid with Sticky TOC on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Sticky Sidebar (Desktop only) */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24 space-y-6">
              <TOC items={tocItems} />

              {/* Research Disclosure Callout in sidebar */}
              <div className="p-4 rounded-[14px] bg-[#E6EFF4] border border-[#D1E1EB] text-[13px] text-[#1A1D21]">
                <div className="font-bold mb-1 text-[#2B5D7C]">Composite research</div>
                <p className="text-[#5B6470] text-[12px] leading-relaxed">
                  We synthesize buyer ratings, lab tests, and spec sheets. We do not accept sponsored placements.
                </p>
              </div>
            </div>
          </aside>

          {/* Right Main Content */}
          <div className="lg:col-span-9 max-w-3xl min-w-0">
            {/* Quick Answer */}
            <QuickAnswer
              summary={review.quickAnswerSummary}
              picks={review.quickAnswerPicks}
              products={products}
            />

            {/* Compare Table */}
            <CompareTable products={products} />

            {/* Product Blocks */}
            <section className="mb-14">
              <div className="mb-6">
                <div className="eyebrow text-[#5B6470] mb-1 font-bold">DETAILED REVIEWS</div>
                <h2 className="h-2">Our recommended picks</h2>
              </div>

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
            />

            {/* FAQ Accordion */}
            {review.faqs && review.faqs.length > 0 && (
              <section id="frequently-asked-questions" className="mb-14 scroll-mt-24">
                <div className="mb-6">
                  <div className="eyebrow text-[#5B6470] mb-1 font-bold">ANSWERS</div>
                  <h2 className="h-2">Frequently asked questions</h2>
                </div>
                <Accordion items={review.faqs} />
              </section>
            )}

            {/* Author Box */}
            {author && <AuthorBox author={author} />}

            {/* Keep Reading */}
            <KeepReading
              currentSlug={review.slug}
              relatedReviews={allReviews}
            />
          </div>
        </div>
      </main>

      {/* Sticky Mobile CTA Bar */}
      {topPick && (
        <StickyMobileCta
          productName={topPick.name}
          badge={topPick.ratingCategory}
          affiliateUrl={topPick.affiliateUrl}
        />
      )}
    </>
  );
}
