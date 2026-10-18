import Link from 'next/link';
import { SafeImage } from '@/components/ui/SafeImage';
import { AffiliateLink } from '@/components/ui/AffiliateLink';
import { Check, Minus } from 'lucide-react';
import type { Product } from '@/types';

interface ProductBlockProps {
  index: number;
  product: Product;
}

export function ProductBlock({ index, product }: ProductBlockProps) {
  const anchorId = `product-${index}`;
  const typeBadge =
    product.id === 'gardena-sileno-minimo'
      ? 'Automatic robotic lawn mower'
      : product.id === 'wire-free-rtk-mower'
      ? 'Robot lawn mower no wire'
      : product.ratingCategory || product.subcategoryName;

  return (
    <article id={anchorId} className="mb-14 scroll-mt-[calc(var(--header-total-height,109px)+1.5rem)]">
      {/* Badge row: Number Circle + Type Chip */}
      <div className="flex items-center gap-2.5 mb-3">
        <span className="w-7 h-7 rounded-full bg-ink text-white font-bold text-sm inline-flex items-center justify-center shrink-0">
          {index}
        </span>
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-tint-light text-ink border border-border">
          {typeBadge}
        </span>
      </div>

      {/* Product H2 */}
      <h2 className="text-[24px] sm:text-[28px] lg:text-[30px] font-extrabold text-ink leading-tight mb-6">
        {product.name}
      </h2>

      {/* Main Top Showcase: Image Card + Score/CTA Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch mb-6">
        {/* Left: Bordered White Box with Image */}
        <div className="md:col-span-6 border border-border rounded-[var(--r-card)] bg-white p-6 flex items-center justify-center min-h-[220px]">
          <div className="relative w-full h-[180px]">
            <SafeImage
              src={product.images[0] || '/images/placeholder.jpg'}
              alt={product.name}
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Right: Big Score, Best For, CTA */}
        <div className="md:col-span-6 flex flex-col justify-between py-1">
          <div>
            <div className="flex items-baseline gap-3 mb-3">
              <span className="text-[44px] md:text-[48px] font-black text-ink leading-none">
                {product.compositeScore.toFixed(1)}
              </span>
              <div className="text-[12.5px] leading-tight text-muted">
                <div className="font-semibold text-ink">Composite score</div>
                <div>{product.priceTier} price tier</div>
              </div>
            </div>

            <p className="text-[14.5px] leading-relaxed mb-5 text-muted">
              <strong className="font-bold text-ink">Best for: </strong>
              {product.bestFor}
            </p>
          </div>

          <div>
            <AffiliateLink
              href={product.affiliateUrl}
              className="w-full text-center py-3 px-4 text-[15px] font-semibold block rounded-full bg-cta text-white hover:bg-cta-hover transition-colors shadow-xs mb-2"
            >
              Check price on Amazon
            </AffiliateLink>
            <p className="text-[12px] text-muted text-center">
              Affiliate link · we may earn a commission ·{' '}
              <Link href={`/product/${product.slug}`} className="text-ink font-semibold hover:underline">
                Full review
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Paragraph Review */}
      <p className="text-[15.5px] md:text-[16px] leading-[26px] text-ink mb-6">
        {product.paragraphReview || product.shortDescription}
      </p>

      {/* What we like & What to watch */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        {/* What we like */}
        <div className="border border-border rounded-[var(--r-card)] p-5 bg-white shadow-xs">
          <h3 className="font-bold text-ink text-[16px] mb-3">What we like</h3>
          <ul className="space-y-2.5">
            {product.pros.map((pro, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-[14px] text-ink leading-snug">
                <Check className="w-4 h-4 text-positive shrink-0 mt-0.5" strokeWidth={2.5} />
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* What to watch */}
        <div className="border border-border rounded-[var(--r-card)] p-5 bg-white shadow-xs">
          <h3 className="font-bold text-ink text-[16px] mb-3">What to watch</h3>
          <ul className="space-y-2.5">
            {product.cons.map((con, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-[14px] text-ink leading-snug">
                <Minus className="w-4 h-4 text-negative shrink-0 mt-0.5" strokeWidth={2.5} />
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Skip it if */}
      {product.skipIf && (
        <div className="p-4 rounded-full bg-surface-muted border border-border text-[14px] text-muted leading-relaxed">
          <strong className="font-bold text-ink">Skip it if: </strong>
          {product.skipIf}
        </div>
      )}
    </article>
  );
}
