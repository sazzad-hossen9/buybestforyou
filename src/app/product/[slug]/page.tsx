import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  getProductBySlug,
  getProducts,
  getCategoryBySlug,
  getAuthorBySlug,
  getFaqs
} from '@/lib/data';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Accordion } from '@/components/ui/Accordion';
import { Gallery } from '@/components/product/Gallery';
import { ScoreRing } from '@/components/ui/ScoreRing';
import { AtAGlance } from '@/components/product/AtAGlance';
import { HowItScored } from '@/components/product/HowItScored';
import { BuyerThemes } from '@/components/product/BuyerThemes';
import { SpecsTable } from '@/components/product/SpecsTable';
import { WhoShouldBuy } from '@/components/product/WhoShouldBuy';
import { Alternatives } from '@/components/product/Alternatives';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: 'Product Not Found | buybestforyou' };

  return {
    title: `${product.name} | buybestforyou`,
    description: product.quickVerdict.slice(0, 155),
    openGraph: {
      title: `${product.name}: Research & Score Breakdown`,
      description: product.quickVerdict.slice(0, 155),
      images: [product.images[0] || '/images/paint-pen-hero.jpg']
    }
  };
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const [category, author, faqs] = await Promise.all([
    getCategoryBySlug(product.categorySlug),
    getAuthorBySlug(product.authorSlug),
    getFaqs(product.categorySlug === 'automotive' ? 'paintPen' : 'home')
  ]);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    {
      label: category?.name || 'Automotive',
      href: `/category/${product.categorySlug}`
    },
    {
      label: 'Touch-up paint pens',
      href: `/category/${product.categorySlug}`
    },
    { label: 'Review' }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images,
    description: product.shortDescription,
    brand: {
      '@type': 'Brand',
      name: product.brand
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.compositeScore,
      bestRating: '5',
      worstRating: '1',
      reviewCount: 380
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Tinted 2-Column Product Hero */}
      <section className="bg-tint-auto-bg border-b border-tint-auto-border pt-6 pb-12 lg:pt-8 lg:pb-16">
        <div className="mx-auto w-full max-w-[var(--container-max)] px-[var(--container-pad)]">
          {/* Breadcrumb at top */}
          <div className="mb-6">
            <Breadcrumb items={breadcrumbs} />
          </div>

          {/* 2-Column Hero: Left 520px Image card, Right 552px at x=664, gap=80px */}
          <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-[80px]">
            {/* Left Column: Image Card & Thumbnails (520px) */}
            <div className="w-full lg:w-[520px] shrink-0">
              <Gallery images={product.images} productName={product.name} />
            </div>

            {/* Right Column: Pills, H1, Subtitle, Score, Quick Verdict, CTA (552px) */}
            <div className="w-full lg:w-[552px] shrink-0">
              {/* Pills row */}
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-ink text-white rounded-full px-3 py-1 text-[13px] font-semibold">
                  {product.ratingCategory}
                </span>
                <span className="border border-ink text-ink rounded-full px-3 py-1 text-[13px] font-medium">
                  {product.priceTier} price tier
                </span>
              </div>

              {/* H1 inside right column (40px/44px, weight 700) */}
              <h1 className="text-[length:var(--fs-h2)] leading-[var(--lh-h2)] tracking-[var(--ls-h2)] font-bold text-ink mb-3">
                {product.name}
              </h1>

              {/* Subtitle (20px/30px muted) */}
              <p className="text-[length:var(--fs-subhero)] leading-[var(--lh-subhero)] text-muted mb-6">
                {product.shortDescription}
              </p>

              {/* Score ring (72px) with Composite score and Byline */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <ScoreRing score={product.compositeScore} size={72} strokeWidth={5} />
                <div className="pr-4 border-r border-border">
                  <div className="font-bold text-ink text-[15px] leading-[20px]">Composite score</div>
                  <div className="text-[13px] leading-[18px] text-muted">
                    of 4 inputs · <span className="text-trust hover:underline cursor-pointer">How this is calculated</span>
                  </div>
                </div>
                <div className="text-[13px] leading-[18px]">
                  <div className="text-ink">
                    By <span className="font-bold">{author?.name || 'Marcus Webb'}</span>{' '}
                    <span className="text-muted">{author?.role || 'Automotive Editor'}</span>
                  </div>
                  <div className="text-muted">
                    Updated {product.updatedDate} · {product.readTime}
                  </div>
                </div>
              </div>

              {/* White Quick Verdict Card (radius 20, padding 24) */}
              <div className="rounded-[var(--r-card-feature)] bg-white p-6 shadow-xs border border-border mb-6">
                <div className="text-[12px] font-bold uppercase tracking-wider text-trust mb-2">
                  QUICK VERDICT
                </div>
                <p className="text-[15px] leading-[22px] text-ink font-normal">
                  {product.quickVerdict}
                </p>
              </div>

              {/* Action Buttons: Primary pill CTA next to outlined secondary pill */}
              <div className="flex flex-wrap items-center gap-4 mb-3">
                <a
                  href={product.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[263px] h-[52px] rounded-full bg-cta text-white font-semibold hover:bg-cta-hover transition-colors inline-flex items-center justify-center cursor-pointer shadow-xs text-[15px]"
                >
                  Check price on Amazon
                </a>
                <a
                  href="#specifications"
                  className="h-[52px] rounded-full border border-border-input text-ink font-medium px-6 hover:bg-surface-muted transition-colors inline-flex items-center justify-center text-[15px]"
                >
                  See specs
                </a>
              </div>

              {/* Affiliate Note (13-14px / 20px muted) */}
              <p className="text-[13px] leading-[18px] text-muted">
                Affiliate link. We may earn a commission at no cost to you. Price and availability are set by Amazon and can change.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Sticky Desktop Sidebar */}
      <div className="mx-auto w-full max-w-[var(--container-max)] px-[var(--container-pad)] py-[var(--section-py)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Review Column */}
          <div className="lg:col-span-8 min-w-0 max-w-[760px]">
            {/* Pros and Cons */}
            <section className="mb-12">
              <h2 className="text-[28px] leading-[34px] font-bold text-ink tracking-tight mb-4">
                Pros and cons
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* What works */}
                <div className="rounded-[var(--r-card)] bg-pros-bg border border-border p-5">
                  <h3 className="font-bold text-ink text-[16px] mb-4">
                    What works
                  </h3>
                  <ul className="space-y-3">
                    {product.pros.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-[14px] leading-[20px] text-ink">
                        <span className="text-positive font-bold select-none text-[16px] shrink-0 leading-none mt-0.5">+</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What doesn't */}
                <div className="rounded-[var(--r-card)] bg-cons-bg border border-border p-5">
                  <h3 className="font-bold text-ink text-[16px] mb-4">
                    What doesn’t
                  </h3>
                  <ul className="space-y-3">
                    {product.cons.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-[14px] leading-[20px] text-ink">
                        <span className="text-negative font-bold select-none text-[16px] shrink-0 leading-none mt-0.5">–</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* How It Scored */}
            <HowItScored
              scoreBreakdown={product.scoreBreakdown}
              weights={product.weights}
            />

            {/* What Buyers Say */}
            <BuyerThemes themes={product.buyerThemes} />

            {/* Specifications */}
            <SpecsTable specs={product.specs} />

            {/* Who Should Buy It */}
            <WhoShouldBuy
              goodFit={product.whoShouldBuy.goodFit}
              lookElsewhere={product.whoShouldBuy.lookElsewhere}
            />

            {/* Alternatives */}
            <Alternatives alternatives={product.alternatives} />

            {/* Product Questions (Accordion) */}
            {faqs && faqs.length > 0 && (
              <section className="mb-12">
                <h2 className="text-[28px] leading-[34px] font-bold text-ink tracking-tight mb-4">
                  Questions
                </h2>
                <Accordion items={faqs} />
              </section>
            )}
          </div>

          {/* Sticky Desktop Summary Sidebar */}
          <aside className="hidden lg:block lg:col-span-4 h-full">
            <AtAGlance product={product} />
          </aside>
        </div>
      </div>
    </>
  );
}
