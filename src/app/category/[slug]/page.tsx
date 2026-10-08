import { notFound } from 'next/navigation';
import { getCategories } from '@/lib/categories';
import { getProducts } from '@/lib/products';
import { CategoryHeader } from '@/components/category/CategoryHeader';
import { CategoryProducts } from '@/components/category/CategoryProducts';
import { EmptyState } from '@/components/ui/EmptyState';
import { Container } from '@/components/layout/Container';

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);
  
  if (!category) {
    return { title: 'বিভাগ পাওয়া যায়নি - বাজার দর' };
  }
  return { title: `${category.nameBn} - বাজার দর` };
}

export default async function CategoryPage({ params }: { params: Params }) {
  const { slug } = await params;
  
  const [categoriesResult, productsResult] = await Promise.allSettled([
    getCategories(),
    getProducts()
  ]);

  const categories = categoriesResult.status === 'fulfilled' ? categoriesResult.value : [];
  const products = productsResult.status === 'fulfilled' ? productsResult.value : null;
  
  if (productsResult.status === 'rejected') {
    console.error('Failed to fetch products on category page:', productsResult.reason);
  }

  const category = categories.find((c) => c.slug === slug);
  const categoryProducts = products ? products.filter((p) => p.category === slug) : [];

  if (!category && (!products || categoryProducts.length === 0)) {
    notFound();
  }

  const emoji = category?.icon || '📦';
  const nameBn = category?.nameBn || slug;
  
  const countStr = products ? new Intl.NumberFormat('bn-BD').format(categoryProducts.length) : null;

  return (
    <Container className="pt-6 flex flex-col gap-6">
      <CategoryHeader emoji={emoji} name={nameBn} count={countStr} />
      
      {!products ? (
        <div className="bg-base-100 border border-base-300 rounded-[16px] p-6 text-center text-base-content max-w-xl mx-auto w-full">
          দাম লোড করা যায়নি। একটু পরে আবার চেষ্টা করুন।
        </div>
      ) : categoryProducts.length === 0 ? (
        <EmptyState 
          emoji="📭" 
          title="এই বিভাগে এখনো কোনো পণ্য নেই" 
          description="পরে আবার দেখুন, নতুন পণ্য যোগ হলে এখানে দেখতে পাবেন।" 
          ctaHref="/" 
          ctaLabel="হোম পেজে ফিরে যান" 
        />
      ) : (
        <CategoryProducts products={categoryProducts} />
      )}
    </Container>
  );
}
