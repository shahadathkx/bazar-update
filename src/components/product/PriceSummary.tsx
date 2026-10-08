import { Product } from '@/types/product';
import { getMarketStats } from '@/lib/price';
import { getUnitLabel, formatPrice } from '@/lib/format';

export function PriceSummary({ product }: { product: Product }) {
  const stats = getMarketStats(product);
  const unitLabel = getUnitLabel(product.unit).per;

  return (
    <section>
      <h2 className="text-[18px] font-semibold leading-[28px] text-base-content mb-3">
        দামের সারসংক্ষেপ
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-base-100 border border-base-300 rounded-[16px] px-[25px] py-[17px] flex flex-col">
          <span className="text-[12px] leading-[18px] text-base-content/70">সর্বনিম্ন দাম</span>
          <div className="flex items-baseline text-success mt-1">
            <span className="text-[24px] font-bold leading-[32px]">{formatPrice(stats.min)}</span>
            <span className="text-[14px] font-medium ml-1">টাকা</span>
          </div>
          <span className="text-[12px] leading-[18px] text-base-content/70 mt-1">সবচেয়ে কম দামের বাজার</span>
        </div>
        
        <div className="bg-base-100 border border-base-300 rounded-[16px] px-[25px] py-[17px] flex flex-col">
          <span className="text-[12px] leading-[18px] text-base-content/70">সর্বাধিক দাম</span>
          <div className="flex items-baseline text-error mt-1">
            <span className="text-[24px] font-bold leading-[32px]">{formatPrice(stats.max)}</span>
            <span className="text-[14px] font-medium ml-1">টাকা</span>
          </div>
          <span className="text-[12px] leading-[18px] text-base-content/70 mt-1">সবচেয়ে বেশি দামের বাজার</span>
        </div>

        <div className="bg-base-100 border border-base-300 rounded-[16px] px-[25px] py-[17px] flex flex-col">
          <span className="text-[12px] leading-[18px] text-base-content/70">গড় দাম</span>
          <div className="flex items-baseline text-primary mt-1">
            <span className="text-[24px] font-bold leading-[32px]">{formatPrice(stats.avg)}</span>
            <span className="text-[14px] font-medium ml-1">টাকা</span>
          </div>
          <span className="text-[12px] leading-[18px] text-base-content/70 mt-1">{unitLabel}-এর হিসাবে</span>
        </div>
      </div>
    </section>
  );
}
