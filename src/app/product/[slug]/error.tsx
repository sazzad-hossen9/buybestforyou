'use client';

import Link from 'next/link';

export default function ProductError({
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container-page py-20 text-center max-w-lg mx-auto">
      <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4 font-bold text-2xl">
        !
      </div>
      <h2 className="h-2 mb-3">Unable to load product review</h2>
      <p className="text-body text-[#5B6470] mb-6">
        An error occurred while loading this product review. Please try again or return home.
      </p>
      <div className="flex items-center justify-center gap-4">
        <button onClick={() => reset()} className="btn-cta text-[14px]">
          Try again
        </button>
        <Link href="/" className="btn-secondary text-[14px]">
          Go home
        </Link>
      </div>
    </div>
  );
}
