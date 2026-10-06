import Link from 'next/link';
import { getCategories, getReviews } from '@/lib/data';
import { SearchBox } from '@/components/ui/SearchBox';
import { SafeImage } from '@/components/ui/SafeImage';
import { ArrowRight, Clock } from 'lucide-react';

export default async function NotFound() {
  const [categories, reviews] = await Promise.all([
    getCategories(),
    getReviews()
  ]);

  const featuredGuides = reviews.slice(0, 3);

  return (
    <div className="bg-[#F6F7F9] min-h-screen py-16 lg:py-24">
      <div className="container-page max-w-4xl">
        {/* Error Hero */}
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 rounded-full text-[12px] font-bold bg-[#FBEDE3] text-[#B34E00] uppercase tracking-wider mb-3">
            ERROR 404
          </div>
          <h1 className="h-display mb-4 text-[#1A1D21]">
            That page has moved or never existed.
          </h1>
          <p className="text-body-lg text-[#5B6470] max-w-2xl mx-auto mb-8">
            Try searching for what you need, or jump to one of our main product categories below.
          </p>

          {/* Search Box */}
          <div className="max-w-lg mx-auto mb-8">
            <SearchBox placeholder="Search buying guides, products, or reviews..." />
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="chip-category bg-white hover:bg-neutral-50 transition-all border-[#E4E7EB] hover:border-[#8A929C] shadow-2xs"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: cat.dotColor }}
                />
                <span className="text-[14px] font-semibold text-[#1A1D21]">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Start with our latest guides */}
        <div className="mt-16 pt-12 border-t border-[#E4E7EB]">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <div className="eyebrow text-[#5B6470] mb-1 font-bold">RECOMMENDED</div>
              <h2 className="h-2">Or start with our latest guides</h2>
            </div>
            <Link
              href="/"
              className="text-[14px] font-bold text-[#B84A14] hover:underline flex items-center gap-1"
            >
              <span>Back to home</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredGuides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/reviews/${guide.slug}`}
                className="group card bg-white border border-[#E4E7EB] rounded-[16px] p-5 hover:border-[#8A929C] hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-16/10 rounded-[12px] bg-neutral-100 overflow-hidden mb-3.5 border border-[#E4E7EB]">
                    <SafeImage
                      src={guide.featuredImage || '/images/placeholder.jpg'}
                      alt={guide.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="flex items-center gap-2 text-[12px] text-[#5B6470] mb-2">
                    <span className="font-semibold text-[#2B5D7C]">{guide.categoryName}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {guide.readTimeMinutes} min read
                    </span>
                  </div>

                  <h3 className="font-bold text-[16px] text-[#1A1D21] group-hover:text-[#B84A14] transition-colors leading-snug line-clamp-2">
                    {guide.title}
                  </h3>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-[13px] font-bold text-[#B84A14]">
                  <span>Read guide</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
