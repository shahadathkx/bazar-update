import { Suspense } from 'react';
import { Hero } from '@/components/home/Hero';
import { ProductsSection } from '@/components/home/ProductsSection';
import { PriceMoversSection } from '@/components/home/PriceMoversSection';
import { getProducts } from '@/lib/products';
import { getTopRisers, getTopFallers } from '@/lib/price';
import { Container } from '@/components/layout/Container';
import { Product } from '@/types/product';

export default async function Home() {
  let products: Product[] | null = null;

  try {
    products = await getProducts();
  } catch (error) {
    console.error('Failed to fetch products on home page:', error);
  }

  return (
    <>
      <Suspense fallback={null}>
        <Hero />
      </Suspense>
      {products ? (
        <div className="flex flex-col gap-10 mt-10">
          <PriceMoversSection variant="up" products={getTopRisers(products, 6)} />
          <PriceMoversSection variant="down" products={getTopFallers(products, 6)} />
          <ProductsSection products={products} />
        </div>
      ) : (
        <Container className="flex flex-col gap-10 mt-10">
          <div className="bg-base-100 border border-base-300 rounded-[16px] p-6 text-center text-base-content">
            দাম লোড করা যায়নি। একটু পরে আবার চেষ্টা করুন।
          </div>
          <div id="সব-পণ্য" className="sr-only"></div>
        </Container>
      )}
    </>
  );
}
