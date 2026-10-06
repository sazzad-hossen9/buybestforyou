import type { BuyerTheme } from '@/types';

interface BuyerThemesProps {
  themes: BuyerTheme[];
}

export function BuyerThemes({ themes }: BuyerThemesProps) {
  return (
    <section className="mb-12">
      <div className="mb-6">
        <div className="eyebrow text-[#5B6470] mb-1 font-bold">VERIFIED REVIEWS SYNTHESIS</div>
        <h2 className="h-2">What verified buyers say</h2>
        <p className="text-caption mt-1">
          Patterns extracted from verified Amazon owner reviews, excluding incentivized feedback.
        </p>
      </div>

      <div className="bg-white border border-[#E4E7EB] rounded-[16px] divide-y divide-[#E4E7EB] overflow-hidden shadow-xs">
        {themes.map((item, idx) => {
          let badgeClass = 'badge-positive';
          let badgeLabel = 'Positive';

          if (item.sentiment === 'mixed') {
            badgeClass = 'badge-mixed';
            badgeLabel = 'Mixed';
          } else if (item.sentiment === 'negative') {
            badgeClass = 'badge-negative';
            badgeLabel = 'Watch out';
          }

          return (
            <div key={idx} className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-[#F6F7F9]/50 transition-colors">
              <div className="flex items-center gap-3.5 flex-1 min-w-0">
                <span className="font-extrabold text-[16px] sm:text-[18px] text-[#1A1D21] w-12 shrink-0">
                  {item.percentage}%
                </span>
                <span className="text-[14px] sm:text-[15px] text-[#1A1D21] font-medium leading-normal">
                  {item.theme}
                </span>
              </div>
              <span className={`${badgeClass} shrink-0`}>
                {badgeLabel}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
