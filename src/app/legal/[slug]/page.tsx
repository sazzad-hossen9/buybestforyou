import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getLegalPage } from '@/lib/data';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

interface LegalPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: LegalPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getLegalPage(slug);
  if (!page) return { title: 'Legal Notice | buybestforyou' };

  return {
    title: `${page.title} | buybestforyou`,
    description: page.subtitle
  };
}

export async function generateStaticParams() {
  return [
    { slug: 'affiliate-disclosure' },
    { slug: 'privacy-policy' },
    { slug: 'terms' },
    { slug: 'disclaimer' }
  ];
}

const OTHER_LEGAL_DOCS = [
  { slug: 'privacy-policy', label: 'Privacy policy' },
  { slug: 'terms', label: 'Terms and conditions' },
  { slug: 'disclaimer', label: 'Disclaimer' }
];

export default async function LegalPage({ params }: LegalPageProps) {
  const { slug } = await params;
  const page = await getLegalPage(slug);

  if (!page) {
    notFound();
  }

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: page.title }
  ];

  return (
    <div className="bg-surface min-h-screen">
      <main className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-16 py-6 lg:py-10">
        {/* Breadcrumb */}
        <div className="mb-4">
          <Breadcrumb items={breadcrumbs} />
        </div>

        {/* Hero Header */}
        <header className="max-w-3xl mb-10 lg:mb-14">
          <h1 className="text-[length:var(--fs-h1)] leading-[var(--lh-h1)] tracking-[var(--ls-h1)] font-extrabold text-ink tracking-tight mb-3">{page.title}</h1>
          <p className="text-[length:var(--fs-body-lg)] leading-[var(--lh-body-lg)] text-ink mb-2">
            {page.subtitle}
          </p>
          <p className="text-[length:var(--fs-caption)] leading-[var(--lh-caption)] text-muted">
            Last updated [{page.lastUpdated || 'date'}]
          </p>
        </header>

        {/* 2-Column Content Layout: Left sidebar, Right 680px content */}
        <div className="grid grid-cols-1 lg:grid-cols-[248px_680px] justify-between gap-10 pb-16">
          {/* Left Sidebar: ON THIS PAGE + other legal links */}
          <aside className="w-full space-y-6 h-full">
            <div className="sticky top-[calc(var(--header-total-height,109px)+1.5rem)] space-y-6">
              <div>
                <h4 className="text-[12px] font-bold uppercase tracking-[0.08em] text-muted mb-3">
                  ON THIS PAGE
                </h4>
                <ul className="space-y-2 text-[14px] text-muted">
                  {page.sections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="hover:text-ink transition-colors block py-0.5"
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a
                      href="#questions"
                      className="hover:text-ink transition-colors block py-0.5"
                    >
                      Questions
                    </a>
                  </li>
                </ul>
              </div>

              {/* Other Legal Docs Links */}
              <div className="pt-2">
                <ul className="space-y-1.5 text-[13px] text-muted">
                  {OTHER_LEGAL_DOCS.map((doc) => (
                    <li key={doc.slug}>
                      <Link
                        href={`/legal/${doc.slug}`}
                        className="hover:text-ink transition-colors"
                      >
                        {doc.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          {/* Right Column: Legal Content (680px) */}
          <div className="w-full max-w-[680px] space-y-8">
            {/* Amazon Associates Highlight Box */}
            {page.showAmazonCallout && page.amazonCalloutText && (
              <div className="p-6 rounded-[var(--r-card)] bg-surface-muted border border-border">
                <p className="text-[length:var(--fs-caption)] leading-[var(--lh-caption)] leading-[22px] text-ink">
                  {page.amazonCalloutText}
                </p>
              </div>
            )}

            {/* Sections */}
            {page.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-[calc(var(--header-total-height,109px)+1.5rem)] space-y-3"
              >
                <h2 className="text-[length:var(--fs-h2)] leading-[var(--lh-h2)] tracking-[var(--ls-h2)] font-extrabold text-ink tracking-tight">
                  {section.title}
                </h2>
                <div className="text-[length:var(--fs-body)] leading-[var(--lh-body)] whitespace-pre-line space-y-3">
                  {section.content}
                </div>
              </section>
            ))}

            {/* Questions Section */}
            <section
              id="questions"
              className="scroll-mt-[calc(var(--header-total-height,109px)+1.5rem)] space-y-3 pt-2"
            >
              <h2 className="text-[28px] font-extrabold text-ink tracking-tight">
                Questions
              </h2>
              <p className="text-[16px] leading-[26px] text-ink">
                Email{' '}
                <a
                  href="mailto:info@buybestforyou.com"
                  className="text-trust underline inline-block"
                >
                  info@buybestforyou.com
                </a>{' '}
                or use the{' '}
                <Link href="/contact" className="text-trust underline inline-block">
                  contact form
                </Link>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
