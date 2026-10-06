'use client';

import Link from 'next/link';

export default function RootError({
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container-page py-24 text-center max-w-lg mx-auto">
      <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4 font-bold text-2xl">
        !
      </div>
      <h1 className="h-2 mb-3">Something went wrong</h1>
      <p className="text-body text-[#5B6470] mb-8">
        We encountered an unexpected error while loading this page. You can try refreshing or return to the homepage.
      </p>
      <div className="flex items-center justify-center gap-4">
        <button onClick={() => reset()} className="btn-cta text-[14px]">
          Try again
        </button>
        <Link href="/" className="btn-secondary text-[14px]">
          Return home
        </Link>
      </div>
    </div>
  );
}
