import { ScoreRing } from '@/components/ui/ScoreRing';
import { AffiliateLink } from '@/components/ui/AffiliateLink';
import { ExternalLink, Check } from 'lucide-react';
import type { Product } from '@/types';

interface AtAGlanceProps {
  product: Product;
}

export function AtAGlance({ product }: AtAGlanceProps) {
  return (
    <div className="bg-white border border-[#E4E7EB] rounded-[16px] p-6 shadow-xs sticky top-24">
      <div className="eyebrow text-[#5B6470] mb-3 font-bold">AT A GLANCE</div>

      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#E4E7EB]">
        <ScoreRing score={product.compositeScore} size={54} strokeWidth={4.5} />
        <div>
          <div className="font-bold text-[16px] text-[#1A1D21] leading-tight">
            {product.brand} {product.name.split(' ')[0]}
          </div>
          <div className="text-[12px] font-semibold text-[#007A58]">
            {product.ratingCategory}
          </div>
          <div className="text-[12px] text-[#5B6470]">
            {product.priceTier} tier
          </div>
        </div>
      </div>

      {/* Top 3 Pros Checklist */}
      <ul className="space-y-2 mb-6 text-[13px] text-[#1A1D21]">
        {product.pros.slice(0, 3).map((pro, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <Check className="w-4 h-4 text-[#007A58] shrink-0 mt-0.5" />
            <span className="line-clamp-2">{pro}</span>
          </li>
        ))}
      </ul>

      {/* Action */}
      <AffiliateLink
        href={product.affiliateUrl}
        className="btn-cta text-[14px] w-full py-2.5 px-4 flex items-center justify-center gap-2 mb-2"
      >
        <span>Check price on Amazon</span>
        <ExternalLink className="w-3.5 h-3.5" />
      </AffiliateLink>
      <div className="text-[11px] text-[#5B6470] text-center">
        Updated {product.updatedDate} · Amazon Associate link
      </div>
    </div>
  );
}
