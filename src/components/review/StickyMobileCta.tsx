'use client';

import { useState, useEffect } from 'react';
import { AffiliateLink } from '@/components/ui/AffiliateLink';

interface StickyMobileCtaProps {
  productName: string;
  badge?: string;
  affiliateUrl: string;
}

export function StickyMobileCta({ productName, affiliateUrl }: StickyMobileCtaProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Sticky product recommendation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-border shadow-[0_-4px_16px_rgba(0,0,0,0.08)] px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom,0.75rem))]"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="font-bold text-[13.5px] text-ink truncate">
            Top pick: {productName}
          </div>
          <div className="text-[11px] text-muted">
            Affiliate link
          </div>
        </div>
        <AffiliateLink
          href={affiliateUrl}
          className="inline-flex items-center justify-center rounded-full bg-cta px-4 py-2 text-[13px] font-semibold text-white hover:bg-cta-hover transition-colors whitespace-nowrap shrink-0"
        >
          Check price
        </AffiliateLink>
      </div>
    </aside>
  );
}
