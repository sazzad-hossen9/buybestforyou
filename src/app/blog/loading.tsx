import { CardSkeleton } from '@/components/ui/CardSkeleton';

export default function BlogLoading() {
  return (
    <div className="mx-auto w-full max-w-[var(--container-max)] px-[var(--container-pad)] py-[var(--section-py)] animate-pulse">
      <div className="w-48 h-4 bg-border-light rounded mb-4"></div>
      <div className="w-80 h-10 bg-border-light rounded mb-4"></div>
      <div className="w-96 h-5 bg-border-light rounded mb-12"></div>

      <div className="h-20 bg-surface-muted rounded-[var(--r-card-feature)] mb-8 border border-border"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CardSkeleton count={6} />
      </div>
    </div>
  );
}
