import { ScoreRing } from '@/components/ui/ScoreRing';
import { AffiliateLink } from '@/components/ui/AffiliateLink';
import { ExternalLink, ArrowDown } from 'lucide-react';
import type { QuickAnswerPick, Product } from '@/types';

interface QuickAnswerProps {
  summary: string;
  picks: QuickAnswerPick[];
  products: Product[];
}

export function QuickAnswer({ summary, picks, products }: QuickAnswerProps) {
  return (
    <section id="the-quick-answer" className="card-feature bg-white border border-[#E4E7EB] rounded-[20px] p-6 lg:p-8 mb-10 scroll-mt-24 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-2 h-2 rounded-full bg-[#B84A14]"></span>
        <span className="eyebrow text-[#B84A14]">THE QUICK ANSWER</span>
      </div>

      <p className="text-[16px] leading-[26px] text-[#1A1D21] mb-6">
        {summary}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {picks.map((pick, idx) => {
          const product = products.find((p) => p.id === pick.productId || p.slug === pick.productId);
          const affiliateUrl = product?.affiliateUrl || 'https://www.amazon.com';
          const anchorId = `product-${idx + 1}`;

          return (
            <div
              key={pick.productId}
              className="border border-[#E4E7EB] rounded-[16px] p-5 bg-[#F6F7F9] flex flex-col justify-between hover:border-[#8A929C] transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[12px] font-bold bg-[#1A1D21] text-white">
                    {pick.badge}
                  </span>
                  <span className="text-[12px] font-semibold text-[#5B6470] bg-white px-2 py-0.5 rounded-full border border-[#E4E7EB]">
                    {pick.tier} tier
                  </span>
                </div>

                <div className="flex items-start justify-between gap-3 my-3">
                  <h3 className="text-[18px] font-bold text-[#1A1D21] leading-snug">
                    <a href={`#${anchorId}`} className="hover:text-[#B84A14] transition-colors">
                      {pick.title}
                    </a>
                  </h3>
                  <div className="shrink-0">
                    <ScoreRing score={pick.score} size={46} strokeWidth={4} />
                  </div>
                </div>

                <p className="text-[14px] leading-[22px] text-[#5B6470] mb-5">
                  {pick.summary}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-2 border-t border-[#E4E7EB]">
                <AffiliateLink
                  href={affiliateUrl}
                  className="btn-cta text-[14px] py-2 px-4 justify-center flex-1 flex items-center gap-1.5"
                >
                  <span>Check price</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </AffiliateLink>
                <a
                  href={`#${anchorId}`}
                  className="btn-secondary text-[13px] py-2 px-3 text-center flex items-center justify-center gap-1 hover:bg-neutral-100"
                >
                  <span>Jump to review</span>
                  <ArrowDown className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
