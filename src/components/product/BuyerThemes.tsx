import type { BuyerTheme } from '@/types';

interface BuyerThemesProps {
  themes: BuyerTheme[];
}

export function BuyerThemes({ themes }: BuyerThemesProps) {
  return (
    <section className="mb-12">
      <div className="mb-4">
        <h2 className="text-[28px] leading-[34px] font-bold text-ink tracking-tight mb-2">
          What buyers say
        </h2>
        <p className="text-[14px] leading-[20px] text-muted">
          Themes from verified Amazon reviews. We summarise patterns; we don't quote individuals.
        </p>
      </div>

      <div className="space-y-2.5 pt-2">
        {themes.map((item, idx) => {
          let badgeClass = 'border border-border text-ink bg-white';
          let badgeLabel = 'Positive';

          if (item.sentiment === 'positive') {
            badgeClass = 'border border-tint-home-border text-positive bg-pros-bg';
            badgeLabel = 'Positive';
          } else if (item.sentiment === 'mixed') {
            badgeClass = 'border border-border text-ink bg-surface-muted';
            badgeLabel = 'Mixed';
          } else if (item.sentiment === 'negative') {
            badgeClass = 'border border-tint-health-border text-negative bg-cons-bg';
            badgeLabel = 'Negative';
          }

          return (
            <div
              key={idx}
              className="bg-white border border-border rounded-full px-5 py-3 flex items-center justify-between gap-4 shadow-xs"
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <span className="font-extrabold text-[16px] text-ink w-12 shrink-0">
                  {item.percentage}%
                </span>
                <span className="text-[14px] text-ink font-normal leading-normal truncate">
                  {item.theme}
                </span>
              </div>
              <span className={`rounded-full px-3 py-0.5 text-[12px] font-semibold shrink-0 ${badgeClass}`}>
                {badgeLabel}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
