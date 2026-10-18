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

      <div className="bg-surface-muted border-b border-border py-3">
        <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-16">
          <Breadcrumb items={breadcrumbs} />
        </div>
      </div>

      <main className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-16 py-8 lg:py-12">
        {/* Article Headline & Meta */}
        <header className="max-w-3xl mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-tint-auto-dot"></span>
            <span className="text-[13px] font-bold uppercase tracking-wider text-tint-auto-dot">
              {post.tag || post.categoryName}
            </span>
          </div>

          <h1 className="text-[length:var(--fs-h1)] leading-[var(--lh-h1)] tracking-[var(--ls-h1)] font-extrabold text-ink tracking-tight mb-4">
            {post.title}
          </h1>

          <p className="text-[18px] leading-[28px] text-muted mb-5">
            {post.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-[14px] text-muted pt-2 border-t border-border">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-border-input" />
              Updated {post.updatedDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-border-input" />
              {post.readTimeMinutes} min read
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-trust" />
              By {author?.name || 'Marcus Webb'}
            </span>
          </div>
        </header>

        {/* Hero Image */}
        {post.heroImage && (
          <div className="max-w-4xl relative aspect-16/9 rounded-[var(--r-card-feature)] bg-surface-muted overflow-hidden mb-12 border border-border">
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
        <div className="grid grid-cols-1 lg:grid-cols-[268px_1fr] gap-10">
          {/* Left Sticky TOC */}
          <aside className="hidden lg:block w-full h-full">
            <div className="sticky top-[calc(var(--header-total-height,109px)+1.5rem)] space-y-6">
              <TOC items={tocItems} />

              <div className="p-4 rounded-full bg-tint-trust-bg border border-tint-trust-border text-[13px] text-ink">
                <div className="font-bold mb-1 text-trust">Editorial notice</div>
                <p className="text-muted text-[12px] leading-relaxed">
                  We verify repair techniques through mechanical guides and expert consensus.
                </p>
              </div>
            </div>
          </aside>

          {/* Right Article Body */}
          <article className="w-full min-w-0">
            {/* The Short Answer Callout */}
            <div id="the-short-answer" className="p-6 rounded-[var(--r-card)] bg-tint-elec-bg border border-tint-elec-border mb-10 scroll-mt-[calc(var(--header-total-height,109px)+1.5rem)]">
              <div className="text-[12px] uppercase tracking-wider text-trust mb-1 font-bold">THE SHORT ANSWER</div>
              <p className="text-[16px] leading-[26px] text-ink font-medium">
                {post.shortAnswer}
              </p>
            </div>

            {/* Step-by-Step Content */}
            <div className="space-y-8 mb-10">
              {post.steps.map((step) => (
                <section
                  key={step.stepNumber}
                  id={`step-${step.stepNumber}`}
                  className="scroll-mt-[calc(var(--header-total-height,109px)+1.5rem)] border-b border-border pb-8 last:border-b-0"
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="w-7 h-7 rounded-full bg-ink text-white flex items-center justify-center font-bold text-[13px]">
                      {step.stepNumber}
                    </span>
                    <h2 className="text-[20px] leading-[26px] font-bold text-ink capitalize">
                      {step.title}
                    </h2>
                  </div>
                  <p className="text-[18px] leading-[30px] text-ink pl-9">
                    {step.content}
                  </p>
                </section>
              ))}
            </div>

            {/* Inline Product Recommendation */}
            {post.inlineProduct && (
              <div id="our-recommendation" className="scroll-mt-[calc(var(--header-total-height,109px)+1.5rem)]">
                <ProductInlineCard {...post.inlineProduct} />
              </div>
            )}

            {/* Common Mistakes */}
            {post.commonMistakes && post.commonMistakes.length > 0 && (
              <section id="common-mistakes" className="mb-12 scroll-mt-[calc(var(--header-total-height,109px)+1.5rem)] p-6 rounded-[var(--r-card)] bg-cons-bg border border-tint-auto-border">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-negative" />
                  <h3 className="font-bold text-[18px] text-negative">
                    Common mistakes to avoid
                  </h3>
                </div>
                <ul className="space-y-2.5 text-[15px] text-ink">
                  {post.commonMistakes.map((mistake, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-negative font-bold select-none">•</span>
                      <span>{mistake}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Affiliate Commission Disclosure Box */}
            <div className="mb-12 p-4 rounded-full bg-surface-muted border border-border text-[13px] text-muted leading-relaxed">
              <strong className="font-bold text-ink">Affiliate Disclosure: </strong>
              {post.affiliateDisclosureText}{' '}
              <Link href="/legal/affiliate-disclosure" className="text-trust underline font-medium">
                Read our full disclosure
              </Link>.
            </div>

            {/* Author Box */}
            <div id="about-the-author" className="scroll-mt-24">
              {author && <AuthorBox author={author} />}
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <section className="mt-14 pt-10 border-t border-border">
                <div className="mb-6">
                  <div className="text-[12px] uppercase tracking-wider text-muted mb-1 font-bold">MORE ARTICLES</div>
                  <h2 className="text-[24px] leading-[30px] md:text-[28px] md:leading-[34px] font-extrabold text-ink tracking-tight">Keep reading</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {relatedPosts.map((rPost) => (
                    <Link
                      key={rPost.slug}
                      href={`/blog/${rPost.slug}`}
                      className="group bg-white border border-border rounded-[var(--r-card)] p-4 hover:border-border-input transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="relative aspect-16/10 rounded-[var(--r-thumb)] bg-surface-muted overflow-hidden mb-3 border border-border">
                          <SafeImage
                            src={rPost.heroImage || '/images/placeholder.jpg'}
                            alt={rPost.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h4 className="font-bold text-[15px] text-ink group-hover:text-cta transition-colors leading-snug line-clamp-2">
                          {rPost.title}
                        </h4>
                      </div>
                      <div className="mt-3 pt-2 border-t border-border flex items-center justify-between text-[12px] font-bold text-cta">
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
