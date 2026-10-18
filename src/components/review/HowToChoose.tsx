import type { BuyingCriterion } from '@/types';

interface HowToChooseProps {
  categoryOrTopic: string;
  criteria: BuyingCriterion[];
}

export function HowToChoose({ categoryOrTopic, criteria }: HowToChooseProps) {
  return (
    <section id="how-to-choose" className="mb-14 scroll-mt-[calc(var(--header-total-height,104px)+1.5rem)]">
      <h2 className="text-[length:var(--fs-h2)] leading-[var(--lh-h2)] tracking-[var(--ls-h2)] font-extrabold tracking-tight text-ink mb-6">
        How to choose {categoryOrTopic}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {criteria.map((item, idx) => (
          <div
            key={idx}
            className="p-5 rounded-[var(--r-card)] bg-white border border-border shadow-xs"
          >
            <h3 className="font-bold text-[16px] text-ink mb-1.5">
              {item.title}
            </h3>
            <p className="text-[14px] leading-[22px] text-muted">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
