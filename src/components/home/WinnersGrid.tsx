import Link from "next/link";
import { SafeImage } from "@/components/ui/SafeImage";
import type { Product } from "@/types";

interface WinnersGridProps {
  products?: Product[];
}

export function WinnersGrid({ products }: WinnersGridProps) {
  // Curated showcase matching Homepage design screenshot 1
  const curatedProducts = [
    {
      pill: "Automotive",
      dotColor: "var(--tint-auto-dot)",
      category: "Automotive Parts & Accessories",
      title: "Paint Pen for Automotive",
      score: 4.7,
      tier: "Budget",
      description:
        "Paint Pen for Automotive has as the go-to choice, offering unparalleled ease and finesse in restoring your vehicle's flawless exterior.",
      date: "Updated July 2026",
      image: "/images/paint-pen-hero.jpg",
      url: "/product/scratch-fix-paint-pen",
    },
    {
      pill: "Vacuum",
      dotColor: "var(--tint-home-dot)",
      category: "Vacuum Cleaner",
      title: "Vacuum cleaner with retractable cord",
      score: 4.5,
      tier: "Mid",
      description:
        "Step into the world of effortless cleaning with the remarkable convenience of a vacuum cleaner with a retractable cord!",
      date: "Updated July 2026",
      image: "/images/vacuum-hero.jpg",
      url: "/product/vacuum-cleaner-retractable-cord",
    },
    {
      pill: "Projector",
      dotColor: "var(--tint-elec-dot)",
      category: "Projector",
      title: "Best projectors in daylight",
      score: 4.6,
      tier: "Premium",
      description:
        "Welcome to the World of Enhanced Daylight Viewing – Discover the Best Projectors in daylight for Crisp and Vibrant Visuals!",
      date: "Updated July 2026",
      image: "/images/projector-hero.jpg",
      url: "/product/best-projectors-in-daylight",
    },
    {
      pill: "Health",
      dotColor: "var(--tint-health-dot)",
      category: "Health and Fitness",
      title: "The Best Infrared Face Mask for 2025",
      score: 4.4,
      tier: "Premium",
      description:
        "Discover the best infrared face mask to rejuvenate your skin, reduce wrinkles, and improve texture. Perfect for at-home skincare treatments.",
      date: "Updated July 2026",
      image: "/images/facemask-hero.jpg",
      url: "/product/best-infrared-face-mask",
    },
  ];

  const displayProducts = curatedProducts;
  void products;

  return (
    <section className=" md:py-14 md:mb-16 lg:py-[30px] bg-white pt-2">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-16">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-[length:var(--fs-eyebrow)] leading-[var(--lh-eyebrow)] tracking-[var(--ls-eyebrow)] font-bold uppercase tracking-[0.08em] text-muted mb-1">
              EDITOR&apos;S PICKS
            </p>
            <h2 className="text-[length:var(--fs-h2)] leading-[var(--lh-h2)] tracking-[var(--ls-h2)] font-extrabold tracking-tight text-ink">
              Winners we&apos;d buy first
            </h2>
          </div>
          <Link
            href="/category/automotive"
            className="text-[length:var(--fs-caption)] leading-[var(--lh-caption)] font-semibold text-trust hover:text-ink transition-colors"
          >
            See all top picks →
          </Link>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {displayProducts.map((item, idx) => (
            <div
              key={idx}
              className="bg-surface border border-border rounded-[var(--r-card)] overflow-hidden shadow-[var(--sh-card)] flex flex-col justify-between hover:shadow-[var(--sh-card-hover)] transition-all duration-200"
            >
              {/* Media with top-left category badge: full-bleed 150px */}
              <div className="relative w-full h-[175px] overflow-hidden bg-surface-muted">
                <span className="absolute top-2.5 left-2.5 z-10 rounded-full bg-ink text-white font-semibold text-[11px] px-2.5 py-0.5">
                  {item.pill}
                </span>
                <SafeImage
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                  className="object-cover "
                />
              </div>

              {/* Card Body: 20px padding */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Category Dot & Name */}
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: item.dotColor }}
                      aria-hidden="true"
                    />
                    <span className="text-[12.5px] font-semibold text-muted truncate">
                      {item.category}
                    </span>
                  </div>
                  {/* Title */}
                  <h3 className="text-[length:var(--fs-h3)] leading-[var(--lh-h3)] tracking-[var(--ls-h3)] font-bold tracking-tight text-ink mb-1 ">
                    {item.title}
                  </h3>
                  {/* Score & Tier */}
                  <div className="flex items-center gap-1.5 text-[13.5px] mb-3">
                    <span className="text-star">★</span>
                    <span className="font-bold text-ink">
                      {item.score.toFixed(1)}
                    </span>
                    <span className="text-muted">composite · {item.tier}</span>
                  </div>
                  {/* Description */}
                  <p className="text-[14px] leading-[20px] text-muted line-clamp-3 mb-4">
                    {item.description}
                  </p>{" "}
                  <p className="text-[14px] text-muted mb-3">{item.date}</p>
                </div>

                {/* Bottom Action */}
                <div className="">
                  <Link
                    href={item.url}
                    className="inline-flex items-center justify-center rounded-xl bg-cta px-6 py-2.5 text-[14px] leading-[20px] font-semibold text-white shadow-xs hover:bg-cta-hover transition-colors select-none text-center w-full"
                  >
                    See top picks
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
