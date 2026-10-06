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
import { VerdictCard } from '@/components/product/VerdictCard';
import { AtAGlance } from '@/components/product/AtAGlance';
import { HowItScored } from '@/components/product/HowItScored';
import { BuyerThemes } from '@/components/product/BuyerThemes';
import { SpecsTable } from '@/components/product/SpecsTable';
import { WhoShouldBuy } from '@/components/product/WhoShouldBuy';
import { Alternatives } from '@/components/product/Alternatives';
import { Calendar, Clock, UserCheck, Plus, Minus } from 'lucide-react';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: 'Product Not Found | buybestforyou' };

  return {
    title: `${product.name} Review | buybestforyou`,
    description: product.quickVerdict.slice(0, 155),
    openGraph: {
      title: `${product.name} Review: Research & Score Breakdown`,
      description: product.quickVerdict.slice(0, 155),
      images: [product.images[0] || '/images/og-default.jpg']
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
      label: category?.name || product.subcategoryName,
      href: `/category/${product.categorySlug}`
    },
    { label: product.name }
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

      {/* Tinted Product Hero */}
      <section className="bg-[#F4EDE7] border-b border-[#E8DDD4] py-8 lg:py-12">
        <div className="container-page">
          <div className="mb-6">
            <Breadcrumb items={breadcrumbs} />
          </div>

          <div className="max-w-4xl mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#7A4E2D]"></span>
              <span className="text-[13px] font-bold uppercase tracking-wider text-[#7A4E2D]">
                {product.subcategoryName}
              </span>
            </div>

            <h1 className="h-1 mb-4">
              {product.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-caption text-[14px] text-[#5B6470]">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#8A929C]" />
                Updated {product.updatedDate}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#8A929C]" />
                {product.readTime}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-[#2B5D7C]" />
                By {author?.name || 'Marcus Webb'} ({author?.role || 'Car Care Editor'})
              </span>
            </div>
          </div>

          {/* Hero Grid: Gallery & Quick Verdict */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5">
              <Gallery images={product.images} productName={product.name} />
            </div>
            <div className="lg:col-span-7">
              <VerdictCard
                score={product.compositeScore}
                ratingCategory={product.ratingCategory}
                priceTier={product.priceTier}
                quickVerdict={product.quickVerdict}
                bestFor={product.bestFor}
                affiliateUrl={product.affiliateUrl}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Sticky Desktop Sidebar */}
      <div className="container-page py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Review Column */}
          <div className="lg:col-span-8 min-w-0">
            {/* Pros and Cons */}
            <section className="mb-12">
              <div className="mb-6">
                <div className="eyebrow text-[#5B6470] mb-1 font-bold">STRENGTHS & DRAWBACKS</div>
                <h2 className="h-2">What works, and what doesn’t</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="panel-pros">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-5 h-5 rounded-full bg-[#007A58] text-white flex items-center justify-center text-[12px] font-bold">
                      <Plus className="w-3.5 h-3.5" />
                    </span>
                    <h3 className="font-bold text-[#007A58] text-[16px]">What works</h3>
                  </div>
                  <ul className="space-y-2.5 text-[14px] text-[#1A1D21]">
                    {product.pros.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#007A58] font-bold select-none">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="panel-cons">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-5 h-5 rounded-full bg-[#B34E00] text-white flex items-center justify-center text-[12px] font-bold">
                      <Minus className="w-3.5 h-3.5" />
                    </span>
                    <h3 className="font-bold text-[#B34E00] text-[16px]">What doesn’t</h3>
                  </div>
                  <ul className="space-y-2.5 text-[14px] text-[#1A1D21]">
                    {product.cons.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#B34E00] font-bold select-none">•</span>
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

            {/* Product FAQs */}
            {faqs && faqs.length > 0 && (
              <section className="mb-12">
                <div className="mb-6">
                  <div className="eyebrow text-[#5B6470] mb-1 font-bold">ANSWERS</div>
                  <h2 className="h-2">Frequently asked questions</h2>
                </div>
                <Accordion items={faqs} />
              </section>
            )}
          </div>

          {/* Sticky Desktop Summary Sidebar */}
          <aside className="hidden lg:block lg:col-span-4">
            <AtAGlance product={product} />
          </aside>
        </div>
      </div>
    </>
  );
}
