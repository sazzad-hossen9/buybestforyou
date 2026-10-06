import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getLegalPage } from '@/lib/data';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { TOC } from '@/components/review/TOC';
import { ShieldCheck, Calendar, Info } from 'lucide-react';

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

const LEGAL_DOCS = [
  { slug: 'affiliate-disclosure', label: 'Affiliate disclosure' },
  { slug: 'privacy-policy', label: 'Privacy policy' },
  { slug: 'terms', label: 'Terms and conditions' },
  { slug: 'disclaimer', label: 'Editorial disclaimer' }
];

export default async function LegalPage({ params }: LegalPageProps) {
  const { slug } = await params;
  const page = await getLegalPage(slug);

  if (!page) {
    notFound();
  }

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Legal' },
    { label: page.title }
  ];

  const tocItems = page.sections.map((s) => ({
    id: s.id,
    label: s.title
  }));

  return (
    <div className="bg-[#F6F7F9] min-h-screen pb-16">
      {/* Breadcrumb Bar */}
      <div className="bg-white border-b border-[#E4E7EB] py-3">
        <div className="container-page">
          <Breadcrumb items={breadcrumbs} />
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-white border-b border-[#E4E7EB] py-10 lg:py-14">
        <div className="container-page">
          <div className="max-w-3xl">
            <div className="eyebrow text-[#2B5D7C] mb-2 font-bold">LEGAL & TRANSPARENCY</div>
            <h1 className="h-1 mb-3">
              {page.title}
            </h1>
            <p className="text-body-lg text-[#5B6470] mb-4">
              {page.subtitle}
            </p>
            <div className="flex items-center gap-1.5 text-caption text-[13px] text-[#8A929C]">
              <Calendar className="w-3.5 h-3.5" />
              <span>Last updated: {page.lastUpdated}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main 2-Column Content */}
      <main className="container-page py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Sticky Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6">
            <div className="sticky top-24 space-y-6">
              {/* Document Switcher */}
              <div className="bg-white border border-[#E4E7EB] rounded-[16px] p-4 shadow-xs">
                <div className="eyebrow text-[#5B6470] mb-3 font-bold">ALL DOCUMENTS</div>
                <ul className="space-y-1.5 text-[14px]">
                  {LEGAL_DOCS.map((doc) => {
                    const isCurrent = doc.slug === slug;
                    return (
                      <li key={doc.slug}>
                        <Link
                          href={`/legal/${doc.slug}`}
                          className={`block py-1.5 px-2.5 rounded-[8px] transition-colors ${
                            isCurrent
                              ? 'bg-[#E6EFF4] text-[#2B5D7C] font-bold'
                              : 'text-[#5B6470] hover:text-[#1A1D21] hover:bg-neutral-50'
                          }`}
                        >
                          {doc.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Page TOC */}
              {tocItems.length > 0 && <TOC items={tocItems} />}
            </div>
          </aside>

          {/* Right Main Legal Prose */}
          <div className="lg:col-span-9 max-w-3xl">
            {/* Amazon Associates Highlight Callout */}
            {page.showAmazonCallout && page.amazonCalloutText && (
              <div className="mb-10 p-6 rounded-[16px] bg-[#E6EFF4] border border-[#D1E1EB] shadow-xs">
                <div className="flex items-center gap-2 mb-2.5">
                  <ShieldCheck className="w-5 h-5 text-[#2B5D7C]" />
                  <h3 className="font-bold text-[16px] text-[#2B5D7C]">
                    Amazon Associates Program Notice
                  </h3>
                </div>
                <p className="text-[14px] leading-[24px] text-[#1A1D21]">
                  {page.amazonCalloutText}
                </p>
              </div>
            )}

            {/* Sections */}
            <div className="bg-white border border-[#E4E7EB] rounded-[20px] p-6 lg:p-10 shadow-xs space-y-10">
              {page.sections.map((section, idx) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-24 border-b border-[#E4E7EB] pb-8 last:border-b-0 last:pb-0"
                >
                  <h2 className="text-[20px] font-bold text-[#1A1D21] mb-3 flex items-center gap-2">
                    <span className="text-[#8A929C] text-[15px] font-normal">{idx + 1}.</span>
                    <span>{section.title}</span>
                  </h2>
                  <p className="text-[15px] leading-[26px] text-[#1A1D21]">
                    {section.content}
                  </p>
                </section>
              ))}
            </div>

            {/* Questions Note */}
            <div className="mt-8 p-4 rounded-[14px] bg-white border border-[#E4E7EB] flex items-center gap-3 text-[14px] text-[#5B6470]">
              <Info className="w-5 h-5 text-[#2B5D7C] shrink-0" />
              <div>
                Have questions regarding this document?{' '}
                <Link href="/contact" className="text-[#2B5D7C] font-semibold underline">
                  Contact our compliance team
                </Link>.
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
