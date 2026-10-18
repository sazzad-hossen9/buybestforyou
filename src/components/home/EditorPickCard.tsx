import Link from 'next/link';
import { ScoreRing } from '@/components/ui/ScoreRing';
import { AffiliateLink } from '@/components/ui/AffiliateLink';
import { SafeImage } from '@/components/ui/SafeImage';

export function EditorPickCard() {
  return (
    <div className="bg-surface border border-border rounded-[var(--r-card-feature)] p-5 shadow-[var(--sh-card-hover)] relative w-full">
      {/* Top Left Badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className="inline-flex items-center px-3.5 py-1 rounded-full text-[12.5px] font-semibold bg-ink text-white whitespace-nowrap">
          Editor&apos;s pick
        </span>
      </div>

      {/* Featured Media */}
      <div className="relative w-full h-[237px] rounded-xl overflow-hidden bg-tint-auto-bg mb-3.5">
        <SafeImage
          src="/images/paint-pen-hero.jpg"
          alt="Paint Pen for Automotive"
          fill
          sizes="(max-width: 1024px) 100vw, 500px"
          priority
          className="object-cover"
        />
      </div>

      {/* Category Tag */}
      <div className="flex items-center gap-2 mb-2">
        <span className="w-2.5 h-2.5 rounded-full bg-tint-auto-dot shrink-0" aria-hidden="true" />
        <span className="text-[13px] font-semibold text-muted">
          Automotive Parts &amp; Accessories
        </span>
      </div>

      {/* Title & Excerpt */}
      <h3 className="text-[length:var(--fs-h3)] leading-[var(--lh-h3)] tracking-[var(--ls-h3)] font-extrabold tracking-tight text-ink mb-2">
        Paint Pen for Automotive
      </h3>
      <p className="text-[length:var(--fs-body)] leading-[var(--lh-body)] text-muted mb-3.5">
        Our pick for restoring light scratches and chips on a vehicle&apos;s exterior. Easy to apply, but check your paint code before you order.
      </p>

      {/* Score Ring & Summary */}
      <div className="flex items-center gap-4 p-2.5 rounded-xl bg-surface-muted mb-3.5">
        <ScoreRing score={4.7} size="md" />
        <div className="min-w-0">
          <p className="text-[14px] font-bold text-ink">Composite score</p>
          <p className="text-[12.5px] text-muted">
            Buyer ratings + spec match + expert coverage
          </p>
        </div>
      </div>

      {/* Primary CTA */}
      <AffiliateLink
        href="https://www.amazon.com/dp/B00HE66OK8"
        className="inline-flex items-center justify-center rounded-full bg-cta px-5 py-3 text-[16px] leading-[24px] font-semibold text-white shadow-xs hover:bg-cta-hover transition-colors select-none text-center w-full mb-3"
      >
        Check price on Amazon
      </AffiliateLink>

      {/* Secondary Disclaimer & Review Link */}
      <div className="flex items-center justify-between text-[13px] text-muted">
        <span>Affiliate link · we may earn a commission</span>
        <Link
          href="/product/scratch-fix-paint-pen"
          className="font-semibold text-ink hover:text-cta underline underline-offset-2"
        >
          Read the review
        </Link>
      </div>
    </div>
  );
}
