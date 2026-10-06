import { ScoreRing } from '@/components/ui/ScoreRing';
import { SafeImage } from '@/components/ui/SafeImage';
import { AffiliateLink } from '@/components/ui/AffiliateLink';
import { ExternalLink, AlertCircle, Plus, Minus } from 'lucide-react';
import type { Product } from '@/types';

interface ProductBlockProps {
  index: number;
  product: Product;
}

export function ProductBlock({ index, product }: ProductBlockProps) {
  const anchorId = `product-${index}`;

  return (
    <article
      id={anchorId}
      className="card bg-white border border-[#E4E7EB] rounded-[20px] p-6 lg:p-8 mb-12 scroll-mt-24 shadow-xs"
    >
      {/* Header Eyebrow & Badges */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[12px] font-bold bg-[#1A1D21] text-white uppercase tracking-wider">
            {index} · {product.ratingCategory}
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-semibold bg-neutral-100 text-[#5B6470] border border-[#E4E7EB]">
            {product.priceTier} tier
          </span>
        </div>
        <div className="text-[12px] text-[#5B6470]">
          Composite Score
        </div>
      </div>

      {/* Title & Score Ring */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <h3 className="text-[22px] md:text-[28px] font-extrabold text-[#1A1D21] leading-tight">
          {product.name}
        </h3>
        <div className="shrink-0 flex flex-col items-center">
          <ScoreRing score={product.compositeScore} size={54} strokeWidth={4.5} />
        </div>
      </div>

      {/* Main Showcase: Image & Specs */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6 pb-6 border-b border-[#E4E7EB]">
        <div className="md:col-span-5">
          <div className="relative aspect-4/3 rounded-[14px] bg-[#F6F7F9] overflow-hidden border border-[#E4E7EB]">
            <SafeImage
              src={product.images[0] || '/images/placeholder.jpg'}
              alt={product.name}
              fill
              className="object-contain p-4"
            />
          </div>
        </div>

        <div className="md:col-span-7 flex flex-col justify-between">
          <div>
            <div className="eyebrow text-[#5B6470] mb-2 font-bold">KEY SPECIFICATIONS</div>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 text-[14px]">
              {Object.entries(product.specs).slice(0, 6).map(([key, value]) => (
                <div key={key} className="border-b border-neutral-100 pb-1.5">
                  <dt className="text-[#5B6470] text-[13px]">{key}</dt>
                  <dd className="font-semibold text-[#1A1D21]">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-4 pt-3 text-[14px] leading-relaxed text-[#1A1D21] bg-[#F6F7F9] p-3.5 rounded-[12px] border border-[#E4E7EB]">
            <span className="font-bold text-[#1A1D21]">Why it ranks #{index}: </span>
            {product.bestFor}
          </div>
        </div>
      </div>

      {/* Paragraph Review */}
      <div className="mb-6">
        <h4 className="text-[17px] font-bold text-[#1A1D21] mb-2">Our analysis</h4>
        <p className="text-[15px] md:text-[16px] leading-[26px] text-[#1A1D21]">
          {product.paragraphReview || product.shortDescription}
        </p>
      </div>

      {/* Pros & Cons Side-by-Side Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Pros */}
        <div className="panel-pros">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-5 h-5 rounded-full bg-[#007A58] text-white flex items-center justify-center text-[12px] font-bold">
              <Plus className="w-3.5 h-3.5" />
            </span>
            <h5 className="font-bold text-[#007A58] text-[15px]">What we like</h5>
          </div>
          <ul className="space-y-2 text-[14px] text-[#1A1D21]">
            {product.pros.map((pro, pIdx) => (
              <li key={pIdx} className="flex items-start gap-2">
                <span className="text-[#007A58] font-bold select-none mt-0.5">•</span>
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cons */}
        <div className="panel-cons">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-5 h-5 rounded-full bg-[#B34E00] text-white flex items-center justify-center text-[12px] font-bold">
              <Minus className="w-3.5 h-3.5" />
            </span>
            <h5 className="font-bold text-[#B34E00] text-[15px]">What to watch</h5>
          </div>
          <ul className="space-y-2 text-[14px] text-[#1A1D21]">
            {product.cons.map((con, cIdx) => (
              <li key={cIdx} className="flex items-start gap-2">
                <span className="text-[#B34E00] font-bold select-none mt-0.5">•</span>
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Skip it if callout */}
      {product.skipIf && (
        <div className="mb-6 p-4 rounded-[14px] bg-[#F6F7F9] border border-[#E4E7EB] flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-[#B34E00] shrink-0 mt-0.5" />
          <div className="text-[14px] leading-relaxed text-[#1A1D21]">
            <span className="font-bold text-[#1A1D21]">Skip it if: </span>
            {product.skipIf}
          </div>
        </div>
      )}

      {/* CTA Button & Affiliate Notice */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
        <AffiliateLink
          href={product.affiliateUrl}
          className="btn-cta text-[15px] px-7 py-3 w-full sm:w-auto flex items-center justify-center gap-2 shadow-sm"
        >
          <span>Check price on Amazon</span>
          <ExternalLink className="w-4 h-4" />
        </AffiliateLink>
        <span className="text-caption text-[12px] text-[#5B6470] text-center sm:text-right">
          Affiliate link · we may earn a commission
        </span>
      </div>
    </article>
  );
}
