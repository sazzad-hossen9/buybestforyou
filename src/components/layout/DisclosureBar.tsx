import Link from 'next/link';

interface DisclosureBarProps {
  className?: string;
}

export function DisclosureBar({ className = '' }: DisclosureBarProps) {
  return (
    <div
      className={`disclosure-bar border-b border-[#D1E1EB] ${className}`}
      role="region"
      aria-label="Affiliate disclosure"
    >
      <div className="container-page flex items-center justify-between gap-3 min-w-0">
        <div className="flex items-center gap-2 text-[12.5px] md:text-[14px] text-[#1A1D21] min-w-0 flex-1">
          {/* Info Circle Icon */}
          <svg
            width="17"
            height="17"
            viewBox="0 0 20 20"
            fill="none"
            className="text-[#2B5D7C] shrink-0"
            aria-hidden="true"
          >
            <circle cx="10" cy="10" r="8.5" stroke="#2B5D7C" strokeWidth="1.75" />
            <line x1="10" y1="9" x2="10" y2="14.5" stroke="#2B5D7C" strokeWidth="1.75" strokeLinecap="round" />
            <circle cx="10" cy="6" r="1.1" fill="#2B5D7C" />
          </svg>

          {/* Desktop Text */}
          <span className="hidden sm:inline">
            As an Amazon Associate we earn from qualifying purchases. Rankings are never for sale.{' '}
            <Link
              href="/legal/affiliate-disclosure"
              className="text-[#2B5D7C] font-semibold underline underline-offset-2 hover:text-[#1A1D21] transition-colors"
            >
              How we make money
            </Link>
          </span>

          {/* Mobile Condensed Text (from Mobile screenshot) */}
          <span className="inline sm:hidden text-[12px] leading-snug">
            As an Amazon Associate we earn from qualifying purchases.{' '}
            <Link
              href="/legal/affiliate-disclosure"
              className="text-[#2B5D7C] font-semibold underline underline-offset-2 whitespace-nowrap"
            >
              Details
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
