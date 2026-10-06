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
      <div className="bg-white border border-[#E4E7EB] rounded-[20px] p-4 lg:p-6 mb-10 shadow-xs">
        {/* Search Input */}
        <div className="relative mb-5">
          <Search className="w-5 h-5 text-[#8A929C] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder="Search guides, topics or products..."
            className="w-full pl-11 pr-10 py-3 rounded-[14px] border border-[#8A929C] text-[15px] text-[#1A1D21] placeholder-[#5B6470] focus:outline-none focus:ring-2 focus:ring-[#2B5D7C] focus:border-transparent"
          />
          {query && (
            <button
              type="button"
              onClick={() => handleQueryChange('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8A929C] hover:text-[#1A1D21]"
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
            className={`px-4 py-1.5 rounded-full text-[14px] font-semibold transition-all shrink-0 ${
              selectedCategory === 'all'
                ? 'bg-[#1A1D21] text-white shadow-xs'
                : 'bg-[#F6F7F9] text-[#5B6470] hover:bg-neutral-200 hover:text-[#1A1D21]'
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
                className={`px-4 py-1.5 rounded-full text-[14px] font-semibold transition-all shrink-0 flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#1A1D21] text-white shadow-xs'
                    : 'bg-[#F6F7F9] text-[#5B6470] hover:bg-neutral-200 hover:text-[#1A1D21]'
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
        <div className="text-[14px] text-[#5B6470]">
          Showing <span className="font-semibold text-[#1A1D21]">{filteredPosts.length}</span> {filteredPosts.length === 1 ? 'article' : 'articles'}
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
        <div className="bg-white border border-[#E4E7EB] rounded-[16px] p-12 text-center my-8">
          <h3 className="text-[18px] font-bold text-[#1A1D21] mb-2">No guides found</h3>
          <p className="text-[14px] text-[#5B6470] mb-4">
            Try adjusting your search terms or select another category.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setQuery('');
            }}
            className="btn-secondary text-[14px]"
          >
            Reset filters
          </button>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6 border-t border-[#E4E7EB]">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              type="button"
              onClick={() => setCurrentPage(pageNum)}
              className={`w-10 h-10 rounded-[12px] text-[14px] font-bold transition-all ${
                pageNum === currentPage
                  ? 'bg-[#1A1D21] text-white shadow-xs'
                  : 'bg-white border border-[#E4E7EB] text-[#5B6470] hover:bg-neutral-50 hover:text-[#1A1D21]'
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
