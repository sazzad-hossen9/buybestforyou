import Link from 'next/link';
import { SafeImage } from '@/components/ui/SafeImage';
import type { Product } from '@/types';

interface WinnersGridProps {
  products?: Product[];
}

export function WinnersGrid({ products }: WinnersGridProps) {
  // Curated showcase matching Homepage design screenshot 1
  const curatedProducts = [
    {
      pill: 'Automotive',
      dotColor: '#7A4E2D',
      category: 'Automotive Parts & Accessories',
      title: 'Paint Pen for Automotive',
      score: 4.7,
      tier: 'Budget',
      description: 'Paint Pen for Automotive has as the go-to choice, offering unparalleled ease and finesse in restoring your vehicle\'s flawless exterior.',
      date: 'Updated July 2026',
      image: '/images/paint-pen-hero.jpg',
      url: '/product/scratch-fix-paint-pen',
    },
    {
      pill: 'Vacuum',
      dotColor: '#3A8452',
      category: 'Vacuum Cleaner',
      title: 'Vacuum cleaner with retractable cord',
      score: 4.5,
      tier: 'Mid',
      description: 'Step into the world of effortless cleaning with the remarkable convenience of a vacuum cleaner with a retractable cord!',
      date: 'Updated July 2026',
      image: '/images/vacuum-hero.jpg',
      url: '/product/vacuum-cleaner-retractable-cord',
    },
    {
      pill: 'Projector',
      dotColor: '#2E6FA3',
      category: 'Projector',
      title: 'Best projectors in daylight',
      score: 4.6,
      tier: 'Premium',
      description: 'Welcome to the World of Enhanced Daylight Viewing – Discover the Best Projectors in daylight for Crisp and Vibrant Visuals!',
      date: 'Updated July 2026',
      image: '/images/projector-hero.jpg',
      url: '/product/best-projectors-in-daylight',
    },
    {
      pill: 'Health',
      dotColor: '#B23A5C',
      category: 'Health and Fitness',
      title: 'The Best Infrared Face Mask for 2025',
      score: 4.4,
      tier: 'Premium',
      description: 'Discover the best infrared face mask to rejuvenate your skin, reduce wrinkles, and improve texture. Perfect for at-home skincare treatments.',
      date: 'Updated July 2026',
      image: '/images/facemask-hero.jpg',
      url: '/product/best-infrared-face-mask',
    },
  ];

  // Curated showcase matching Homepage design screenshot 1
  const displayProducts = curatedProducts;
  void products;

  return (
    <section className="section bg-white pt-2">
      <div className="container-page">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="eyebrow mb-1">EDITOR&apos;S PICKS</p>
            <h2 className="h-2">Winners we&apos;d buy first</h2>
          </div>
          <Link
            href="/category/automotive"
            className="text-[14px] font-semibold text-[#2B5D7C] hover:text-[#1A1D21] transition-colors"
          >
            See all top picks →
          </Link>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.map((item, idx) => (
            <div
              key={idx}
              className="card flex flex-col justify-between hover:shadow-md transition-all duration-200"
            >
              <div>
                {/* Media with top-left category badge */}
                <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-[#F6F7F9]">
                  <span className="absolute top-2.5 left-2.5 z-10 pill-dark text-[12px] px-2.5 py-0.5">
                    {item.pill}
                  </span>
                  <SafeImage
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                    className="object-cover"
                  />
                </div>

                {/* Category Dot & Name */}
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: item.dotColor }}
                    aria-hidden="true"
                  />
                  <span className="text-[12.5px] font-semibold text-[#5B6470] truncate">
                    {item.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="h-3 text-[#1A1D21] mb-2 line-clamp-2">
                  {item.title}
                </h3>

                {/* Score & Tier */}
                <div className="flex items-center gap-1.5 text-[13.5px] mb-3">
                  <span className="text-[#B84A14] font-bold">★ {item.score.toFixed(1)}</span>
                  <span className="text-[#5B6470]">composite · {item.tier}</span>
                </div>

                {/* Description */}
                <p className="text-[13.5px] leading-[20px] text-[#5B6470] line-clamp-3 mb-4">
                  {item.description}
                </p>
              </div>

              {/* Bottom Action */}
              <div className="pt-3 border-t border-[#E4E7EB] mt-auto">
                <p className="text-[12px] text-[#5B6470] mb-3">{item.date}</p>
                <Link
                  href={item.url}
                  className="btn-cta btn-block text-center py-2 text-[14px]"
                >
                  See top picks
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
