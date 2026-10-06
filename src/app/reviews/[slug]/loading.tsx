import { CardSkeleton } from '@/components/ui/CardSkeleton';

export default function ReviewLoading() {
  return (
    <div className="container-page py-10 animate-pulse">
      <div className="w-48 h-4 bg-neutral-200 rounded mb-6"></div>
      <div className="w-3/4 h-10 bg-neutral-200 rounded mb-4"></div>
      <div className="w-1/2 h-4 bg-neutral-200 rounded mb-10"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="hidden lg:block lg:col-span-3 space-y-4">
          <div className="h-64 bg-neutral-100 rounded-[16px] border border-neutral-200"></div>
        </div>
        <div className="lg:col-span-9 space-y-8">
          <div className="h-48 bg-neutral-100 rounded-[20px] border border-neutral-200"></div>
          <div className="h-72 bg-neutral-100 rounded-[16px] border border-neutral-200"></div>
          <CardSkeleton count={2} />
        </div>
      </div>
    </div>
  );
}
