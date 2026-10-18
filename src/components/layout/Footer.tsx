import Link from 'next/link';
import { getSiteConfig } from '@/lib/data';
import { Logo } from '@/components/layout/Logo';

export async function Footer() {
  const site = await getSiteConfig();

  return (
    <footer className="bg-ink text-white pt-14 pb-12 border-t border-footer-divider">
      <div className="mx-auto w-full max-w-[var(--container-max)] px-[var(--container-pad)]">
        {/* Responsive Footer Grid (1 col on mobile, 2 on tablet, exact 4-col [387px 207px 207px 207px] on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[387px_207px_207px_207px] gap-8 lg:gap-12 pb-12 border-b border-footer-divider">
          {/* Col 1: Logo & Amazon Affiliate Disclosure */}
          <div className="space-y-4">
            <Logo light />
            <div className="pt-2">
              <p className="text-[14px] font-bold uppercase tracking-[0.08em] text-white mb-2">
                {site.affiliateDisclosureFooter.title}
              </p>
              <p className="text-[14px] leading-[22px] text-on-ink">
                {site.affiliateDisclosureFooter.text}
              </p>
              <Link
                href={site.affiliateDisclosureFooter.disclaimerLinkHref}
                className="inline-block mt-3 text-[14px] font-semibold text-white underline underline-offset-4 hover:text-cta transition-colors"
              >
                {site.affiliateDisclosureFooter.disclaimerLinkLabel}
              </Link>
            </div>
          </div>

          {/* Col 2: Useful Links */}
          <div>
            <h4 className="text-[14px] font-bold uppercase tracking-[0.08em] text-white mb-3">
              {site.footerColumns.usefulLinks.title}
            </h4>
            <ul className="text-[14px] text-on-ink">
              {site.footerColumns.usefulLinks.links.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="leading-[29px] block hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Product */}
          <div>
            <h4 className="text-[14px] font-bold uppercase tracking-[0.08em] text-white mb-3">
              {site.footerColumns.product.title}
            </h4>
            <ul className="text-[14px] text-on-ink">
              {site.footerColumns.product.links.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="leading-[29px] block hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Social Links */}
          <div>
            <h4 className="text-[14px] font-bold uppercase tracking-[0.08em] text-white mb-3">
              {site.footerColumns.socialLinks.title}
            </h4>
            <ul className="text-[14px] text-on-ink">
              {site.footerColumns.socialLinks.links.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="leading-[29px] block hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Legal / Copyright Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-on-ink">
          <p>{site.copyright}</p>
          <div className="flex flex-wrap items-center gap-6">
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
