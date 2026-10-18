import Link from 'next/link';

export function HowWePick() {
  const scoreBreakdown = [
    { label: 'Verified buyer ratings', score: 4.8, percentage: 96 },
    { label: 'Spec match to claims', score: 4.6, percentage: 92 },
    { label: 'Expert / lab coverage', score: 4.7, percentage: 94 },
    { label: 'Value for the price tier', score: 4.5, percentage: 90 },
  ];

  return (
    <section className="bg-ink text-white py-12 md:py-14 lg:py-[72px]">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-[1fr_524px] gap-10 lg:gap-14 items-center">
        {/* Left Column */}
        <div className="space-y-6">
          <p className="text-[length:var(--fs-eyebrow)] leading-[var(--lh-eyebrow)] tracking-[var(--ls-eyebrow)] font-bold uppercase tracking-[0.08em] text-on-ink">HOW WE PICK</p>
          <h2 className="text-[length:var(--fs-h2)] leading-[var(--lh-h2)] tracking-[var(--ls-h2)] font-extrabold tracking-tight text-white">
            A score you can check, not a vibe.
          </h2>
          <p className="text-[length:var(--fs-body-lg)] leading-[var(--lh-body-lg)] text-on-ink max-w-xl">
            We review manufacturer specifications, compare practical features, consider suitability for different users and budgets, and clearly explain important limitations. Affiliate relationships do not determine the order of our recommendations.
          </p>

          {/* 3 Numbered Steps */}
          <div className="space-y-4 pt-2">
            <div className="flex items-start gap-3.5">
              <span className="w-7 h-7 rounded-full bg-white text-ink flex items-center justify-center font-bold text-[length:var(--fs-caption)] leading-[var(--lh-caption)] shrink-0 mt-0.5">
                1
              </span>
              <div>
                <h4 className="font-bold text-white text-[15px] leading-[22px]">Collect</h4>
                <p className="text-[length:var(--fs-caption)] leading-[var(--lh-caption)] text-on-ink">
                  Manufacturer specs, verified buyer ratings and expert lab or press coverage.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <span className="w-7 h-7 rounded-full bg-white text-ink flex items-center justify-center font-bold text-[length:var(--fs-caption)] leading-[var(--lh-caption)] shrink-0 mt-0.5">
                2
              </span>
              <div>
                <h4 className="font-bold text-white text-[15px] leading-[22px]">Score</h4>
                <p className="text-[length:var(--fs-caption)] leading-[var(--lh-caption)] text-on-ink">
                  Combine the inputs into one composite score, with the weights published.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <span className="w-7 h-7 rounded-full bg-white text-ink flex items-center justify-center font-bold text-[length:var(--fs-caption)] leading-[var(--lh-caption)] shrink-0 mt-0.5">
                3
              </span>
              <div>
                <h4 className="font-bold text-white text-[15px] leading-[22px]">Refresh</h4>
                <p className="text-[length:var(--fs-caption)] leading-[var(--lh-caption)] text-on-ink">
                  Re-check pages on a schedule and show the date on every one.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-full bg-surface px-5 py-3 text-[length:var(--fs-body)] leading-[var(--lh-body)] font-semibold text-ink hover:bg-surface-muted transition-colors select-none text-center"
            >
              Read our full method
            </Link>
          </div>
        </div>

        {/* Right Column: Score Breakdown Card */}
        <div className="w-full max-w-[524px] mx-auto lg:mx-0">
          <div className="bg-white rounded-[var(--r-card-feature)] p-6 text-ink shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-border mb-5">
              <h3 className="font-bold text-[17px] leading-[24px] text-ink">
                Example score breakdown
              </h3>
              <span className="text-[12.5px] text-muted">Sample weights</span>
            </div>

            <div className="space-y-4 mb-6">
              {scoreBreakdown.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-[14px]">
                    <span className="text-ink font-semibold">{item.label}</span>
                    <span className="font-bold text-ink">{item.score}</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-trust h-full rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-border flex items-center justify-between">
              <span className="font-bold text-[15px] text-ink">Composite score</span>
              <div className="flex items-baseline gap-1">
                <span className="text-[26px] font-extrabold text-ink">4.7</span>
                <span className="text-[14px] text-muted">/ 5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
