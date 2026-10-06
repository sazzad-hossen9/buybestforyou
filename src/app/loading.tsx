export default function RootLoading() {
  return (
    <div className="container-page py-16 animate-pulse">
      <div className="w-1/2 h-12 bg-neutral-200 rounded mb-6"></div>
      <div className="w-1/3 h-6 bg-neutral-200 rounded mb-12"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-64 bg-neutral-100 rounded-[16px] border border-neutral-200"></div>
        ))}
      </div>
    </div>
  );
}
