import Link from 'next/link';
import { getSiteConfig } from '@/lib/data';
import { Logo } from '@/components/layout/Logo';

export async function Footer() {
  const site = await getSiteConfig();

  return (
    <footer className="bg-[#1A1D21] text-white pt-14 pb-12 border-t border-white/10">
      <div className="container-page">
        {/* Desktop 4-column layout */}
        <div className="hidden md:grid md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-white/10">
          {/* Col 1: Logo & Amazon Affiliate Disclosure */}
          <div className="md:col-span-5 lg:col-span-5 space-y-5">
            <Logo light />
            <div>
              <p className="eyebrow text-[#B4BBC4] tracking-wider mb-2 font-bold">
                {site.affiliateDisclosureFooter.title}
              </p>
              <p className="text-[13.5px] leading-[22px] text-[#B4BBC4]">
                {site.affiliateDisclosureFooter.text}
              </p>
              <Link
                href={site.affiliateDisclosureFooter.disclaimerLinkHref}
                className="inline-block mt-3 text-[14px] font-semibold text-white underline underline-offset-4 hover:text-[#B84A14] transition-colors"
              >
                {site.affiliateDisclosureFooter.disclaimerLinkLabel}
              </Link>
            </div>
          </div>

          {/* Col 2: Useful Links */}
          <div className="md:col-span-2 lg:col-span-2 space-y-4">
            <h4 className="eyebrow text-white tracking-wider font-bold">
              {site.footerColumns.usefulLinks.title}
            </h4>
            <ul className="space-y-2.5 text-[14px] text-[#B4BBC4]">
              {site.footerColumns.usefulLinks.links.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Product */}
          <div className="md:col-span-3 lg:col-span-3 space-y-4">
            <h4 className="eyebrow text-white tracking-wider font-bold">
              {site.footerColumns.product.title}
            </h4>
            <ul className="space-y-2.5 text-[14px] text-[#B4BBC4]">
              {site.footerColumns.product.links.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Social Links */}
          <div className="md:col-span-2 lg:col-span-2 space-y-4">
            <h4 className="eyebrow text-white tracking-wider font-bold">
              {site.footerColumns.socialLinks.title}
            </h4>
            <ul className="space-y-2.5 text-[14px] text-[#B4BBC4]">
              {site.footerColumns.socialLinks.links.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mobile Condensed Footer View (from Mobile Screenshot 11) */}
        <div className="md:hidden space-y-6 pb-8 border-b border-white/10">
          <Logo light />
          <p className="text-[13px] leading-[20px] text-[#B4BBC4]">
            As an Amazon Associate, we earn from qualifying purchases at no additional cost to you.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-[13.5px] text-[#B4BBC4]">
            <Link href="/about" className="hover:text-white">About</Link>
            <Link href="/blog" className="hover:text-white">Blog</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
            <Link href="/legal/affiliate-disclosure" className="hover:text-white">Disclosure</Link>
            <Link href="/legal/privacy-policy" className="hover:text-white">Privacy</Link>
            <Link href="/legal/terms" className="hover:text-white">Terms</Link>
          </div>
        </div>

        {/* Bottom Legal / Copyright Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[13px] text-[#B4BBC4]">
          <p>{site.copyright}</p>
          <div className="flex items-center gap-6">
            <Link
              href="/legal/privacy-policy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/legal/terms"
              className="hover:text-white transition-colors"
            >
              Terms and conditions
            </Link>
            <Link
              href="/legal/disclaimer"
              className="hover:text-white transition-colors"
            >
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
