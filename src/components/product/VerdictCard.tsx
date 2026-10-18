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
    <div className="bg-white border border-border rounded-[var(--r-card-feature)] p-6 lg:p-7 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-4 mb-4 pb-4 border-b border-border">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[12px] font-bold bg-ink text-white">
                {ratingCategory}
              </span>
              <span className="text-[12px] font-semibold text-muted bg-tint-light px-2.5 py-0.5 rounded-full border border-border">
                {priceTier} tier
              </span>
            </div>
            <div className="text-[13px] text-muted">
              Composite research score
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <ScoreRing score={score} size={64} strokeWidth={5} />
          </div>
        </div>

        {/* Quick Verdict */}
        <div className="mb-4">
          <div className="eyebrow text-cta mb-1 font-bold">QUICK VERDICT</div>
          <p className="text-[15px] leading-[24px] text-ink font-medium">
            {quickVerdict}
          </p>
        </div>

        {/* Best For */}
        <div className="mb-6 p-3.5 rounded-full bg-surface-muted border border-border text-[13px] text-muted leading-relaxed">
          <strong className="font-bold text-ink">Best for: </strong>
          {bestFor}
        </div>
      </div>

      <div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <AffiliateLink
            href={affiliateUrl}
            className="rounded-full bg-cta px-6 py-3 text-[15px] font-semibold text-white hover:bg-cta-hover transition-colors flex-1 flex items-center justify-center gap-2 shadow-sm"
          >
            <span>Check price on Amazon</span>
            <ExternalLink className="w-4 h-4" />
          </AffiliateLink>
          <a
            href="#specifications"
            className="rounded-full border border-border bg-white px-4 py-2.5 text-[14px] font-semibold text-ink hover:bg-surface-muted transition-colors text-center flex items-center justify-center gap-1.5"
          >
            <span>Specifications</span>
            <ArrowDown className="w-4 h-4" />
          </a>
        </div>
        <p className="text-[12px] text-muted text-center mt-2">
          Affiliate link · we may earn a commission
        </p>
      </div>
    </div>
  );
}
