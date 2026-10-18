import Link from 'next/link';

interface WhoShouldBuyProps {
  goodFit: string;
  lookElsewhere: string;
}

export function WhoShouldBuy({ goodFit, lookElsewhere }: WhoShouldBuyProps) {
  return (
    <section className="mb-12">
      <div className="mb-4">
        <h2 className="text-[28px] leading-[34px] font-bold text-ink tracking-tight">
          Who should buy it
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Good fit */}
        <div className="rounded-[var(--r-card)] bg-white border border-border p-5 shadow-xs">
          <h3 className="font-bold text-[15px] leading-[20px] text-ink mb-2">
            Good fit
          </h3>
          <p className="text-[14px] leading-[22px] text-ink">
            {goodFit}
          </p>
        </div>

        {/* Look elsewhere */}
        <div className="rounded-[var(--r-card)] bg-white border border-border p-5 shadow-xs">
          <h3 className="font-bold text-[15px] leading-[20px] text-ink mb-2">
            Look elsewhere
          </h3>
          <p className="text-[14px] leading-[22px] text-ink">
            Deep scratches, rust spots, matte or pearlescent finishes. See our{' '}
            <Link href="/reviews/best-robot-lawn-mower-2025" className="text-trust underline hover:text-ink">
              full roundup
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
