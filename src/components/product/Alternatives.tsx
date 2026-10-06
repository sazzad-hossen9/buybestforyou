import Link from 'next/link';
import { ScoreRing } from '@/components/ui/ScoreRing';
import { ArrowRight } from 'lucide-react';

interface AlternativeItem {
  title: string;
  badge: string;
  score: number;
  tier: string;
  slug?: string;
}

interface AlternativesProps {
  alternatives: AlternativeItem[];
}

export function Alternatives({ alternatives }: AlternativesProps) {
  if (!alternatives || alternatives.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="mb-6">
        <div className="eyebrow text-[#5B6470] mb-1 font-bold">OTHER OPTIONS</div>
        <h2 className="h-2">Alternatives to consider</h2>
        <p className="text-caption mt-1">
          If this product doesn’t fit your exact requirements, these alternative picks scored highest in our tests.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {alternatives.map((item, idx) => (
          <div
            key={idx}
            className="p-5 rounded-[16px] bg-white border border-[#E4E7EB] hover:border-[#8A929C] transition-all flex flex-col justify-between shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#1A1D21] text-white">
                  {item.badge}
                </span>
                <span className="text-[12px] font-semibold text-[#5B6470]">
                  {item.tier}
                </span>
              </div>

              <h3 className="font-bold text-[16px] text-[#1A1D21] mb-3 leading-snug">
                {item.title}
              </h3>
            </div>

            <div className="pt-3 border-t border-[#E4E7EB] flex items-center justify-between">
              <ScoreRing score={item.score} size={38} strokeWidth={3} />
              <Link
                href={item.slug ? `/product/${item.slug}` : '/reviews/best-car-scratch-remover-2026'}
                className="text-[13px] font-bold text-[#B84A14] hover:underline flex items-center gap-1"
              >
                <span>Compare</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
