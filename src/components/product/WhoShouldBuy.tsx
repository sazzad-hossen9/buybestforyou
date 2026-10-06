import { CheckCircle2, XCircle } from 'lucide-react';

interface WhoShouldBuyProps {
  goodFit: string;
  lookElsewhere: string;
}

export function WhoShouldBuy({ goodFit, lookElsewhere }: WhoShouldBuyProps) {
  return (
    <section className="mb-12">
      <div className="mb-6">
        <div className="eyebrow text-[#5B6470] mb-1 font-bold">DECISION GUIDE</div>
        <h2 className="h-2">Who should buy it</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Good fit */}
        <div className="panel-pros flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-5 h-5 text-[#007A58]" />
              <h3 className="font-bold text-[16px] text-[#007A58]">
                A good fit if...
              </h3>
            </div>
            <p className="text-[14px] leading-[24px] text-[#1A1D21]">
              {goodFit}
            </p>
          </div>
        </div>

        {/* Look elsewhere */}
        <div className="panel-cons flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <XCircle className="w-5 h-5 text-[#B34E00]" />
              <h3 className="font-bold text-[16px] text-[#B34E00]">
                Look elsewhere if...
              </h3>
            </div>
            <p className="text-[14px] leading-[24px] text-[#1A1D21]">
              {lookElsewhere}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
