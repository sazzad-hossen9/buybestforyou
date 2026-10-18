import { HeroSearch } from "@/components/home/HeroSearch";
import { EditorPickCard } from "@/components/home/EditorPickCard";

export function Hero() {
  return (
    <section className="bg-white py-[var(--section-py)]">
      <div className="mx-auto w-full max-w-[var(--container-max)] px-[var(--container-pad)] grid grid-cols-1 lg:grid-cols-[1fr_504px] gap-14  ">
        {/* Left Column */}
        <div className="">
          {/* Tag Pill */}
          <div className=" mt-[35px] inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tint-elec-bg text-trust text-[12px] sm:text-[13.5px] font-bold max-w-full">
            <span
              className="w-2 h-2 rounded-full bg-trust shrink-0"
              aria-hidden="true"
            />
            <span className="truncate md:text-sm">
              Independent buying Guides · refreshed weekly
            </span>
          </div>

          {/* Heading (3 distinct lines on all devices matching design) */}
          <h1 className=" mt-[30px] font-extrabold text-ink text-[length:var(--fs-display)] leading-[var(--lh-display)] tracking-[var(--ls-display)]">
            Real research.
            <br />
            Straight answers.
            <br />
            No fluff.
          </h1>

          {/* Subtitle */}
          <p className=" mt-[20px] text-[length:var(--fs-body-lg)] leading-[var(--lh-body-lg)]  font-medium text-ink max-w-[540px]">
            Composite ratings, verified buyer data, and expert lab/press
            coverage, compared side by side across Automotive, Electronics, Home
            Appliances, and Health and Fitness.
          </p>

          {/* Interactive Search + Popular Chips */}
          <div className="max-w-xl mt-[22px]">
            <HeroSearch />
          </div>
        </div>

        {/* Right Column: Editor's Pick Feature Card */}
        <div className="w-full max-w-[504px] mx-auto lg:mx-0 lg:ml-4.5">
          <EditorPickCard />
        </div>
      </div>
    </section>
  );
}
