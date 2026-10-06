import { CardSkeleton } from '@/components/ui/CardSkeleton';

export default function CategoryLoading() {
  return (
    <div className="animate-pulse">
      <div className="bg-neutral-100 py-12 border-b border-neutral-200">
        <div className="container-page">
          <div className="w-48 h-4 bg-neutral-200 rounded mb-4"></div>
          <div className="w-80 h-10 bg-neutral-200 rounded mb-4"></div>
          <div className="w-96 h-5 bg-neutral-200 rounded mb-6"></div>
          <div className="flex gap-2">
            <div className="w-24 h-8 bg-neutral-200 rounded-full"></div>
            <div className="w-24 h-8 bg-neutral-200 rounded-full"></div>
          </div>
        </div>
      </div>
      <div className="container-page py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="hidden lg:block lg:col-span-3 h-80 bg-neutral-100 rounded-[16px]"></div>
          <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-6">
            <CardSkeleton count={4} />
          </div>
        </div>
      </div>
    </div>
  );
}
