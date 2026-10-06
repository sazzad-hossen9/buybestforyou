import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ContactForm } from '@/components/contact/ContactForm';
import { AlertCircle, DollarSign, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us & Editorial Inquiries | buybestforyou',
  description: 'Get in touch with our editorial team. Report errors, ask buying questions, or pitch guest contributions.'
};

export default function ContactPage() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Contact' }
  ];

  return (
    <div className="bg-[#F6F7F9] min-h-screen">
      {/* Breadcrumb Bar */}
      <div className="bg-white border-b border-[#E4E7EB] py-3">
        <div className="container-page">
          <Breadcrumb items={breadcrumbs} />
        </div>
      </div>

      <main className="container-page py-10 lg:py-16">
        {/* Hero */}
        <div className="max-w-3xl mb-12">
          <div className="eyebrow text-[#B84A14] mb-2 font-bold">GET IN TOUCH</div>
          <h1 className="h-1 mb-4">
            Contact our editorial team
          </h1>
          <p className="text-body-lg text-[#5B6470]">
            Have a question about a guide, spotted a factual error, or want to contribute? We read and reply to every message.
          </p>
        </div>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Spotted an error */}
          <div className="card bg-white border border-[#E4E7EB] rounded-[16px] p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 rounded-full bg-[#FBEDE3] text-[#B34E00] flex items-center justify-center">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <h2 className="text-[18px] font-bold text-[#1A1D21]">
                  Spotted an error?
                </h2>
              </div>
              <p className="text-[14px] leading-[22px] text-[#5B6470] mb-4">
                If you found an out-of-date specification, a broken link, or a misattributed score, please tell us. We update our buying guides every week to keep research accurate.
              </p>
            </div>
            <a
              href="mailto:editorial@buybestforyou.com"
              className="text-[14px] font-bold text-[#B84A14] hover:underline flex items-center gap-1.5"
            >
              <Mail className="w-4 h-4" />
              <span>editorial@buybestforyou.com</span>
            </a>
          </div>

          {/* How we make money */}
          <div className="card bg-white border border-[#E4E7EB] rounded-[16px] p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 rounded-full bg-[#E6EFF4] text-[#2B5D7C] flex items-center justify-center">
                  <DollarSign className="w-5 h-5" />
                </div>
                <h2 className="text-[18px] font-bold text-[#1A1D21]">
                  How we make money
                </h2>
              </div>
              <p className="text-[14px] leading-[22px] text-[#5B6470] mb-4">
                We earn affiliate commissions from Amazon when you buy through our links. We never accept payment for positive reviews, top placements, or sponsored rankings.
              </p>
            </div>
            <Link
              href="/legal/affiliate-disclosure"
              className="text-[14px] font-bold text-[#2B5D7C] hover:underline"
            >
              Read our full affiliate disclosure →
            </Link>
          </div>
        </div>

        {/* Form Container */}
        <div className="max-w-3xl mb-16">
          <div className="mb-4">
            <h2 className="h-2">Send us a message</h2>
            <p className="text-caption mt-1">
              Fill out the form below and we will get back to you within 48 hours.
            </p>
          </div>
          <ContactForm />
        </div>
      </main>

      {/* Dark "Be a guest author" Band */}
      <section className="section-dark border-t border-neutral-800">
        <div className="container-page">
          <div className="max-w-2xl">
            <div className="eyebrow text-[#B4BBC4] mb-2 font-bold">CONTRIBUTE</div>
            <h2 className="text-[28px] md:text-[34px] font-extrabold text-white mb-4">
              Be a guest author
            </h2>
            <p className="text-[16px] leading-[26px] text-[#B4BBC4] mb-6">
              Are you a specialist in power tools, automotive care, or home tech? We welcome expert contributors who prioritize evidence-based testing and plain-English buying advice.
            </p>
            <a
              href="mailto:contribute@buybestforyou.com?subject=Guest%20Author%20Pitch"
              className="btn-light inline-flex items-center gap-2 font-bold"
            >
              <Mail className="w-4 h-4 text-[#1A1D21]" />
              <span>Pitch an article</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
