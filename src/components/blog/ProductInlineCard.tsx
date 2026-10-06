import { SafeImage } from '@/components/ui/SafeImage';
import { ScoreRing } from '@/components/ui/ScoreRing';
import { AffiliateLink } from '@/components/ui/AffiliateLink';
import { ExternalLink } from 'lucide-react';

interface ProductInlineCardProps {
  label: string;
  name: string;
  score: number;
  tier: string;
  image: string;
  affiliateUrl: string;
}

export function ProductInlineCard({
  label,
  name,
  score,
  tier,
  image,
  affiliateUrl
}: ProductInlineCardProps) {
  return (
    <div className="my-8 p-5 sm:p-6 rounded-[16px] bg-[#F6F7F9] border border-[#E4E7EB] shadow-xs">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-2 h-2 rounded-full bg-[#B84A14]"></span>
        <span className="eyebrow text-[#B84A14]">{label}</span>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-5">
        <div className="relative w-24 h-24 rounded-[12px] bg-white border border-[#E4E7EB] overflow-hidden shrink-0">
          <SafeImage
            src={image || '/images/placeholder.jpg'}
            alt={name}
            fill
            className="object-contain p-2"
          />
        </div>

        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
            <h4 className="font-bold text-[17px] text-[#1A1D21]">
              {name}
            </h4>
            <span className="text-[12px] font-semibold text-[#5B6470] bg-white px-2 py-0.5 rounded-full border border-[#E4E7EB]">
              {tier}
            </span>
          </div>
          <p className="text-[13px] text-[#5B6470] mb-3">
            Ranked highest in our scratch remover tests for consistency and OEM color matching.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <AffiliateLink
              href={affiliateUrl}
              className="btn-cta text-[14px] py-2 px-4 flex items-center justify-center gap-1.5 w-full sm:w-auto"
            >
              <span>Check price on Amazon</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </AffiliateLink>
            <span className="text-[11px] text-[#5B6470]">
              Affiliate link · we may earn a commission
            </span>
          </div>
        </div>

        <div className="shrink-0 hidden md:block">
          <ScoreRing score={score} size={48} strokeWidth={4} />
        </div>
      </div>
    </div>
  );
}
