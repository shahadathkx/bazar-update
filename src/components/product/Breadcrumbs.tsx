import Link from 'next/link';
import { Product } from '@/types/product';

export function Breadcrumbs({ product }: { product: Product }) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-[14px] leading-[20px] text-base-content/70">
        <li>
          <Link href="/" className="hover:text-primary transition-colors">হোম</Link>
        </li>
        <li className="flex items-center">
          <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-50 mx-1">
            <path d="M1.5 1L4.5 4L1.5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </li>
        <li>
          <Link href={`/category/${product.category}`} className="hover:text-primary transition-colors">
            {product.categoryNameBn}
          </Link>
        </li>
        <li className="flex items-center">
          <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-50 mx-1">
            <path d="M1.5 1L4.5 4L1.5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </li>
        <li aria-current="page" className="font-semibold text-base-content">
          {product.nameBn}
        </li>
      </ol>
    </nav>
  );
}
