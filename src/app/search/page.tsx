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
    <div className="bg-surface-muted min-h-screen pb-16">
      <div className="bg-white border-b border-border py-3">
        <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-16">
          <Breadcrumb items={breadcrumbs} />
        </div>
      </div>

      <main className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-16 py-10 lg:py-14">
        <div className="mb-8">
          <h1 className="text-[length:var(--fs-h1)] leading-[var(--lh-h1)] tracking-[var(--ls-h1)] font-extrabold text-ink tracking-tight mb-3">
            Search results
          </h1>
          <p className="text-[length:var(--fs-body)] leading-[var(--lh-body)] text-muted mb-6">
            {query ? (
              <>
                Found <span className="font-bold text-ink">{results.length}</span> {results.length === 1 ? 'match' : 'matches'} for &ldquo;<span className="font-semibold text-ink">{q}</span>&rdquo;
              </>
            ) : (
              'Enter a keyword or product name to search across all guides and reviews.'
            )}
          </p>

          <div className="w-full max-w-[560px]">
            <SearchBox initialQuery={q} placeholder="Search guides, products, and categories..." />
          </div>
        </div>

        {results.length > 0 ? (
          <div className="space-y-4">
            {results.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-border rounded-[var(--r-card)] p-5 hover:border-border-input transition-all shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: item.categoryDot || 'var(--trust)' }}
                    />
                    <span className="text-[12px] font-bold text-muted uppercase">
                      {item.categoryName}
                    </span>
                    <span className="text-muted">•</span>
                    <span className="text-[11px] font-semibold text-trust bg-tint-trust-bg px-2 py-0.5 rounded-full uppercase">
                      {item.type}
                    </span>
                  </div>

                  <h3 className="font-bold text-[18px] text-ink hover:text-cta transition-colors mb-1.5">
                    <Link href={item.url}>
                      {item.title}
                    </Link>
                  </h3>

                  <p className="text-[14px] leading-[22px] text-muted line-clamp-2">
                    {item.excerpt}
                  </p>
                </div>

                <div className="flex items-center gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-border w-full sm:w-auto justify-between sm:justify-end">
                  {item.score && (
                    <ScoreRing score={item.score} size={42} strokeWidth={3.5} />
                  )}
                  <Link
                    href={item.url}
                    className="rounded-full border border-border bg-white px-3 py-1.5 text-[13px] font-semibold text-ink hover:bg-surface-muted transition-colors flex items-center gap-1"
                  >
                    <span>View</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : query ? (
          <div className="bg-white border border-border rounded-[var(--r-card)] p-10 text-center">
            <div className="w-12 h-12 rounded-full bg-surface-muted text-border-input flex items-center justify-center mx-auto mb-3">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-[18px] font-bold text-ink mb-2">
              No matching results found
            </h3>
            <p className="text-[14px] text-muted mb-6 max-w-md mx-auto">
              We couldn’t find anything matching &ldquo;{q}&rdquo;. Try browsing one of our main categories below:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-surface-muted text-ink hover:bg-border-light text-[13px] font-medium transition-colors"
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
          <div className="bg-white border border-border rounded-[var(--r-card)] p-8 text-center">
            <FileText className="w-10 h-10 text-border-input mx-auto mb-3" />
            <h3 className="text-[16px] font-bold text-ink mb-1">
              Popular searches
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
              {['robot lawn mower', 'scratch fix paint pen', 'pressure washer', 'dash cam'].map((term) => (
                <Link
                  key={term}
                  href={`/search?q=${encodeURIComponent(term)}`}
                  className="px-3 py-1.5 rounded-full text-[13px] font-medium bg-surface-muted text-ink hover:bg-border-light"
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
