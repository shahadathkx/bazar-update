export function ProductCardSkeleton() {
  return (
    <div className="block bg-base-100 border border-base-300 rounded-[16px] p-4 flex flex-col gap-3">
      <div className="flex gap-3 items-start">
        <div className="w-12 h-12 shrink-0 bg-base-200 rounded-[12px] animate-pulse"></div>
        <div className="flex flex-col min-w-0 w-full gap-2 mt-1">
          <div className="h-5 w-3/4 bg-base-200 rounded-[4px] animate-pulse"></div>
          <div className="h-3 w-1/2 bg-base-200 rounded-[4px] animate-pulse"></div>
        </div>
      </div>
      <div className="flex items-end justify-between mt-auto pt-2">
        <div className="flex flex-col gap-2 w-24">
          <div className="h-3 w-16 bg-base-200 rounded-[4px] animate-pulse"></div>
          <div className="h-6 w-full bg-base-200 rounded-[4px] animate-pulse"></div>
        </div>
        <div className="h-6 w-16 bg-base-200 rounded-[12px] animate-pulse mb-1"></div>
      </div>
    </div>
  );
}
