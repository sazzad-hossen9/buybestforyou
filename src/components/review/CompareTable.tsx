import { SafeImage } from '@/components/ui/SafeImage';
import { AffiliateLink } from '@/components/ui/AffiliateLink';
import type { Product } from '@/types';

interface CompareTableProps {
  products: Product[];
}

export function CompareTable({ products }: CompareTableProps) {
  return (
    <section id="compare-at-a-glance" className="mb-14 scroll-mt-[calc(var(--header-total-height,109px)+1.5rem)]">
      {/* Desktop / Tablet: Compare at a glance Table (md and up) */}
      <div className="hidden md:block">
        <h2 className="text-[length:var(--fs-h3)] leading-[var(--lh-h3)] tracking-[var(--ls-h3)] font-extrabold tracking-tight text-ink mb-6">Compare at a glance</h2>

        <div className="border-t border-b border-border overflow-x-auto">
          <table className="w-full text-left table-fixed border-collapse min-w-[640px]">
            <colgroup>
              <col style={{ width: '34%' }} />
              <col style={{ width: '26%' }} />
              <col style={{ width: '10%' }} />
              <col style={{ width: '13%' }} />
              <col style={{ width: '17%' }} />
            </colgroup>
            <thead>
              <tr className="border-b border-border text-[13px] font-bold text-ink">
                <th className="py-3 px-3">Product</th>
                <th className="py-3 px-3">Best for</th>
                <th className="py-3 px-3 text-center">Score</th>
                <th className="py-3 px-3 text-center">Tier</th>
                <th className="py-3 px-3 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-[length:var(--fs-caption)] leading-[var(--lh-caption)]">
              {products.map((product, idx) => {
                const name = product.tableName || product.name.split('-')[0].trim();
                const bestFor = product.bestForShort || product.bestFor;
                const anchorId = `product-${idx + 1}`;

                return (
                  <tr key={product.id} className="hover:bg-surface-muted transition-colors">
                    <td className="py-4 px-3 align-middle font-medium text-trust">
                      <a
                        href={`#${anchorId}`}
                        className="hover:underline text-trust font-medium leading-snug break-words"
                      >
                        {name}
                      </a>
                    </td>

                    <td className="py-4 px-3 align-middle text-muted leading-snug text-[13.5px]">
                      {bestFor}
                    </td>

                    <td className="py-4 px-3 align-middle text-center font-bold text-ink text-[15px]">
                      {product.compositeScore.toFixed(1)}
                    </td>

                    <td className="py-4 px-3 align-middle text-center">
                      <span className="inline-block px-2.5 py-1 rounded-full text-[length:var(--fs-eyebrow)] leading-[var(--lh-eyebrow)] tracking-[var(--ls-eyebrow)] font-medium border border-border bg-white text-ink whitespace-nowrap">
                        {product.priceTier}
                      </span>
                    </td>

                    <td className="py-4 px-3 align-middle text-right">
                      <AffiliateLink
                        href={product.affiliateUrl}
                        className="inline-flex items-center justify-center rounded-full bg-cta px-3 py-2 text-[13px] font-semibold text-white hover:bg-cta-hover transition-colors whitespace-nowrap"
                      >
                        Check price
                      </AffiliateLink>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile: Top picks at a glance List (below md) */}
      <div className="md:hidden">
        <h2 className="text-[length:var(--fs-h3)] leading-[var(--lh-h3)] tracking-[var(--ls-h3)] font-bold text-ink mb-4">Top picks at a glance</h2>
        <div className="space-y-3">
          {products.map((product, idx) => {
            const name = product.tableName || product.name.split('-')[0].trim();
            const anchorId = `product-${idx + 1}`;

            return (
              <a
                key={product.id}
                href={`#${anchorId}`}
                className="flex items-center gap-3.5 p-3 rounded-[var(--r-card)] border border-border bg-white hover:border-border-input transition-all block"
              >
                <div className="relative w-16 h-14 shrink-0 rounded-lg overflow-hidden bg-surface-muted border border-border flex items-center justify-center p-1">
                  <SafeImage
                    src={product.images[0] || '/images/placeholder.jpg'}
                    alt={product.name}
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-[15px] text-ink leading-snug truncate">
                    {name}
                  </h3>
                  <p className="text-[13px] text-muted mt-0.5">
                    Score {product.compositeScore.toFixed(1)} · {product.priceTier} tier
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
