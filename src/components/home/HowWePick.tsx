import Link from 'next/link';

export function HowWePick() {
  const scoreBreakdown = [
    { label: 'Verified buyer ratings', score: 4.8, percentage: 96 },
    { label: 'Spec match to claims', score: 4.6, percentage: 92 },
    { label: 'Expert / lab coverage', score: 4.7, percentage: 94 },
    { label: 'Value for the price tier', score: 4.5, percentage: 90 },
  ];

  return (
    <section className="section-dark">
      <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Column */}
        <div className="lg:col-span-7 space-y-6">
          <p className="eyebrow text-[#B4BBC4]">HOW WE PICK</p>
          <h2 className="text-[28px] md:text-[38px] leading-[34px] md:leading-[44px] font-extrabold tracking-tight text-white">
            A score you can check, not a vibe.
          </h2>
          <p className="text-[16px] md:text-[17px] leading-[26px] text-[#B4BBC4] max-w-xl">
            We review manufacturer specifications, compare practical features, consider suitability for different users and budgets, and clearly explain important limitations. Affiliate relationships do not determine the order of our recommendations.
          </p>

          {/* 3 Numbered Steps */}
          <div className="space-y-4 pt-2">
            <div className="flex items-start gap-3.5">
              <span className="w-7 h-7 rounded-full bg-white text-[#1A1D21] flex items-center justify-center font-bold text-[14px] shrink-0 mt-0.5">
                1
              </span>
              <div>
                <h4 className="font-bold text-white text-[15px]">Collect</h4>
                <p className="text-[14px] text-[#B4BBC4]">
                  Manufacturer specs, verified buyer ratings and expert lab or press coverage.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <span className="w-7 h-7 rounded-full bg-white text-[#1A1D21] flex items-center justify-center font-bold text-[14px] shrink-0 mt-0.5">
                2
              </span>
              <div>
                <h4 className="font-bold text-white text-[15px]">Score</h4>
                <p className="text-[14px] text-[#B4BBC4]">
                  Combine the inputs into one composite score, with the weights published.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <span className="w-7 h-7 rounded-full bg-white text-[#1A1D21] flex items-center justify-center font-bold text-[14px] shrink-0 mt-0.5">
                3
              </span>
              <div>
                <h4 className="font-bold text-white text-[15px]">Refresh</h4>
                <p className="text-[14px] text-[#B4BBC4]">
                  Re-check pages on a schedule and show the date on every one.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Link href="/about" className="btn-light">
              Read our full method
            </Link>
          </div>
        </div>

        {/* Right Column: Score Breakdown Card */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-2xl p-6 lg:p-7 text-[#1A1D21] shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#E4E7EB] mb-5">
              <h3 className="font-bold text-[17px] text-[#1A1D21]">
                Example score breakdown
              </h3>
              <span className="text-[12.5px] text-[#5B6470]">Sample weights</span>
            </div>

            <div className="space-y-4 mb-6">
              {scoreBreakdown.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-[14px]">
                    <span className="text-[#1A1D21] font-semibold">{item.label}</span>
                    <span className="font-bold text-[#1A1D21]">{item.score}</span>
                  </div>
                  <div className="w-full bg-[#E4E7EB] rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-[#2B5D7C] h-full rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#E4E7EB] flex items-center justify-between">
              <span className="font-bold text-[15px] text-[#1A1D21]">Composite score</span>
              <div className="flex items-baseline gap-1">
                <span className="text-[26px] font-extrabold text-[#1A1D21]">4.7</span>
                <span className="text-[14px] text-[#5B6470]">/ 5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
