export default function ProductLoading() {
  return (
    <div className="animate-pulse">
      <div className="bg-surface-muted py-12 border-b border-border">
        <div className="mx-auto w-full max-w-[var(--container-max)] px-[var(--container-pad)]">
          <div className="w-48 h-4 bg-border-light rounded mb-6"></div>
          <div className="w-3/4 h-10 bg-border-light rounded mb-4"></div>
          <div className="w-1/2 h-4 bg-border-light rounded mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 aspect-4/3 bg-border-light rounded-[var(--r-card)]"></div>
            <div className="lg:col-span-7 h-72 bg-border-light rounded-[var(--r-card-feature)]"></div>
          </div>
        </div>
      </div>
      <div className="mx-auto w-full max-w-[var(--container-max)] px-[var(--container-pad)] py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
            <div className="h-48 bg-surface-muted rounded-[var(--r-card)] border border-border"></div>
            <div className="h-64 bg-surface-muted rounded-[var(--r-card)] border border-border"></div>
          </div>
          <div className="hidden lg:block lg:col-span-4 h-96 bg-surface-muted rounded-[var(--r-card)] border border-border"></div>
        </div>
      </div>
    </div>
  );
}
