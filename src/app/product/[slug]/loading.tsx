export default function ProductLoading() {
  return (
    <div className="animate-pulse">
      <div className="bg-neutral-100 py-12 border-b border-neutral-200">
        <div className="container-page">
          <div className="w-48 h-4 bg-neutral-200 rounded mb-6"></div>
          <div className="w-3/4 h-10 bg-neutral-200 rounded mb-4"></div>
          <div className="w-1/2 h-4 bg-neutral-200 rounded mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 aspect-4/3 bg-neutral-200 rounded-[16px]"></div>
            <div className="lg:col-span-7 h-72 bg-neutral-200 rounded-[20px]"></div>
          </div>
        </div>
      </div>
      <div className="container-page py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
            <div className="h-48 bg-neutral-100 rounded-[16px]"></div>
            <div className="h-64 bg-neutral-100 rounded-[16px]"></div>
          </div>
          <div className="hidden lg:block lg:col-span-4 h-96 bg-neutral-100 rounded-[16px]"></div>
        </div>
      </div>
    </div>
  );
}
