import type { Metadata } from 'next';
import Link from 'next/link';
import { getAuthors } from '@/lib/data';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Check, X, ShieldCheck, Scale, Award, FileSearch, ArrowRight, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us & How We Test | buybestforyou',
  description: 'Learn about our research methodology, editorial ethics, composite scoring formulas, and team of specialists.'
};

export default async function AboutPage() {
  const authors = await getAuthors();

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'About & Methodology' }
  ];

  const scoringSteps = [
    {
      num: 1,
      title: 'Verified Buyer Ratings',
      weight: '35% weight',
      icon: Scale,
      desc: 'We analyze hundreds of verified customer purchases, discounting short-term unboxing praise and isolating long-term durability feedback past 6 months of use.'
    },
    {
      num: 2,
      title: 'Spec Match to Claims',
      weight: '25% weight',
      icon: FileSearch,
      desc: 'We cross-reference advertised specifications against real measured output, motor wattage, battery life ratings, and material compositions.'
    },
    {
      num: 3,
      title: 'Expert Lab Coverage',
      weight: '25% weight',
      icon: Award,
      desc: 'We synthesize teardowns, independent diagnostic reports, and specialized testing lab findings from around the industry.'
    },
    {
      num: 4,
      title: 'Value for Price Tier',
      weight: '15% weight',
      icon: ShieldCheck,
      desc: 'We rank products based on relative value within their price tier (Budget, Mid, Premium) rather than raw dollar figures alone.'
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb Bar */}
      <div className="bg-[#F6F7F9] border-b border-[#E4E7EB] py-3">
        <div className="container-page">
          <Breadcrumb items={breadcrumbs} />
        </div>
      </div>

      {/* Blue Tinted Hero */}
      <section className="bg-[#E6EFF4] border-b border-[#D1E1EB] py-12 lg:py-16">
        <div className="container-page">
          <div className="max-w-3xl">
            <div className="eyebrow text-[#2B5D7C] mb-2 font-bold">ABOUT BUYBESTFORYOU</div>
            <h1 className="h-1 mb-4">
              We read the evidence so you can buy with confidence
            </h1>
            <p className="text-body-lg text-[#1A1D21]">
              Most review websites test a handful of samples in an afternoon. We analyze hundreds of real owner experiences, teardowns, and verified specifications to find what genuinely lasts.
            </p>
          </div>
        </div>
      </section>

      {/* What We Do / What We Don't */}
      <section className="container-page py-14 lg:py-18">
        <div className="max-w-3xl mb-8">
          <div className="eyebrow text-[#5B6470] mb-1 font-bold">EDITORIAL PRINCIPLES</div>
          <h2 className="h-2">What we do, and what we don’t</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* What We Do */}
          <div className="panel-pros">
            <h3 className="font-bold text-[18px] text-[#007A58] mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#007A58] text-white flex items-center justify-center text-[13px] font-bold">
                ✓
              </span>
              What we do
            </h3>
            <ul className="space-y-3.5 text-[15px] text-[#1A1D21]">
              <li className="flex items-start gap-2.5">
                <Check className="w-5 h-5 text-[#007A58] shrink-0 mt-0.5" />
                <span>Aggregate verified owner reviews across 6–18 months of real-world use to detect premature failures.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-5 h-5 text-[#007A58] shrink-0 mt-0.5" />
                <span>Dissect manufacturer spec sheets for misleading claims, marketing buzzwords, and hidden caveats.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-5 h-5 text-[#007A58] shrink-0 mt-0.5" />
                <span>Cross-reference independent teardowns, repairability scores, and public safety recall databases.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-5 h-5 text-[#007A58] shrink-0 mt-0.5" />
                <span>Update our buying guides weekly as firmware updates, product revisions, and market prices fluctuate.</span>
              </li>
            </ul>
          </div>

          {/* What We Don't */}
          <div className="panel-cons">
            <h3 className="font-bold text-[18px] text-[#B34E00] mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#B34E00] text-white flex items-center justify-center text-[13px] font-bold">
                ✕
              </span>
              What we don’t
            </h3>
            <ul className="space-y-3.5 text-[15px] text-[#1A1D21]">
              <li className="flex items-start gap-2.5">
                <X className="w-5 h-5 text-[#B34E00] shrink-0 mt-0.5" />
                <span>We do not pretend to conduct physical laboratory tests when our research is composite analysis.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <X className="w-5 h-5 text-[#B34E00] shrink-0 mt-0.5" />
                <span>We do not accept free review units, paid ranking placements, or sponsored endorsements from brands.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <X className="w-5 h-5 text-[#B34E00] shrink-0 mt-0.5" />
                <span>We do not cloak affiliate links or hide our commercial relationship with Amazon.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <X className="w-5 h-5 text-[#B34E00] shrink-0 mt-0.5" />
                <span>We do not publish unverified AI summaries without expert editorial review and human verification.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* How We Score */}
      <section className="bg-[#F6F7F9] border-y border-[#E4E7EB] py-14 lg:py-20">
        <div className="container-page">
          <div className="max-w-3xl mb-12">
            <div className="eyebrow text-[#5B6470] mb-1 font-bold">SCORING METHODOLOGY</div>
            <h2 className="h-2 mb-3">How we score products</h2>
            <p className="text-body text-[#5B6470]">
              Every item featured on buybestforyou receives a composite score from 1.0 to 5.0, calculated transparently from four fixed criteria.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {scoringSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="card bg-white border border-[#E4E7EB] rounded-[16px] p-6 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-full bg-[#E6EFF4] text-[#2B5D7C] flex items-center justify-center font-bold text-[16px]">
                        {step.num}
                      </div>
                      <span className="text-[12px] font-bold text-[#007A58] bg-[#E8F2EB] px-2.5 py-0.5 rounded-full">
                        {step.weight}
                      </span>
                    </div>

                    <h3 className="font-bold text-[17px] text-[#1A1D21] mb-2.5">
                      {step.title}
                    </h3>

                    <p className="text-[14px] leading-[22px] text-[#5B6470]">
                      {step.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-neutral-100 flex items-center gap-1.5 text-[12px] font-semibold text-[#2B5D7C]">
                    <Icon className="w-4 h-4" />
                    <span>Independent factor</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Editorial Team */}
      <section className="container-page py-14 lg:py-20">
        <div className="max-w-3xl mb-12">
          <div className="eyebrow text-[#5B6470] mb-1 font-bold">THE TEAM</div>
          <h2 className="h-2 mb-3">Who is behind each category</h2>
          <p className="text-body text-[#5B6470]">
            Our specialists focus deeply on individual sectors, monitoring spec revisions, warranty changes, and owner communities daily.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {authors.map((author) => (
            <div
              key={author.slug}
              className="card bg-white border border-[#E4E7EB] rounded-[16px] p-6 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-[18px] text-white mb-4 shadow-xs"
                  style={{ backgroundColor: author.avatarBg }}
                >
                  {author.initials}
                </div>

                <h3 className="font-bold text-[18px] text-[#1A1D21] mb-1">
                  {author.name}
                </h3>

                <div className="text-[13px] font-semibold text-[#2B5D7C] mb-3">
                  {author.role}
                </div>

                <p className="text-[13px] leading-[20px] text-[#5B6470]">
                  {author.persona}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#E4E7EB]">
                <Link
                  href="/contact"
                  className="text-[12px] font-bold text-[#B84A14] hover:underline flex items-center gap-1"
                >
                  <span>Contact editor</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dark "Found a mistake? Tell us" Band */}
      <section className="section-dark border-t border-neutral-800">
        <div className="container-page">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-[#B4BBC4]" />
              <div className="eyebrow text-[#B4BBC4] font-bold">FACT-CHECKING POLICY</div>
            </div>
            <h2 className="text-[28px] md:text-[34px] font-extrabold text-white mb-4">
              Found a mistake? Tell us
            </h2>
            <p className="text-[16px] leading-[26px] text-[#B4BBC4] mb-6">
              If an item has been discontinued, recalled, or had its specifications altered by the manufacturer, let us know. We reward vigilant readers with swift corrections.
            </p>
            <Link
              href="/contact"
              className="btn-light inline-flex items-center gap-2 font-bold"
            >
              <span>Report a correction</span>
              <ArrowRight className="w-4 h-4 text-[#1A1D21]" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
