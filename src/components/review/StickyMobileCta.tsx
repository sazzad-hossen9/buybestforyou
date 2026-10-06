'use client';

import { useState, useEffect } from 'react';
import { AffiliateLink } from '@/components/ui/AffiliateLink';
import { ExternalLink } from 'lucide-react';

interface StickyMobileCtaProps {
  productName: string;
  badge: string;
  affiliateUrl: string;
}

export function StickyMobileCta({ productName, badge, affiliateUrl }: StickyMobileCtaProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show once scrolled down 400px
      if (window.scrollY > 400) {
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
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#1A1D21] text-white p-3 shadow-2xl border-t border-neutral-700 animate-slide-up">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="min-w-0 flex-1">
          <div className="text-[11px] font-bold text-[#E9F1F8] uppercase tracking-wider truncate">
            {badge || 'Top Pick'}
          </div>
          <div className="text-[13px] font-semibold text-white truncate">
            {productName}
          </div>
        </div>
        <AffiliateLink
          href={affiliateUrl}
          className="btn-cta text-[13px] py-2 px-3.5 whitespace-nowrap shrink-0 flex items-center gap-1 shadow-md"
        >
          <span>Check price</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </AffiliateLink>
      </div>
    </div>
  );
}
