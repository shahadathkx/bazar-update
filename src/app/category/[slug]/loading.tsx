import { ProductCardSkeleton } from '@/components/category/ProductCardSkeleton';
import { Container } from '@/components/layout/Container';

export default function Loading() {
  return (
    <Container className="pt-6 flex flex-col gap-6" aria-busy="true">
      <span className="sr-only">লোড হচ্ছে…</span>
      <div className="bg-base-100 border border-base-300 rounded-[16px] p-[21px] flex flex-row gap-3 items-center">
        <div className="w-9 h-9 shrink-0 bg-base-200 rounded-[8px] animate-pulse"></div>
        <div className="flex flex-col gap-2 w-48">
          <div className="h-7 w-full bg-base-200 rounded-[4px] animate-pulse"></div>
          <div className="h-4 w-3/4 bg-base-200 rounded-[4px] animate-pulse"></div>
        </div>
      </div>
      <div className="bg-base-100 border border-base-300 rounded-[16px] p-[17px] h-[66px] animate-pulse"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </Container>
  );
}
