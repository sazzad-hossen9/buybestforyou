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
      weight: weights.verifiedBuyerRatings
    },
    {
      name: 'Spec match to claims',
      score: scoreBreakdown.specMatchToClaims,
      weight: weights.specMatchToClaims
    },
    {
      name: 'Expert and press coverage',
      score: scoreBreakdown.expertLabCoverage,
      weight: weights.expertLabCoverage
    },
    {
      name: 'Value for the price tier',
      score: scoreBreakdown.valueForPriceTier,
      weight: weights.valueForPriceTier
    }
  ];

  return (
    <section className="mb-12">
      <div className="mb-4">
        <h2 className="text-[28px] leading-[34px] font-bold text-ink tracking-tight mb-2">
          How it scored
        </h2>
        <p className="text-[14px] leading-[20px] text-muted">
          We did not test this product ourselves. The score combines four inputs, weighted as shown. [Sample weights]
        </p>
      </div>

      <div className="space-y-4 pt-2">
        {criteria.map((item, idx) => {
          const percentage = (item.score / 5) * 100;
          return (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-baseline justify-between text-[14px]">
                <span className="font-semibold text-ink">
                  {item.name} <span className="text-muted font-normal">({item.weight}%)</span>
                </span>
                <span className="font-bold text-ink">
                  {item.score.toFixed(1)}
                </span>
              </div>

              <div className="w-full bg-border rounded-full h-2 overflow-hidden">
                <div
                  className="bg-score h-2 rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
