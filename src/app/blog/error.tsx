'use client';

import Link from 'next/link';

export default function BlogError({
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto w-full max-w-lg px-4 sm:px-6 lg:px-16 py-20 text-center">
      <div className="w-16 h-16 rounded-full bg-red-100 text-negative flex items-center justify-center mx-auto mb-4 font-bold text-2xl">
        !
      </div>
      <h2 className="text-[28px] leading-[34px] font-extrabold text-ink mb-3">Unable to load guides</h2>
      <p className="text-[16px] leading-[24px] text-muted mb-6">
        An error occurred while loading our guides. Please try again or return home.
      </p>
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => reset()}
          className="rounded-full bg-cta px-5 py-2.5 text-[14px] font-semibold text-white hover:bg-cta-hover transition-colors cursor-pointer"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-full border border-border bg-white px-5 py-2.5 text-[14px] font-semibold text-ink hover:bg-surface-muted transition-colors"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
