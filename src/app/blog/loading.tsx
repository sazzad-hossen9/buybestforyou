import { CardSkeleton } from '@/components/ui/CardSkeleton';

export default function BlogLoading() {
  return (
    <div className="container-page py-12 animate-pulse">
      <div className="w-48 h-4 bg-neutral-200 rounded mb-4"></div>
      <div className="w-80 h-10 bg-neutral-200 rounded mb-4"></div>
      <div className="w-96 h-5 bg-neutral-200 rounded mb-12"></div>

      <div className="h-20 bg-neutral-100 rounded-[20px] mb-8"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CardSkeleton count={6} />
      </div>
    </div>
  );
}
