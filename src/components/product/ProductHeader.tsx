import Link from 'next/link';
import { Product } from '@/types/product';
import { getUnitLabel, formatTaka, formatPrice, formatPercent } from '@/lib/format';
import { CHANGE_STYLES } from '@/lib/price';

export function ProductHeader({ product }: { product: Product }) {
  const unitLabel = getUnitLabel(product.unit);
  const style = CHANGE_STYLES[product.change.dir];
  const changeValueStr = formatPercent(product.change.pct);
  const isFlat = product.change.dir === 'flat';

  const diff = Math.abs(product.today - product.yesterday);
  const diffStr = formatTaka(diff);

  let sentence = 'গতকালের তুলনায় আজ দাম অপরিবর্তিত আছে';
  if (product.change.dir === 'up') {
    sentence = `গতকালের তুলনায় আজ দাম <span class="font-semibold">বেড়েছে</span> · ${diffStr}`;
  } else if (product.change.dir === 'down') {
    sentence = `গতকালের তুলনায় আজ দাম <span class="font-semibold">কমেছে</span> · ${diffStr}`;
  }

  return (
    <div className="bg-base-100 border border-base-300 rounded-[16px] p-[21px] flex flex-col md:flex-row gap-4 items-center">
      <div className="w-20 h-20 shrink-0 bg-base-200 rounded-[16px] flex items-center justify-center text-[36px] leading-[40px]">
        {product.image}
      </div>

      <div className="flex-1 min-w-0 flex flex-col text-center md:text-left">
        <h1 className="text-[24px] md:text-[30px] font-bold leading-[36px] text-base-content break-words">
          {product.nameBn}
        </h1>
        <div className="text-[14px] leading-[20px] text-base-content/70 mt-1">
          {unitLabel.per} · {product.categoryNameBn}
        </div>
        
        <div 
          className="text-[14px] leading-[20px] text-base-content mt-2" 
          dangerouslySetInnerHTML={{ __html: sentence }} 
        />
        
        <div className="mt-3 flex justify-center md:justify-start">
          <Link 
            href={`/category/${product.category}`}
            className="inline-flex items-center h-7 px-3 bg-base-200 hover:bg-base-300 transition-colors rounded-[8px] text-[12px] font-semibold leading-[18px] text-base-content gap-1"
          >
            <span>{product.categoryIcon}</span>
            <span>{product.categoryNameBn}</span>
          </Link>
        </div>
      </div>

      <div className="bg-base-200 rounded-[16px] pt-4 pb-[17px] px-5 min-w-[118px] w-full md:w-auto flex flex-col items-center">
        <div className="text-[14px] leading-[20px] text-base-content/70 mb-1">আজকের দাম</div>
        <div className="text-[30px] font-bold leading-[36px] text-base-content">
          {formatPrice(product.today)}
        </div>
        <div className="text-[14px] leading-[20px] text-base-content/70 mt-1 mb-2">
          টাকা / {unitLabel.short}
        </div>
        <div className={`text-[14px] font-semibold leading-[20px] flex items-center gap-1 ${style.textClass}`}>
          <span>{style.symbol}</span>
          <span>{isFlat ? '০.০%' : changeValueStr}</span>
        </div>
      </div>
    </div>
  );
}
