import { HeroSearch } from '@/components/home/HeroSearch';
import { EditorPickCard } from '@/components/home/EditorPickCard';

export function Hero() {
  return (
    <section className="section bg-white pt-8 pb-12 lg:pt-14 lg:pb-16">
      <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Column */}
        <div className="lg:col-span-7 space-y-5">
          {/* Tag Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E9F1F8] text-[#2B5D7C] text-[12px] sm:text-[13px] font-semibold max-w-full">
            <span className="w-2 h-2 rounded-full bg-[#2B5D7C] shrink-0" aria-hidden="true" />
            <span className="truncate">Independent buying guides · refreshed weekly</span>
          </div>

          {/* Heading (3 distinct lines on all devices matching design) */}
          <h1 className="h-display">
            Real research.<br />
            Straight answers.<br />
            No fluff.
          </h1>

          {/* Subtitle */}
          <p className="text-body-lg max-w-xl">
            Composite ratings, verified buyer data, and expert lab/press coverage, compared side by side across Automotive, Electronics, Home Appliances, and Health and Fitness.
          </p>

          {/* Interactive Search + Popular Chips */}
          <div className="max-w-xl">
            <HeroSearch />
          </div>
        </div>

        {/* Right Column: Editor's Pick Feature Card */}
        <div className="lg:col-span-5">
          <EditorPickCard />
        </div>
      </div>
    </section>
  );
}
