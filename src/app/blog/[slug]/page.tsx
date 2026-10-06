import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  getPostBySlug,
  getPosts,
  getAuthorBySlug,
  getCategoryBySlug
} from '@/lib/data';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { SafeImage } from '@/components/ui/SafeImage';
import { TOC } from '@/components/review/TOC';
import { ProductInlineCard } from '@/components/blog/ProductInlineCard';
import { AuthorBox } from '@/components/review/AuthorBox';
import { Calendar, Clock, UserCheck, AlertTriangle, ArrowRight } from 'lucide-react';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Article Not Found | buybestforyou' };

  return {
    title: `${post.title} | buybestforyou`,
    description: post.excerpt.slice(0, 155),
    openGraph: {
      title: post.title,
      description: post.excerpt.slice(0, 155),
      type: 'article',
      images: [post.heroImage || '/images/og-default.jpg']
    }
  };
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const [author, category, allPosts] = await Promise.all([
    getAuthorBySlug(post.authorSlug),
    getCategoryBySlug(post.categorySlug),
    getPosts()
  ]);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: category?.name || post.categoryName, href: `/category/${post.categorySlug}` },
    { label: post.title }
  ];

  // TOC items
  const tocItems = [
    { id: 'the-short-answer', label: 'The short answer' },
    ...post.steps.map((s) => ({
      id: `step-${s.stepNumber}`,
      label: `Step ${s.stepNumber}: ${s.title}`
    })),
    ...(post.inlineProduct ? [{ id: 'our-recommendation', label: 'Recommended product' }] : []),
    ...(post.commonMistakes && post.commonMistakes.length > 0
      ? [{ id: 'common-mistakes', label: 'Common mistakes to avoid' }]
      : []),
    { id: 'about-the-author', label: 'About the author' }
  ];

  const relatedPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.heroImage,
    dateModified: post.updatedDate,
    author: {
      '@type': 'Person',
      name: author?.name || 'Marcus Webb'
    },
    publisher: {
      '@type': 'Organization',
      name: 'buybestforyou'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-[#F6F7F9] border-b border-[#E4E7EB] py-3">
        <div className="container-page">
          <Breadcrumb items={breadcrumbs} />
        </div>
      </div>

      <main className="container-page py-8 lg:py-12">
        {/* Article Headline & Meta */}
        <header className="max-w-3xl mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#7A4E2D]"></span>
            <span className="text-[13px] font-bold uppercase tracking-wider text-[#7A4E2D]">
              {post.tag || post.categoryName}
            </span>
          </div>

          <h1 className="h-1 mb-4">
            {post.title}
          </h1>

          <p className="text-body-lg text-[#5B6470] mb-5">
            {post.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-caption text-[14px] text-[#5B6470] pt-2 border-t border-[#E4E7EB]">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#8A929C]" />
              Updated {post.updatedDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#8A929C]" />
              {post.readTimeMinutes} min read
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-[#2B5D7C]" />
              By {author?.name || 'Marcus Webb'}
            </span>
          </div>
        </header>

        {/* Hero Image */}
        {post.heroImage && (
          <div className="max-w-4xl relative aspect-16/9 rounded-[20px] bg-neutral-100 overflow-hidden mb-12 border border-[#E4E7EB]">
            <SafeImage
              src={post.heroImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* 2-Column Article Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Sticky TOC */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24 space-y-6">
              <TOC items={tocItems} />

              <div className="p-4 rounded-[14px] bg-[#E6EFF4] border border-[#D1E1EB] text-[13px] text-[#1A1D21]">
                <div className="font-bold mb-1 text-[#2B5D7C]">Editorial notice</div>
                <p className="text-[#5B6470] text-[12px] leading-relaxed">
                  We verify repair techniques through mechanical guides and expert consensus.
                </p>
              </div>
            </div>
          </aside>

          {/* Right Article Body */}
          <article className="lg:col-span-9 max-w-3xl">
            {/* The Short Answer Callout */}
            <div id="the-short-answer" className="callout-blue mb-10 scroll-mt-24">
              <div className="eyebrow text-[#2B5D7C] mb-1 font-bold">THE SHORT ANSWER</div>
              <p className="text-[16px] leading-[26px] text-[#1A1D21] font-medium">
                {post.shortAnswer}
              </p>
            </div>

            {/* Step-by-Step Content */}
            <div className="space-y-8 mb-10">
              {post.steps.map((step) => (
                <section
                  key={step.stepNumber}
                  id={`step-${step.stepNumber}`}
                  className="scroll-mt-24 border-b border-[#E4E7EB] pb-8 last:border-b-0"
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="w-7 h-7 rounded-full bg-[#1A1D21] text-white flex items-center justify-center font-bold text-[13px]">
                      {step.stepNumber}
                    </span>
                    <h2 className="text-[20px] font-bold text-[#1A1D21] capitalize">
                      {step.title}
                    </h2>
                  </div>
                  <p className="text-[16px] leading-[26px] text-[#1A1D21] pl-9">
                    {step.content}
                  </p>
                </section>
              ))}
            </div>

            {/* Inline Product Recommendation */}
            {post.inlineProduct && (
              <div id="our-recommendation" className="scroll-mt-24">
                <ProductInlineCard {...post.inlineProduct} />
              </div>
            )}

            {/* Common Mistakes */}
            {post.commonMistakes && post.commonMistakes.length > 0 && (
              <section id="common-mistakes" className="mb-12 scroll-mt-24 p-6 rounded-[16px] bg-[#FBEDE3] border border-[#F0D5DF]">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-[#B34E00]" />
                  <h3 className="font-bold text-[18px] text-[#B34E00]">
                    Common mistakes to avoid
                  </h3>
                </div>
                <ul className="space-y-2.5 text-[15px] text-[#1A1D21]">
                  {post.commonMistakes.map((mistake, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#B34E00] font-bold select-none">•</span>
                      <span>{mistake}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Affiliate Commission Disclosure Box */}
            <div className="mb-12 p-4 rounded-[14px] bg-[#F6F7F9] border border-[#E4E7EB] text-[13px] text-[#5B6470] leading-relaxed">
              <span className="font-bold text-[#1A1D21]">Affiliate Disclosure: </span>
              {post.affiliateDisclosureText}{' '}
              <Link href="/legal/affiliate-disclosure" className="text-[#2B5D7C] underline font-medium">
                Read our full disclosure
              </Link>.
            </div>

            {/* Author Box */}
            <div id="about-the-author" className="scroll-mt-24">
              {author && <AuthorBox author={author} />}
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <section className="mt-14 pt-10 border-t border-[#E4E7EB]">
                <div className="mb-6">
                  <div className="eyebrow text-[#5B6470] mb-1 font-bold">MORE ARTICLES</div>
                  <h2 className="h-2">Keep reading</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {relatedPosts.map((rPost) => (
                    <Link
                      key={rPost.slug}
                      href={`/blog/${rPost.slug}`}
                      className="group card bg-white border border-[#E4E7EB] rounded-[16px] p-4 hover:border-[#8A929C] transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="relative aspect-16/10 rounded-[10px] bg-neutral-100 overflow-hidden mb-3 border border-[#E4E7EB]">
                          <SafeImage
                            src={rPost.heroImage || '/images/placeholder.jpg'}
                            alt={rPost.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h4 className="font-bold text-[15px] text-[#1A1D21] group-hover:text-[#B84A14] transition-colors leading-snug line-clamp-2">
                          {rPost.title}
                        </h4>
                      </div>
                      <div className="mt-3 pt-2 border-t border-neutral-100 flex items-center justify-between text-[12px] font-bold text-[#B84A14]">
                        <span>Read guide</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </article>
        </div>
      </main>
    </>
  );
}
