import Link from 'next/link';
import { Info } from 'lucide-react';

interface HowWeRankedProps {
  methodNote: string;
  sources?: string;
}

export function HowWeRanked({ methodNote, sources }: HowWeRankedProps) {
  return (
    <section id="how-we-ranked-these" className="mb-14 scroll-mt-24">
      <div className="rounded-[16px] bg-[#E6EFF4] border border-[#D1E1EB] p-6 lg:p-7">
        <div className="flex items-center gap-2 mb-3">
          <Info className="w-5 h-5 text-[#2B5D7C]" />
          <h2 className="text-[18px] font-bold text-[#1A1D21]">
            How we ranked these
          </h2>
        </div>

        <p className="text-[15px] leading-[24px] text-[#1A1D21] mb-5">
          {methodNote}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#D1E1EB]/60">
          <div className="bg-white/80 p-3 rounded-[12px] border border-[#D1E1EB]">
            <div className="text-[12px] text-[#5B6470] font-semibold">BUYER RATINGS</div>
            <div className="text-[18px] font-bold text-[#1A1D21]">35% weight</div>
          </div>
          <div className="bg-white/80 p-3 rounded-[12px] border border-[#D1E1EB]">
            <div className="text-[12px] text-[#5B6470] font-semibold">SPEC MATCH</div>
            <div className="text-[18px] font-bold text-[#1A1D21]">25% weight</div>
          </div>
          <div className="bg-white/80 p-3 rounded-[12px] border border-[#D1E1EB]">
            <div className="text-[12px] text-[#5B6470] font-semibold">EXPERT LABS</div>
            <div className="text-[18px] font-bold text-[#1A1D21]">25% weight</div>
          </div>
          <div className="bg-white/80 p-3 rounded-[12px] border border-[#D1E1EB]">
            <div className="text-[12px] text-[#5B6470] font-semibold">PRICE VALUE</div>
            <div className="text-[18px] font-bold text-[#1A1D21]">15% weight</div>
          </div>
        </div>

        {sources && (
          <div className="mt-4 text-[13px] text-[#5B6470]">
            <span className="font-semibold text-[#1A1D21]">Data sources: </span>
            {sources}. Read our full{' '}
            <Link href="/about" className="text-[#2B5D7C] underline font-medium hover:text-[#1A1D21]">
              methodology and testing policy
            </Link>.
          </div>
        )}
      </div>
    </section>
  );
}
