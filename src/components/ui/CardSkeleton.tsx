export function CardSkeleton({ count = 1 }: { count?: number } = {}) {
  const cards = Array.from({ length: count });

  return (
    <>
      {cards.map((_, idx) => (
        <div key={idx} className="rounded-[var(--r-card)] border border-border bg-white p-5 space-y-4">
          <div className="bg-border-light animate-pulse w-full aspect-16/10 rounded-xl" />
          <div className="flex items-center gap-2">
            <div className="bg-border-light animate-pulse w-3 h-3 rounded-full" />
            <div className="bg-border-light animate-pulse w-24 h-4 rounded" />
          </div>
          <div className="bg-border-light animate-pulse w-4/5 h-6 rounded" />
          <div className="bg-border-light animate-pulse w-full h-12 rounded" />
          <div className="flex justify-between items-center pt-2">
            <div className="bg-border-light animate-pulse w-20 h-4 rounded" />
            <div className="bg-border-light animate-pulse w-28 h-9 rounded-full" />
          </div>
        </div>
      ))}
    </>
  );
}

export function HeroSkeleton() {
  return (
    <div className="py-12 lg:py-16">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-border-light animate-pulse w-48 h-6 rounded-full" />
          <div className="bg-border-light animate-pulse w-full max-w-lg h-24 rounded-xl" />
          <div className="bg-border-light animate-pulse w-full max-w-md h-16 rounded" />
          <div className="bg-border-light animate-pulse w-full max-w-lg h-12 rounded-full" />
        </div>
        <div className="lg:col-span-5">
          <div className="bg-border-light animate-pulse w-full h-96 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div className="border border-border rounded-2xl overflow-hidden p-4 space-y-3">
      <div className="bg-border-light animate-pulse w-full h-10 rounded" />
      <div className="bg-border-light animate-pulse w-full h-12 rounded" />
      <div className="bg-border-light animate-pulse w-full h-12 rounded" />
      <div className="bg-border-light animate-pulse w-full h-12 rounded" />
    </div>
  );
}
