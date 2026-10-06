import type { ProductScoreBreakdown } from '@/types';

interface HowItScoredProps {
  scoreBreakdown: ProductScoreBreakdown;
  weights: {
    verifiedBuyerRatings: number;
    specMatchToClaims: number;
    expertLabCoverage: number;
    valueForPriceTier: number;
  };
}

export function HowItScored({ scoreBreakdown, weights }: HowItScoredProps) {
  const criteria = [
    {
      name: 'Verified buyer ratings',
      score: scoreBreakdown.verifiedBuyerRatings,
      weight: weights.verifiedBuyerRatings,
      description: 'Aggregated sentiment from hundreds of verified Amazon customer reviews.'
    },
    {
      name: 'Spec match to claims',
      score: scoreBreakdown.specMatchToClaims,
      weight: weights.specMatchToClaims,
      description: 'How closely actual capability meets manufacturer advertised performance.'
    },
    {
      name: 'Expert coverage & teardowns',
      score: scoreBreakdown.expertLabCoverage,
      weight: weights.expertLabCoverage,
      description: 'Consensus from independent automotive specialists and professional labs.'
    },
    {
      name: 'Value for price tier',
      score: scoreBreakdown.valueForPriceTier,
      weight: weights.valueForPriceTier,
      description: 'Performance delivered relative to its market tier and competing alternatives.'
    }
  ];

  return (
    <section className="mb-12">
      <div className="mb-6">
        <div className="eyebrow text-[#5B6470] mb-1 font-bold">METHODOLOGY IN ACTION</div>
        <h2 className="h-2">How it scored</h2>
        <p className="text-caption mt-1">
          Every product is evaluated across four weighted dimensions. We do not accept free samples or manufacturer sponsorships.
        </p>
      </div>

      <div className="bg-white border border-[#E4E7EB] rounded-[16px] p-6 space-y-6 shadow-xs">
        {criteria.map((item, idx) => {
          const percentage = (item.score / 5) * 100;
          return (
            <div key={idx} className="space-y-1.5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[15px] text-[#1A1D21]">
                    {item.name}
                  </span>
                  <span className="text-[12px] font-semibold text-[#5B6470] bg-[#F6F7F9] px-2 py-0.5 rounded-full border border-[#E4E7EB]">
                    {item.weight}% weight
                  </span>
                </div>
                <div className="font-bold text-[15px] text-[#007A58]">
                  {item.score.toFixed(1)} <span className="text-[#5B6470] text-[13px] font-normal">/ 5.0</span>
                </div>
              </div>

              <div className="bar-track">
                <div
                  className="bar-fill"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <p className="text-[13px] text-[#5B6470]">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
