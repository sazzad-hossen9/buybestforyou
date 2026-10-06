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
    <div className="bg-[#F6F7F9] min-h-screen pb-16">
      {/* Breadcrumb Bar */}
      <div className="border-b border-[#E4E7EB] bg-white py-3">
        <div className="container-page">
          <Breadcrumb items={breadcrumbs} />
        </div>
      </div>

      <main className="container-page py-10 lg:py-14">
        {/* Page Hero */}
        <div className="max-w-3xl mb-10">
          <div className="eyebrow text-[#B84A14] mb-2 font-bold">EDITORIAL GUIDES</div>
          <h1 className="h-1 mb-3">
            Guides, tips and teardowns
          </h1>
          <p className="text-body-lg text-[#5B6470]">
            Practical buying advice, how-to guides and product breakdowns from our category specialists.
          </p>
        </div>

        {/* Live Filter & Grid */}
        <PostFilters initialPosts={posts} categories={categories} />
      </main>
    </div>
  );
}
