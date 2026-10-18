import Link from 'next/link';

interface HowWeRankedProps {
  methodNote: string;
  sources?: string;
  updatedDate?: string;
}

export function HowWeRanked({
  methodNote,
  sources = 'manufacturer spec sheets, Amazon verified-purchase ratings, expert coverage',
  updatedDate = 'December 21, 2025'
}: HowWeRankedProps) {
  return (
    <section id="how-we-ranked" className="mb-14 scroll-mt-[calc(var(--header-total-height,104px)+1.5rem)]">
      <div className="rounded-[var(--r-card)] bg-tint-elec-bg border border-tint-elec-border p-6 lg:p-7">
        <h2 className="text-[22px] leading-[28px] font-bold text-ink mb-3">
          How we ranked these
        </h2>

        <p className="text-[15px] leading-[25px] text-ink mb-4">
          {methodNote}
        </p>

        <p className="text-[13px] leading-relaxed text-muted">
          <Link
            href="/about#method"
            className="text-trust underline font-medium hover:text-ink"
          >
            Read the full method
          </Link>
          {' · '}Last checked {updatedDate} · Sources: {sources}
        </p>
      </div>
    </section>
  );
}
