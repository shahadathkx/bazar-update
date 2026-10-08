
import { apiFetch } from './api';
import { Product, Market } from '@/types/product';

export async function getProducts(): Promise<Product[]> {
  const data = await apiFetch<unknown>('/api/bazardor/products', { next: { revalidate: 300 } });

  if (!Array.isArray(data)) {
    throw new Error('Products API response is not an array');
  }

  const validProducts: Product[] = [];

  for (const item of data) {
    if (
      item &&
      typeof item === 'object' &&
      typeof item.id === 'number' &&
      typeof item.slug === 'string' &&
      typeof item.nameBn === 'string' &&
      typeof item.image === 'string' &&
      typeof item.today === 'number' &&
      item.change &&
      typeof item.change === 'object' &&
      ['up', 'down', 'flat'].includes((item as any).change.dir) &&
      typeof (item as any).change.pct === 'number' &&
      Array.isArray((item as any).markets)
    ) {
      const p = item as any;
      const validMarkets = p.markets.filter((m: any) =>
        m &&
        typeof m === 'object' &&
        typeof m.market === 'string' &&
        typeof m.division === 'string' &&
        typeof m.min === 'number' &&
        typeof m.max === 'number'
      );

      validProducts.push({
        id: p.id,
        slug: p.slug,
        nameBn: p.nameBn,
        category: p.category || '',
        categoryNameBn: p.categoryNameBn || '',
        categoryIcon: p.categoryIcon || '',
        unit: p.unit || 'kg',
        image: p.image,
        today: p.today,
        yesterday: p.yesterday || 0,
        lastWeek: p.lastWeek || 0,
        lastMonth: p.lastMonth || 0,
        change: {
          dir: p.change.dir,
          pct: p.change.pct,
        },
        markets: validMarkets as Market[],
      });
    }
  }

  return validProducts;
}

export async function getProductById(id: number): Promise<Product | null> {
  try {
    const data = await apiFetch<unknown>(`/api/bazardor/products/${id}`, { next: { revalidate: 300 } });
    if (!data) return null;
    
    const item = data as any;
    if (
      item &&
      typeof item === 'object' &&
      typeof item.id === 'number' &&
      typeof item.slug === 'string' &&
      typeof item.nameBn === 'string' &&
      typeof item.image === 'string' &&
      typeof item.today === 'number' &&
      item.change &&
      typeof item.change === 'object' &&
      ['up', 'down', 'flat'].includes(item.change.dir) &&
      typeof item.change.pct === 'number' &&
      Array.isArray(item.markets)
    ) {
      const validMarkets = item.markets.filter((m: any) =>
        m &&
        typeof m === 'object' &&
        typeof m.market === 'string' &&
        typeof m.division === 'string' &&
        typeof m.min === 'number' &&
        typeof m.max === 'number'
      );

      return {
        id: item.id,
        slug: item.slug,
        nameBn: item.nameBn,
        category: item.category || '',
        categoryNameBn: item.categoryNameBn || '',
        categoryIcon: item.categoryIcon || '',
        unit: item.unit || 'kg',
        image: item.image,
        today: item.today,
        yesterday: item.yesterday || 0,
        lastWeek: item.lastWeek || 0,
        lastMonth: item.lastMonth || 0,
        change: {
          dir: item.change.dir,
          pct: item.change.pct,
        },
        markets: validMarkets as Market[],
      };
    }
    return null;
  } catch (error) {
    return null;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const products = await getProducts();
    const found = products.find(p => p.slug === slug);
    if (!found) return null;
    
    const fromId = await getProductById(found.id);
    return fromId || found;
  } catch {
    return null;
  }
}
