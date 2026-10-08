'use client';

import { useState } from 'react';
import { Product } from '@/types/product';
import { ProductCard } from '@/components/home/ProductCard';
import { SortSelect } from './SortSelect';

type SortOption = 'default' | 'price-asc' | 'price-desc';

export function CategoryProducts({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortOption>('default');

  const sortedProducts = [...products];
  if (sort === 'price-asc') {
    sortedProducts.sort((a, b) => a.today - b.today);
  } else if (sort === 'price-desc') {
    sortedProducts.sort((a, b) => b.today - a.today);
  }
  
  const numberFormat = new Intl.NumberFormat('bn-BD');
  const countStr = numberFormat.format(products.length);

  return (
    <div className="flex flex-col gap-4">
      <div className="sr-only" aria-live="polite">
        তালিকা সাজানো হয়েছে
      </div>
      <SortSelect value={sort} onChange={setSort} />
      <div className="text-[14px] leading-[20px] text-base-content/70">
        মোট {countStr}টি পণ্য দেখানো হচ্ছে
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
