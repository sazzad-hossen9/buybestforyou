import type { Metadata } from 'next';
import Link from 'next/link';
import { getSearchIndex, getCategories } from '@/lib/data';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { SearchBox } from '@/components/ui/SearchBox';
import { ScoreRing } from '@/components/ui/ScoreRing';
import { ArrowRight, Search, FileText } from 'lucide-react';

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export const metadata: Metadata = {
  title: 'Search Results | buybestforyou',
  description: 'Search buying guides, product reviews, and expert teardowns.',
  robots: {
    index: false,
    follow: true
  }
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = (q || '').trim().toLowerCase();

  const [allIndexItems, categories] = await Promise.all([
    getSearchIndex(),
    getCategories()
  ]);

  const results = query
    ? allIndexItems.filter((item) => {
        return (
          item.title.toLowerCase().includes(query) ||
          item.excerpt.toLowerCase().includes(query) ||
          item.categoryName.toLowerCase().includes(query)
        );
      })
    : [];

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Search' }
  ];

  return (
    <div className="bg-[#F6F7F9] min-h-screen pb-16">
      <div className="bg-white border-b border-[#E4E7EB] py-3">
        <div className="container-page">
          <Breadcrumb items={breadcrumbs} />
        </div>
      </div>

      <main className="container-page py-10 lg:py-14 max-w-4xl">
        <div className="mb-8">
          <h1 className="h-1 mb-3">
            Search results
          </h1>
          <p className="text-body text-[#5B6470] mb-6">
            {query ? (
              <>
                Found <span className="font-bold text-[#1A1D21]">{results.length}</span> {results.length === 1 ? 'match' : 'matches'} for &ldquo;<span className="font-semibold text-[#1A1D21]">{q}</span>&rdquo;
              </>
            ) : (
              'Enter a keyword or product name to search across all guides and reviews.'
            )}
          </p>

          <SearchBox initialQuery={q} placeholder="Search guides, products, and categories..." />
        </div>

        {results.length > 0 ? (
          <div className="space-y-4">
            {results.map((item) => (
              <div
                key={item.id}
                className="card bg-white border border-[#E4E7EB] rounded-[16px] p-5 hover:border-[#8A929C] transition-all shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: item.categoryDot || '#2B5D7C' }}
                    />
                    <span className="text-[12px] font-bold text-[#5B6470] uppercase">
                      {item.categoryName}
                    </span>
                    <span className="text-neutral-300">•</span>
                    <span className="text-[11px] font-semibold text-[#2B5D7C] bg-[#E9F1F8] px-2 py-0.5 rounded-full uppercase">
                      {item.type}
                    </span>
                  </div>

                  <h3 className="font-bold text-[18px] text-[#1A1D21] hover:text-[#B84A14] transition-colors mb-1.5">
                    <Link href={item.url}>
                      {item.title}
                    </Link>
                  </h3>

                  <p className="text-[14px] leading-[22px] text-[#5B6470] line-clamp-2">
                    {item.excerpt}
                  </p>
                </div>

                <div className="flex items-center gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-100 w-full sm:w-auto justify-between sm:justify-end">
                  {item.score && (
                    <ScoreRing score={item.score} size={42} strokeWidth={3.5} />
                  )}
                  <Link
                    href={item.url}
                    className="btn-secondary text-[13px] py-1.5 px-3 flex items-center gap-1 font-semibold"
                  >
                    <span>View</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : query ? (
          <div className="bg-white border border-[#E4E7EB] rounded-[16px] p-10 text-center">
            <div className="w-12 h-12 rounded-full bg-neutral-100 text-[#8A929C] flex items-center justify-center mx-auto mb-3">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-[18px] font-bold text-[#1A1D21] mb-2">
              No matching results found
            </h3>
            <p className="text-[14px] text-[#5B6470] mb-6 max-w-md mx-auto">
              We couldn’t find anything matching &ldquo;{q}&rdquo;. Try browsing one of our main categories below:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="chip-category bg-neutral-50 hover:bg-neutral-100 border-[#E4E7EB]"
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: cat.dotColor }}
                  />
                  <span>{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white border border-[#E4E7EB] rounded-[16px] p-8 text-center">
            <FileText className="w-10 h-10 text-[#8A929C] mx-auto mb-3" />
            <h3 className="text-[16px] font-bold text-[#1A1D21] mb-1">
              Popular searches
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
              {['robot lawn mower', 'scratch fix paint pen', 'pressure washer', 'dash cam'].map((term) => (
                <Link
                  key={term}
                  href={`/search?q=${encodeURIComponent(term)}`}
                  className="px-3 py-1.5 rounded-full text-[13px] font-medium bg-[#F6F7F9] text-[#1A1D21] hover:bg-neutral-200"
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
