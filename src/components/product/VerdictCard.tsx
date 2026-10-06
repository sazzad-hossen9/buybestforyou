import { ScoreRing } from '@/components/ui/ScoreRing';
import { AffiliateLink } from '@/components/ui/AffiliateLink';
import { ExternalLink, ArrowDown } from 'lucide-react';

interface VerdictCardProps {
  score: number;
  ratingCategory: string;
  priceTier: string;
  quickVerdict: string;
  bestFor: string;
  affiliateUrl: string;
}

export function VerdictCard({
  score,
  ratingCategory,
  priceTier,
  quickVerdict,
  bestFor,
  affiliateUrl
}: VerdictCardProps) {
  return (
    <div className="bg-white border border-[#E4E7EB] rounded-[20px] p-6 lg:p-7 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-4 mb-4 pb-4 border-b border-[#E4E7EB]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[12px] font-bold bg-[#1A1D21] text-white">
                {ratingCategory}
              </span>
              <span className="text-[12px] font-semibold text-[#5B6470] bg-[#F6F7F9] px-2.5 py-0.5 rounded-full border border-[#E4E7EB]">
                {priceTier} tier
              </span>
            </div>
            <div className="text-[13px] text-[#5B6470]">
              Composite research score
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <ScoreRing score={score} size={64} strokeWidth={5} />
          </div>
        </div>

        {/* Quick Verdict */}
        <div className="mb-4">
          <div className="eyebrow text-[#B84A14] mb-1 font-bold">QUICK VERDICT</div>
          <p className="text-[15px] leading-[24px] text-[#1A1D21] font-medium">
            {quickVerdict}
          </p>
        </div>

        {/* Best For */}
        <div className="mb-6 p-3.5 rounded-[12px] bg-[#F6F7F9] text-[13px] text-[#5B6470] leading-relaxed">
          <span className="font-bold text-[#1A1D21]">Best for: </span>
          {bestFor}
        </div>
      </div>

      <div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <AffiliateLink
            href={affiliateUrl}
            className="btn-cta text-[15px] py-3 px-6 flex-1 flex items-center justify-center gap-2 shadow-sm"
          >
            <span>Check price on Amazon</span>
            <ExternalLink className="w-4 h-4" />
          </AffiliateLink>
          <a
            href="#specifications"
            className="btn-secondary text-[14px] py-2.5 px-4 text-center flex items-center justify-center gap-1.5"
          >
            <span>Specifications</span>
            <ArrowDown className="w-4 h-4" />
          </a>
        </div>
        <p className="text-[12px] text-[#5B6470] text-center mt-2">
          Affiliate link · we may earn a commission
        </p>
      </div>
    </div>
  );
}
