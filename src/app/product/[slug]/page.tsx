import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/products';
import { Breadcrumbs } from '@/components/product/Breadcrumbs';
import { ProductHeader } from '@/components/product/ProductHeader';
import { PriceSummary } from '@/components/product/PriceSummary';
import { MarketPriceTable } from '@/components/product/MarketPriceTable';
import { Container } from '@/components/layout/Container';

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.nameBn} - বাজার দর`,
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  // TODO(auth): this route must require login. When Better Auth is set up, redirect unauthenticated users to /sign-in with a callbackUrl back to this page.
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  
  if (!product) {
    notFound();
  }

  return (
    <Container className="pt-6 flex flex-col gap-6">
      <Breadcrumbs product={product} />
      <ProductHeader product={product} />
      
      <div className="flex flex-col gap-8 mt-2">
        <PriceSummary product={product} />
        <MarketPriceTable product={product} />
      </div>
    </Container>
  );
}
