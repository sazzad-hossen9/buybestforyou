import type { Metadata } from 'next';
import { getPosts, getCategories } from '@/lib/data';
import { PostFilters } from '@/components/blog/PostFilters';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export const metadata: Metadata = {
  title: 'Guides, Tips and Teardowns | buybestforyou',
  description: 'Practical buying advice, how-to guides and product breakdowns from our category specialists.'
};

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    getPosts(),
    getCategories()
  ]);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Guides & Articles' }
  ];

  return (
    <div className="bg-surface-muted min-h-screen pb-16">
      {/* Breadcrumb Bar */}
      <div className="border-b border-border bg-white py-3">
        <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-16">
          <Breadcrumb items={breadcrumbs} />
        </div>
      </div>

      <main className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-16 py-10 lg:py-14">
        {/* Page Hero */}
        <div className="max-w-3xl mb-10">
          <div className="text-[12px] uppercase tracking-wider text-cta mb-2 font-bold">EDITORIAL GUIDES</div>
          <h1 className="text-[length:var(--fs-h1)] leading-[var(--lh-h1)] tracking-[var(--ls-h1)] font-extrabold text-ink tracking-tight mb-3">
            Guides, tips and teardowns
          </h1>
          <p className="text-[18px] leading-[28px] text-muted">
            Practical buying advice, how-to guides and product breakdowns from our category specialists.
          </p>
        </div>

        {/* Live Filter & Grid */}
        <PostFilters initialPosts={posts} categories={categories} />
      </main>
    </div>
  );
}
