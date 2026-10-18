import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { SafeImage } from '@/components/ui/SafeImage';
import { ContactForm } from '@/components/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us | buybestforyou',
  description:
    'Questions, corrections or a product we should cover? Send us a note and we\'ll get back to you.'
};

export default function ContactPage() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Contact' }
  ];

  return (
    <div className="bg-surface min-h-screen">
      <main className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-16 py-6 lg:py-10">
        {/* Breadcrumb */}
        <div className="mb-4">
          <Breadcrumb items={breadcrumbs} />
        </div>

        {/* Header */}
        <header className="max-w-3xl mb-8 lg:mb-10">
          <h1 className="text-[length:var(--fs-h1)] leading-[var(--lh-h1)] tracking-[var(--ls-h1)] font-extrabold text-ink tracking-tight mb-3">Contact us</h1>
          <p className="text-[18px] leading-[28px] md:text-[20px] md:leading-[30px] text-muted">
            Questions, corrections or a product we should cover? Send us a note and we&apos;ll get back to you.
          </p>
        </header>

        {/* 2-Column Section: Left media & info (532px), Right form (570px) */}
        <div className="grid grid-cols-1 lg:grid-cols-[532px_570px] justify-between gap-8 lg:gap-0 items-start mb-12 lg:mb-16">
          {/* Left Column (532px) */}
          <div className="w-full lg:w-[532px] space-y-4">
            {/* Scrabble Image */}
            <div className="relative w-full aspect-[16/10] rounded-[var(--r-card-feature)] overflow-hidden bg-surface-muted border border-border">
              <SafeImage
                src="/images/contact-scrabble.jpg"
                alt="Contact Us scrabble tiles"
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* 2 Mini Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Card 1: Spotted an error? */}
              <div className="bg-tint-trust-bg rounded-[var(--r-card)] p-5 flex flex-col justify-between">
                <div>
                  <h3 className="text-[16px] font-bold text-ink mb-1.5">
                    Spotted an error?
                  </h3>
                  <p className="text-[13.5px] leading-[20px] text-ink">
                    Tell us the page and what&apos;s wrong. We fix confirmed errors and note the date.
                  </p>
                </div>
              </div>

              {/* Card 2: How we make money */}
              <div className="bg-tint-trust-bg rounded-[var(--r-card)] p-5 flex flex-col justify-between">
                <div>
                  <h3 className="text-[16px] font-bold text-ink mb-1.5">
                    How we make money
                  </h3>
                  <p className="text-[13.5px] leading-[20px] text-ink mb-3">
                    Commissions never change rankings.
                  </p>
                </div>
                <Link
                  href="/legal/affiliate-disclosure"
                  className="text-[13.5px] font-semibold text-trust hover:underline"
                >
                  Read the disclosure
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div>
            <ContactForm />
          </div>
        </div>

        {/* Be a guest author Banner */}
        <div className="rounded-[var(--r-banner)] bg-ink p-6 lg:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12">
          <div>
            <h2 className="text-[22px] lg:text-[24px] font-extrabold text-white mb-1.5">
              Be a guest author
            </h2>
            <p className="text-[14px] lg:text-[15px] text-on-ink">
              To become a guest author for buybestforyou, email us at info@buybestforyou.com.
            </p>
          </div>
          <a
            href="mailto:info@buybestforyou.com"
            className="inline-flex items-center justify-center rounded-full bg-white px-7 py-2.5 font-bold text-ink hover:bg-surface-muted transition-colors whitespace-nowrap shrink-0"
          >
            Email us
          </a>
        </div>
      </main>
    </div>
  );
}
