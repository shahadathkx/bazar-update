import Link from 'next/link';
import { Product } from '@/types/product';
import { formatPrice, getUnitLabel } from '@/lib/format';
import { PriceChangeBadge } from './PriceChangeBadge';

export function ProductCard({ product }: { product: Product }) {
  const unitLabel = getUnitLabel(product.unit).per;
  
  return (
    <Link 
      href={`/product/${product.slug}`}
      className="block bg-base-100 border border-base-300 rounded-[16px] p-4 flex flex-col gap-3 transition hover:border-primary hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
    >

      <div className="flex gap-3 items-start">
        <div className="w-12 h-12 shrink-0 bg-base-200 rounded-[12px] flex items-center justify-center text-[24px] leading-[32px]">
          {product.image}
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[16px] font-semibold leading-[24px] text-base-content break-words">
            {product.nameBn}
          </span>
          <span className="text-[12px] font-normal leading-[16px] text-base-content/70">
            {unitLabel}
          </span>
        </div>
      </div>
      

      <div className="flex items-end justify-between mt-auto">
        <div className="flex flex-col">
          <span className="text-[12px] font-normal leading-[16px] text-base-content/70">
            আজকের দাম
          </span>
          <div className="text-base-content flex items-baseline">
            <span className="text-[20px] font-bold leading-[28px]">{formatPrice(product.today)}</span>
            <span className="text-[14px] font-medium ml-1">টাকা</span>
          </div>
        </div>
        <PriceChangeBadge dir={product.change.dir} pct={product.change.pct} />
      </div>
    </Link>
  );
}
