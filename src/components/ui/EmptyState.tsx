import Link from 'next/link';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
}

export function EmptyState({
  title = 'No items found',
  description = 'Try adjusting your filters or search terms to find what you are looking for.',
  actionHref,
  actionLabel
}: EmptyStateProps) {
  return (
    <div className="card text-center py-12 px-6 flex flex-col items-center justify-center">
      <div className="w-12 h-12 rounded-full bg-[#F1F3F5] flex items-center justify-center text-[#5B6470] mb-3">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>
      <h3 className="h-3 text-[#1A1D21] mb-1">{title}</h3>
      <p className="text-body text-[#5B6470] max-w-md mb-6">{description}</p>
      {actionHref && actionLabel && (
        <Link href={actionHref} className="btn-secondary btn-sm">
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
