import type { Metadata } from 'next';
import Image from 'next/image';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Camera, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';
import creditsData from '../../../public/data/image-credits.json';

interface ImageCreditItem {
  slug: string;
  fileName: string;
  alt: string;
  photoId: number;
  photographer: string;
  photographerUrl: string;
  originalPageUrl: string;
  downloadDate: string;
}

const credits: ImageCreditItem[] = creditsData as ImageCreditItem[];

export const metadata: Metadata = {
  title: 'Image Credits & Pixabay Licensing | buybestforyou',
  description:
    'Complete licensing transparency and attribution records for all Pixabay photography used on buybestforyou.',
};

export default function ImageCreditsPage() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Image Credits' },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb Bar */}
      <div className="bg-surface-muted border-b border-border py-3">
        <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-16">
          <Breadcrumb items={breadcrumbs} />
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-tint-elec-bg to-white py-12 md:py-16 border-b border-border">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-tint-elec-bg text-trust text-xs font-semibold mb-4 border border-tint-elec-border">
            <Camera className="w-3.5 h-3.5" />
            <span>Licensing Transparency</span>
          </div>
          <h1 className="text-[length:var(--fs-h1)] leading-[var(--lh-h1)] tracking-[var(--ls-h1)] font-extrabold text-ink tracking-tight mb-4">
            Image Credits &amp; Pixabay Licensing
          </h1>
          <p className="text-[length:var(--fs-body-lg)] leading-[var(--lh-body-lg)] text-muted leading-relaxed">
            All editorial photography on <strong className="text-ink">BuyBestForYou</strong> is sourced from the official <strong className="text-ink">Pixabay API</strong> under the{' '}
            <a
              href="https://pixabay.com/service/license-summary/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cta font-semibold underline underline-offset-4 hover:text-cta-hover transition-colors"
            >
              Pixabay Content License
            </a>
            .
          </p>
        </div>
      </section>

      {/* Licensing Policy Cards */}
      <section className="py-10 border-b border-border bg-surface-muted">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-[var(--r-card)] border border-border shadow-xs space-y-3">
              <div className="flex items-center gap-2.5 text-positive">
                <ShieldCheck className="w-5 h-5 flex-shrink-0" />
                <h2 className="font-bold text-ink text-base">Pixabay Content License Summary</h2>
              </div>
              <p className="text-[length:var(--fs-caption)] leading-[var(--lh-caption)] text-muted leading-relaxed">
                Pixabay images are free for commercial and non-commercial use. No attribution is required by the license terms, but we proudly credit every creator and provide direct links to their Pixabay profiles and original photo uploads.
              </p>
            </div>

            <div className="bg-white p-6 rounded-[var(--r-card)] border border-border shadow-xs space-y-3">
              <div className="flex items-center gap-2.5 text-trust">
                <Sparkles className="w-5 h-5 flex-shrink-0" />
                <h2 className="font-bold text-ink text-base">Local Hosting &amp; Neutral Placeholders</h2>
              </div>
              <p className="text-[length:var(--fs-caption)] leading-[var(--lh-caption)] text-muted leading-relaxed">
                Every image is downloaded, verified for visual relevance and absence of brand trademarks/close-up faces, and served locally from our static assets. Amazon product images remain neutral local placeholder blocks and are never scraped or hotlinked.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Credits Directory */}
      <section className="py-12 md:py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-[length:var(--fs-h2)] leading-[var(--lh-h2)] tracking-[var(--ls-h2)] font-bold text-ink">Attribution Directory</h2>
              <p className="text-[length:var(--fs-caption)] leading-[var(--lh-caption)] text-muted mt-1">
                Showing all {credits.length} editorial photos placed across site hubs and review articles.
              </p>
            </div>
            <div className="text-xs text-muted bg-surface-muted px-3 py-1.5 rounded-full border border-border w-fit">
              Source: Official Pixabay API
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto rounded-[var(--r-card)] border border-border shadow-xs">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface-muted text-xs font-bold text-ink uppercase tracking-wider border-b border-border">
                <tr>
                  <th scope="col" className="py-3.5 px-4 w-28">Preview</th>
                  <th scope="col" className="py-3.5 px-4">Section / Slot</th>
                  <th scope="col" className="py-3.5 px-4">Contributor</th>
                  <th scope="col" className="py-3.5 px-4">Pixabay Page</th>
                  <th scope="col" className="py-3.5 px-4">License</th>
                  <th scope="col" className="py-3.5 px-4 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-white">
                {credits.map((item) => (
                  <tr key={item.slug} className="hover:bg-surface-muted transition-colors">
                    <td className="py-3 px-4">
                      <div className="relative w-20 h-14 rounded-md overflow-hidden bg-surface-muted border border-border">
                        <Image
                          src={`/images/${item.fileName}`}
                          alt={item.alt}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-ink">{item.slug}</div>
                      <div className="text-xs text-muted font-mono mt-0.5">{item.fileName}</div>
                    </td>
                    <td className="py-3 px-4">
                      <a
                        href={item.photographerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-medium text-trust hover:text-cta hover:underline transition-colors"
                      >
                        <span>@{item.photographer}</span>
                        <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                      </a>
                    </td>
                    <td className="py-3 px-4">
                      <a
                        href={item.originalPageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-muted hover:text-ink hover:underline transition-colors"
                      >
                        <span>Photo #{item.photoId}</span>
                        <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                      </a>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-block px-2.5 py-1 text-xs font-medium rounded-full bg-pros-bg text-positive border border-tint-home-border">
                        Pixabay License
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-xs text-muted font-mono">
                      {item.downloadDate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile / Tablet Cards View */}
          <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
            {credits.map((item) => (
              <div
                key={item.slug}
                className="bg-white rounded-[var(--r-card)] border border-border p-4 shadow-xs flex flex-col gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-20 h-14 rounded-md overflow-hidden bg-surface-muted border border-border flex-shrink-0">
                    <Image
                      src={`/images/${item.fileName}`}
                      alt={item.alt}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-sm text-ink truncate">{item.slug}</h3>
                    <p className="text-xs text-muted font-mono truncate">{item.fileName}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 text-[11px] font-medium rounded-full bg-pros-bg text-positive">
                      Pixabay License
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-border text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-muted">Contributor:</span>
                    <a
                      href={item.photographerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-trust hover:underline"
                    >
                      <span>@{item.photographer}</span>
                      <ExternalLink className="w-3 h-3 opacity-70" />
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted">Pixabay Page:</span>
                    <a
                      href={item.originalPageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-muted hover:underline"
                    >
                      <span>Photo #{item.photoId}</span>
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Product Media Policy Note */}
          <div className="mt-12 bg-surface-muted rounded-[var(--r-card)] border border-border p-6 text-sm text-muted">
            <h3 className="font-bold text-ink mb-2">Notice on Product &amp; Manufacturer Media</h3>
            <p className="leading-relaxed">
              Product card thumbnails (such as <code>gardena-mower.jpg</code>, <code>rtk-mower.jpg</code>, and <code>paint-pen-thumb-1.jpg</code> through <code>paint-pen-thumb-4.jpg</code>) are neutral placeholder visual representations. We do not scrape, re-host, or hotlink Amazon product media or manufacturer copyrighted catalog photos without license rights.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
