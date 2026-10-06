export function TrustStrip() {
  const items = [
    {
      title: 'Research-led product selection',
      description: 'Specs, buyer ratings and expert coverage, side by side.',
    },
    {
      title: 'Clear strengths and limitations',
      description: 'Every pick shows what it does well and where it falls short.',
    },
    {
      title: 'Matched to real use cases',
      description: 'Recommendations fit different users and budgets.',
    },
    {
      title: 'Reviewed as products change',
      description: 'Pages are dated and refreshed when the facts move.',
    },
  ];

  return (
    <section className="border-y border-[#E4E7EB] bg-[#F6F7F9] py-8">
      <div className="container-page">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <div key={index} className="flex items-start gap-3.5">
              {/* Checkmark circle icon */}
              <div className="shrink-0 w-6 h-6 rounded-full bg-[#2B5D7C] text-white flex items-center justify-center mt-0.5">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3.5 8.5L6.5 11.5L12.5 4.5" />
                </svg>
              </div>
              <div className="space-y-0.5">
                <h4 className="text-[14.5px] font-bold text-[#1A1D21]">
                  {item.title}
                </h4>
                <p className="text-[13px] leading-[18px] text-[#5B6470]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
