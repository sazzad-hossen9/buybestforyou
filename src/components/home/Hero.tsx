import { HeroSearch } from '@/components/home/HeroSearch';
import { EditorPickCard } from '@/components/home/EditorPickCard';

export function Hero() {
  return (
    <section className="bg-white py-[var(--section-py)]">
      <div className="mx-auto w-full max-w-[var(--container-max)] px-[var(--container-pad)] grid grid-cols-1 lg:grid-cols-[1fr_504px] gap-10 lg:gap-12 items-center">
        {/* Left Column */}
        <div className="space-y-5">
          {/* Tag Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tint-elec-bg text-trust text-[12px] sm:text-[13px] font-semibold max-w-full">
            <span className="w-2 h-2 rounded-full bg-trust shrink-0" aria-hidden="true" />
            <span className="truncate">Independent buying guides · refreshed weekly</span>
          </div>

          {/* Heading (3 distinct lines on all devices matching design) */}
          <h1 className="font-extrabold text-ink text-[length:var(--fs-display)] leading-[var(--lh-display)] tracking-[var(--ls-display)]">
            Real research.<br />
            Straight answers.<br />
            No fluff.
          </h1>

          {/* Subtitle */}
          <p className="text-[length:var(--fs-body-lg)] leading-[var(--lh-body-lg)] text-ink max-w-xl">
            Composite ratings, verified buyer data, and expert lab/press coverage, compared side by side across Automotive, Electronics, Home Appliances, and Health and Fitness.
          </p>

          {/* Interactive Search + Popular Chips */}
          <div className="max-w-xl">
            <HeroSearch />
          </div>
        </div>

        {/* Right Column: Editor's Pick Feature Card */}
        <div className="w-full max-w-[504px] mx-auto lg:mx-0">
          <EditorPickCard />
        </div>
      </div>
    </section>
  );
}
