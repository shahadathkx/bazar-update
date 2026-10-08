import { Product } from '@/types/product';
import { ProductCard } from './ProductCard';
import { Container } from '@/components/layout/Container';

export function ProductsSection({ products }: { products: Product[] }) {
  const numberFormat = new Intl.NumberFormat('bn-BD');
  const countStr = numberFormat.format(products.length);

  return (
    <Container className="scroll-mt-6">
      <section id="সব-পণ্য">
        <h2 className="text-[20px] font-bold leading-[28px] text-base-content">
          সব পণ্য
        </h2>
        <div className="text-[14px] text-base-content/70 mt-1 mb-4">
          মোট {countStr}টি পণ্য দেখানো হচ্ছে
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </Container>
  );
}
