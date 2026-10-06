import Link from 'next/link';
import { ScoreRing } from '@/components/ui/ScoreRing';
import { AffiliateLink } from '@/components/ui/AffiliateLink';
import { SafeImage } from '@/components/ui/SafeImage';

export function EditorPickCard() {
  return (
    <div className="card-feature relative overflow-hidden bg-white max-w-lg mx-auto lg:max-w-none">
      {/* Top Left Badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className="pill-dark text-[12.5px] px-3.5 py-1">
          Editor&apos;s pick
        </span>
      </div>

      {/* Featured Media */}
      <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-[#F4EDE7] mb-5">
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
        <span className="w-2.5 h-2.5 rounded-full bg-[#7A4E2D]" aria-hidden="true" />
        <span className="text-[13px] font-semibold text-[#5B6470]">
          Automotive Parts &amp; Accessories
        </span>
      </div>

      {/* Title & Excerpt */}
      <h3 className="h-2 text-[#1A1D21] mb-2">
        Paint Pen for Automotive
      </h3>
      <p className="text-[15px] leading-[22px] text-[#5B6470] mb-5">
        Our pick for restoring light scratches and chips on a vehicle&apos;s exterior. Easy to apply, but check your paint code before you order.
      </p>

      {/* Score Ring & Summary */}
      <div className="flex items-center gap-4 p-3.5 rounded-xl bg-[#F6F7F9] mb-5">
        <ScoreRing score={4.7} size="md" />
        <div className="min-w-0">
          <p className="text-[14px] font-bold text-[#1A1D21]">Composite score</p>
          <p className="text-[12.5px] text-[#5B6470]">
            Buyer ratings + spec match + expert coverage
          </p>
        </div>
      </div>

      {/* Primary CTA */}
      <AffiliateLink
        href="https://www.amazon.com/dp/B00HE66OK8"
        className="btn-cta btn-block text-center mb-3"
      >
        Check price on Amazon
      </AffiliateLink>

      {/* Secondary Disclaimer & Review Link */}
      <div className="flex items-center justify-between text-[13px] text-[#5B6470]">
        <span>Affiliate link · we may earn a commission</span>
        <Link
          href="/product/scratch-fix-paint-pen"
          className="font-semibold text-[#1A1D21] hover:text-[#B84A14] underline underline-offset-2"
        >
          Read the review
        </Link>
      </div>
    </div>
  );
}
