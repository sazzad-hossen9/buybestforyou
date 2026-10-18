export default function RootLoading() {
  return (
    <div className="mx-auto w-full max-w-[var(--container-max)] px-[var(--container-pad)] py-[var(--section-py)] animate-pulse">
      <div className="w-1/2 h-12 bg-border-light rounded mb-6"></div>
      <div className="w-1/3 h-6 bg-border-light rounded mb-12"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-64 bg-surface-muted rounded-[var(--r-card)] border border-border"></div>
        ))}
      </div>
    </div>
  );
}
