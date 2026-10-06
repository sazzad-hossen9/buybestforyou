import { ScoreRing } from '@/components/ui/ScoreRing';
import { SafeImage } from '@/components/ui/SafeImage';
import { AffiliateLink } from '@/components/ui/AffiliateLink';
import { ExternalLink } from 'lucide-react';
import type { Product } from '@/types';

interface CompareTableProps {
  products: Product[];
}

export function CompareTable({ products }: CompareTableProps) {
  return (
    <section id="compare-at-a-glance" className="mb-14 scroll-mt-24">
      <div className="mb-4">
        <h2 className="h-2 mb-1">Compare at a glance</h2>
        <p className="text-caption">
          Ratings based on composite score, not hands-on testing. See methodology below.
        </p>
      </div>

      <div className="bg-white border border-[#E4E7EB] rounded-[16px] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[680px]">
            <thead>
              <tr className="bg-[#F6F7F9] border-b border-[#E4E7EB] text-[13px] font-bold text-[#5B6470] uppercase tracking-wider">
                <th className="py-3.5 px-4">Model</th>
                <th className="py-3.5 px-4">Best For</th>
                <th className="py-3.5 px-4">Coverage & Sound</th>
                <th className="py-3.5 px-4 text-center">Score</th>
                <th className="py-3.5 px-4 text-center">Price Tier</th>
                <th className="py-3.5 px-4 text-right">Price Check</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E7EB] text-[14px]">
              {products.map((product, idx) => {
                const coverage = product.specs['Cutting area capacity'] || product.specs['Type'] || 'Standard';
                const sound = product.specs['Sound level'] || 'Standard';

                return (
                  <tr key={product.id} className="hover:bg-neutral-50/70 transition-colors">
                    <td className="py-4 px-4 font-semibold text-[#1A1D21]">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg bg-neutral-100 overflow-hidden shrink-0 border border-[#E4E7EB]">
                          <SafeImage
                            src={product.images[0] || '/images/placeholder.jpg'}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <a href={`#product-${idx + 1}`} className="hover:text-[#B84A14] font-bold text-[#1A1D21] transition-colors block">
                            {product.brand} {product.name.split('-')[0].trim()}
                          </a>
                          <span className="text-[12px] font-normal text-[#5B6470]">
                            {product.ratingCategory}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-[#5B6470] max-w-[200px]">
                      <span className="line-clamp-2">{product.bestFor}</span>
                    </td>

                    <td className="py-4 px-4 text-[#1A1D21] text-[13px]">
                      <div className="font-medium">{coverage}</div>
                      <div className="text-[#5B6470]">{sound}</div>
                    </td>

                    <td className="py-4 px-4 text-center">
                      <div className="inline-flex justify-center">
                        <ScoreRing score={product.compositeScore} size={42} strokeWidth={3.5} />
                      </div>
                    </td>

                    <td className="py-4 px-4 text-center">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[12px] font-semibold bg-neutral-100 text-[#1A1D21]">
                        {product.priceTier}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-right">
                      <AffiliateLink
                        href={product.affiliateUrl}
                        className="btn-cta text-[13px] py-1.5 px-3 whitespace-nowrap inline-flex items-center gap-1"
                      >
                        <span>Check price</span>
                        <ExternalLink className="w-3 h-3" />
                      </AffiliateLink>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
