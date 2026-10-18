import Link from 'next/link';

interface DisclosureBarProps {
  className?: string;
}

export function DisclosureBar({ className = '' }: DisclosureBarProps) {
  return (
    <div
      className={`border-b border-tint-trust-border sticky top-[72px] z-30 bg-tint-trust-bg py-2 flex items-center ${className}`}
      role="region"
      aria-label="Affiliate disclosure"
    >
      <div className="mx-auto w-full max-w-[var(--container-max)] px-[var(--container-pad)] flex items-center justify-between gap-3 min-w-0">
        <div className="flex items-center gap-2 text-[13px] md:text-[14px] leading-[20px] text-ink min-w-0 flex-1">
          {/* Info Circle Icon */}
          <svg
            width="17"
            height="17"
            viewBox="0 0 20 20"
            fill="none"
            className="text-trust shrink-0"
            aria-hidden="true"
          >
            <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.75" />
            <line x1="10" y1="9" x2="10" y2="14.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            <circle cx="10" cy="6" r="1.1" fill="currentColor" />
          </svg>

          {/* Desktop Text */}
          <span className="hidden sm:inline">
            As an Amazon Associate we earn from qualifying purchases. Rankings are never for sale.{' '}
            <Link
              href="/legal/affiliate-disclosure"
              className="text-trust font-semibold underline underline-offset-2 hover:text-ink transition-colors"
            >
              How we make money
            </Link>
          </span>

          {/* Mobile Condensed Text (from Mobile screenshot) */}
          <span className="inline sm:hidden text-[12px] leading-snug">
            As an Amazon Associate we earn from qualifying purchases.{' '}
            <Link
              href="/legal/affiliate-disclosure"
              className="text-trust font-semibold underline underline-offset-2 whitespace-nowrap"
            >
              Details
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
