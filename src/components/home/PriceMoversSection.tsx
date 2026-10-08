import { Product } from '@/types/product';
import { ProductCard } from './ProductCard';
import { CHANGE_STYLES } from '@/lib/price';
import { Container } from '@/components/layout/Container';

export function PriceMoversSection({ variant, products }: { variant: 'up' | 'down'; products: Product[] }) {
  if (products.length === 0) return null;
  
  const style = CHANGE_STYLES[variant];
  const title = variant === 'up' ? 'আজ দাম বেড়েছে' : 'আজ দাম কমেছে';
  const labelId = `movers-title-${variant}`;
  
  return (
    <Container>
      <section aria-labelledby={labelId}>
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-[16px] leading-[24px] ${style.textClass}`}>{style.symbol}</span>
          <h2 id={labelId} className="text-[20px] font-bold leading-[28px] text-base-content">{title}</h2>
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
