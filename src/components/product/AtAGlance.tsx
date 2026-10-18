import { AffiliateLink } from '@/components/ui/AffiliateLink';
import type { Product } from '@/types';

interface AtAGlanceProps {
  product: Product;
}

export function AtAGlance({ product }: AtAGlanceProps) {
  const displayName = product.shortName || product.name.replace(' Review', '');

  return (
    <div className="bg-white border border-border rounded-[var(--r-card)] p-6 shadow-[var(--sh-card)] sticky top-[calc(var(--header-total-height,109px)+1.5rem)]">
      {/* Eyebrow */}
      <div className="text-[length:var(--fs-eyebrow)] leading-[var(--lh-eyebrow)] tracking-[var(--ls-eyebrow)] text-muted mb-2 font-bold uppercase">
        AT A GLANCE
      </div>

      {/* Title */}
      <h3 className="font-bold text-[18px] leading-[24px] text-ink mb-4">
        {displayName}
      </h3>

      {/* Large Score + Inputs */}
      <div className="flex items-baseline gap-2.5 mb-5">
        <span className="text-[36px] leading-[40px] font-extrabold text-ink tracking-tight">
          {product.compositeScore.toFixed(1)}
        </span>
        <div className="text-[12px] leading-[16px] text-muted">
          <div>composite</div>
          <div>of 4 inputs</div>
        </div>
      </div>

      {/* Primary CTA */}
      <AffiliateLink
        href={product.affiliateUrl}
        className="inline-flex items-center justify-center rounded-full bg-cta px-5 py-3 text-[15px] font-semibold text-white hover:bg-cta-hover transition-colors w-full mb-2 shadow-xs cursor-pointer"
      >
        Check price on Amazon
      </AffiliateLink>
      <div className="text-[12px] text-muted text-center mb-5">
        Affiliate link
      </div>

      {/* Divider */}
      <div className="border-t border-border pt-4 space-y-3 text-[13px] leading-[18px]">
        <div className="flex items-center justify-between">
          <span className="text-muted">Price tier</span>
          <span className="font-medium text-ink">{product.priceTier}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted">Best for</span>
          <span className="font-medium text-ink text-right">Light scratches</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted">Last checked</span>
          <span className="font-medium text-ink">{product.updatedDate}</span>
        </div>
      </div>
    </div>
  );
}
