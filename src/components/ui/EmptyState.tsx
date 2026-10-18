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
    <div className="rounded-[var(--r-card)] border border-border bg-white text-center py-12 px-6 flex flex-col items-center justify-center shadow-xs">
      <div className="w-12 h-12 rounded-full bg-surface-muted flex items-center justify-center text-muted mb-3">
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
      <h3 className="text-[18px] leading-[24px] font-bold text-ink mb-1">{title}</h3>
      <p className="text-[14px] leading-[20px] text-muted max-w-md mb-6">{description}</p>
      {actionHref && actionLabel && (
        <Link
          href={actionHref}
          className="rounded-full border border-border bg-white px-4 py-2 text-[13px] font-semibold text-ink hover:bg-surface-muted transition-colors"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
