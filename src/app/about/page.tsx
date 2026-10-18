import type { Metadata } from 'next';
import Link from 'next/link';
import { getAuthors } from '@/lib/data';

export const metadata: Metadata = {
  title: 'About Us & How We Test | buybestforyou',
  description:
    'BuyBestForYou is an independent buying-guide site. We compare manufacturer specifications, verified buyer ratings and expert coverage, then publish a score and show our working.'
};

export default async function AboutPage() {
  const authors = await getAuthors();

  const scoringSteps = [
    {
      num: '1',
      title: 'Gather',
      desc: 'Collect specs from manufacturers and ratings from verified buyers.'
    },
    {
      num: '2',
      title: 'Cross-check',
      desc: 'Compare claims against expert and lab coverage.'
    },
    {
      num: '3',
      title: 'Score',
      desc: 'Combine weighted inputs into a composite out of 5.'
    },
    {
      num: '4',
      title: 'Update',
      desc: 'Re-check on a schedule and date every change.'
    }
  ];

  return (
    <div className="bg-surface min-h-screen">
      {/* Blue Tinted Hero */}
      <section className="bg-tint-trust-bg py-[var(--section-py)]">
        <div className="mx-auto w-full max-w-[var(--container-max)] px-[var(--container-pad)]">
          <div className="max-w-4xl">
            <p className="text-[length:var(--fs-eyebrow)] leading-[var(--lh-eyebrow)] tracking-[var(--ls-eyebrow)] uppercase text-trust mb-2.5 font-bold">ABOUT AND METHOD</p>
            <h1 className="text-[length:var(--fs-h1)] leading-[var(--lh-h1)] tracking-[var(--ls-h1)] font-extrabold text-ink mb-4">
              We read the evidence so you can buy with confidence.
            </h1>
            <p className="text-[length:var(--fs-subhero)] leading-[var(--lh-subhero)] text-ink">
              BuyBestForYou is an independent buying-guide site. We compare manufacturer specifications, verified buyer ratings and expert coverage, then publish a score and show our working.
            </p>
          </div>
        </div>
      </section>

      {/* What We Do / What We Don't */}
      <section className="py-12 lg:py-16 bg-surface">
        <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-16">
          <div className="max-w-3xl mb-8">
            <h2 className="text-[length:var(--fs-h2)] leading-[var(--lh-h2)] tracking-[var(--ls-h2)] font-extrabold text-ink tracking-tight mb-1.5">What we do, and what we don’t</h2>
            <p className="text-[14px] leading-[20px] text-muted">Plain statements, so you can judge us.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* We Do Box */}
            <div className="rounded-[var(--r-card)] bg-pros-bg border border-border p-7">
              <h3 className="font-bold text-[17px] text-ink mb-4">We do</h3>
              <ul className="space-y-3 text-[14.5px] leading-[22px] text-ink">
                <li className="flex items-start gap-2.5">
                  <span className="text-ink font-bold select-none">•</span>
                  <span>Compare manufacturer specs, verified buyer ratings and expert coverage</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-ink font-bold select-none">•</span>
                  <span>Show the inputs and weights behind every score</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-ink font-bold select-none">•</span>
                  <span>Put a name and a date on every page</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-ink font-bold select-none">•</span>
                  <span>Disclose affiliate links beside every call to action</span>
                </li>
              </ul>
            </div>

            {/* We Don't Box */}
            <div className="rounded-[var(--r-card)] bg-cons-bg border border-border p-7">
              <h3 className="font-bold text-[17px] text-ink mb-4">We don’t</h3>
              <ul className="space-y-3 text-[14.5px] leading-[22px] text-ink">
                <li className="flex items-start gap-2.5">
                  <span className="text-ink font-bold select-none">•</span>
                  <span>Claim to have tested products we haven’t</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-ink font-bold select-none">•</span>
                  <span>Let commissions change a ranking</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-ink font-bold select-none">•</span>
                  <span>Publish fake reviews or invented quotes</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-ink font-bold select-none">•</span>
                  <span>Show static prices that may be out of date</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How We Score */}
      <section className="py-12 lg:py-16 bg-surface pt-0">
        <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-16">
          <div className="mb-6">
            <h2 className="text-[length:var(--fs-h2)] leading-[var(--lh-h2)] tracking-[var(--ls-h2)] font-extrabold text-ink tracking-tight">How we score</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {scoringSteps.map((step) => (
              <div
                key={step.num}
                className="rounded-[var(--r-card)] bg-white border border-border p-6 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-full bg-ink text-white flex items-center justify-center font-bold text-[14px] mb-4">
                    {step.num}
                  </div>
                  <h3 className="text-[20px] leading-[26px] font-bold text-ink mb-2">{step.title}</h3>
                  <p className="text-[14px] leading-[20px] text-muted">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[13px] text-muted">
            Sample weights shown in reviews are placeholders until final methodology is confirmed.
          </p>
        </div>
      </section>

      {/* Our Editors */}
      <section className="bg-surface-muted py-12 lg:py-16">
        <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-16">
          <div className="max-w-2xl mb-8">
            <h2 className="text-[length:var(--fs-h2)] leading-[var(--lh-h2)] tracking-[var(--ls-h2)] font-extrabold text-ink tracking-tight mb-1.5">Our editors</h2>
            <p className="text-[14px] leading-[20px] text-muted">
              Each category has a named editor responsible for its research and updates. [Personas are placeholders]
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
            {authors.map((author) => (
              <div
                key={author.slug}
                className="rounded-[var(--r-card)] bg-white border border-border p-6 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-[15px] mb-4"
                    style={{ backgroundColor: author.avatarBg }}
                  >
                    {author.initials}
                  </div>
                  <h3 className="text-[17px] font-bold text-ink mb-0.5">
                    {author.name}
                  </h3>
                  <p className="text-[12.5px] font-medium text-muted mb-3">
                    {author.role}
                  </p>
                  <p className="text-[13.5px] leading-[20px] text-ink">
                    {author.persona}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Found a mistake Banner */}
          <div className="rounded-[var(--r-banner)] bg-ink p-6 lg:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h3 className="text-[20px] lg:text-[22px] font-extrabold text-white mb-1.5">
                Found a mistake?
              </h3>
              <p className="text-[14px] lg:text-[15px] text-on-ink">
                We correct confirmed errors and note the date on the page.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-white px-7 py-2.5 font-bold text-ink hover:bg-surface-muted transition-colors whitespace-nowrap shrink-0"
            >
              Tell us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
