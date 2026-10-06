import type { BuyingCriterion } from '@/types';

interface HowToChooseProps {
  categoryOrTopic: string;
  criteria: BuyingCriterion[];
}

export function HowToChoose({ categoryOrTopic, criteria }: HowToChooseProps) {
  return (
    <section id="how-to-choose" className="mb-14 scroll-mt-24">
      <div className="mb-6">
        <div className="eyebrow text-[#5B6470] mb-1 font-bold">BUYING CRITERIA</div>
        <h2 className="h-2">How to choose {categoryOrTopic}</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {criteria.map((item, idx) => (
          <div
            key={idx}
            className="p-5 rounded-[16px] bg-white border border-[#E4E7EB] hover:border-[#8A929C] transition-colors shadow-xs"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-full bg-[#E6EFF4] text-[#2B5D7C] flex items-center justify-center font-bold text-[12px]">
                {idx + 1}
              </span>
              <h3 className="font-bold text-[16px] text-[#1A1D21]">
                {item.title}
              </h3>
            </div>
            <p className="text-[14px] leading-[22px] text-[#5B6470]">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
