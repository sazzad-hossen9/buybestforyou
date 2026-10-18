import Link from 'next/link';
import type { QuickAnswerPick, Product } from '@/types';

interface QuickAnswerProps {
  summary: string;
  picks: QuickAnswerPick[];
  products: Product[];
}

export function QuickAnswer({ summary, picks }: QuickAnswerProps) {
  return (
    <section
      id="quick-answer"
      className="bg-tint-light border border-border rounded-[var(--r-card-feature)] p-6 mb-10 scroll-mt-24"
    >
      <span className="text-[12.5px] font-bold uppercase tracking-wider text-trust block mb-3">
        QUICK ANSWER
      </span>

      <p className="text-[16px] leading-[26px] text-ink mb-6">
        {summary}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
        {picks.map((pick, idx) => {
          const anchorId = `product-${idx + 1}`;

          return (
            <div
              key={pick.productId}
              className="bg-white border border-border rounded-[var(--r-card)] p-5 flex flex-col justify-between shadow-xs"
            >
              <div>
                <span className="text-[13px] font-bold text-positive block mb-1">
                  {pick.badge}
                </span>

                <h3 className="text-[17px] sm:text-[18px] font-bold text-ink leading-snug mb-2">
                  <a href={`#${anchorId}`} className="hover:text-cta transition-colors">
                    {pick.title}
                  </a>
                </h3>

                <div className="flex items-center gap-1.5 text-[14px] text-muted mb-5">
                  <span className="text-star font-bold text-[15px]">★</span>
                  <span className="font-bold text-ink">{pick.score.toFixed(1)}</span>
                  <span>composite · {pick.tier}</span>
                </div>
              </div>

              <a
                href={`#${anchorId}`}
                className="w-full text-center py-2.5 px-4 text-[15px] font-semibold block rounded-full bg-cta text-white hover:bg-cta-hover transition-colors"
              >
                See why
              </a>
            </div>
          );
        })}
      </div>

      <p className="text-[12.5px] text-muted leading-relaxed">
        Affiliate links. Scores are composites of verified buyer ratings, spec match and expert coverage, not our own lab tests.{' '}
        <Link href="/about#method" className="text-trust hover:underline font-medium">
          How we score
        </Link>
      </p>
    </section>
  );
}
