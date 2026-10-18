'use client';

import { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { PostCard } from '@/components/blog/PostCard';
import type { BlogPost, Category } from '@/types';

interface PostFiltersProps {
  initialPosts: BlogPost[];
  categories: Category[];
}

const POSTS_PER_PAGE = 6;

export function PostFilters({ initialPosts, categories }: PostFiltersProps) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === 'all' || post.categorySlug === selectedCategory;

      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.categoryName.toLowerCase().includes(q);

      return matchesCategory && matchesQuery;
    });
  }, [initialPosts, selectedCategory, query]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE) || 1;
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(start, start + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  const handleCategoryChange = (catSlug: string) => {
    setSelectedCategory(catSlug);
    setCurrentPage(1);
  };

  const handleQueryChange = (val: string) => {
    setQuery(val);
    setCurrentPage(1);
  };

  return (
    <div>
      {/* Search Input & Category Pills Bar */}
      <div className="bg-white border border-border rounded-[20px] p-4 lg:p-6 mb-10 shadow-xs">
        {/* Search Input */}
        <div className="relative mb-5">
          <Search className="w-5 h-5 text-border-input absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder="Search guides, topics or products..."
            className="w-full pl-11 pr-10 py-3 rounded-[14px] border border-border-input text-[15px] text-ink placeholder-muted focus:outline-none focus:ring-2 focus:ring-trust focus:border-transparent"
          />
          {query && (
            <button
              type="button"
              onClick={() => handleQueryChange('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-border-input hover:text-ink"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            type="button"
            onClick={() => handleCategoryChange('all')}
            className={`px-4 py-1.5 rounded-full text-[14px] font-semibold transition-all shrink-0 whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-ink text-white shadow-xs'
                : 'bg-surface-muted text-muted hover:bg-border-light hover:text-ink'
            }`}
          >
            All
          </button>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                type="button"
                onClick={() => handleCategoryChange(cat.slug)}
                className={`px-4 py-1.5 rounded-full text-[14px] font-semibold transition-all shrink-0 whitespace-nowrap flex items-center gap-2 ${
                  isSelected
                    ? 'bg-ink text-white shadow-xs'
                    : 'bg-surface-muted text-muted hover:bg-border-light hover:text-ink'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: cat.dotColor }}
                />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Meta Counter */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-[14px] text-muted">
          Showing <span className="font-semibold text-ink">{filteredPosts.length}</span> {filteredPosts.length === 1 ? 'article' : 'articles'}
          {selectedCategory !== 'all' && ` in ${categories.find(c => c.slug === selectedCategory)?.name}`}
        </div>
      </div>

      {/* Posts Grid */}
      {paginatedPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {paginatedPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-border rounded-[var(--r-card)] p-12 text-center my-8">
          <h3 className="text-[18px] font-bold text-ink mb-2">No guides found</h3>
          <p className="text-[14px] text-muted mb-4">
            Try adjusting your search terms or select another category.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setQuery('');
            }}
            className="rounded-full border border-border bg-white px-4 py-2.5 text-[14px] font-semibold text-ink hover:bg-surface-muted transition-colors"
          >
            Reset filters
          </button>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6 border-t border-border">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              type="button"
              onClick={() => setCurrentPage(pageNum)}
              className={`inline-flex items-center justify-center min-w-[40px] px-3.5 py-2 rounded-full text-[14px] leading-[20px] font-bold transition-all ${
                pageNum === currentPage
                  ? 'bg-ink text-white shadow-xs'
                  : 'bg-white border border-border text-muted hover:bg-surface-muted hover:text-ink'
              }`}
            >
              {pageNum}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
