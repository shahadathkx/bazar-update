import { Product } from '@/types/product';

export const CHANGE_STYLES = {
  up: { symbol: '▲', textClass: 'text-error' },
  down: { symbol: '▼', textClass: 'text-success' },
  flat: { symbol: '—', textClass: 'text-base-content/60' },
} as const;

export function getTopRisers(products: Product[], limit: number): Product[] {
  return products
    .filter(p => p.change.dir === 'up')
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, limit);
}

export function getTopFallers(products: Product[], limit: number): Product[] {
  return products
    .filter(p => p.change.dir === 'down')
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, limit);
}

export function getMarketRows(product: Product) {
  return product.markets
    .map(m => ({ ...m, avg: (m.min + m.max) / 2 }))
    .sort((a, b) => a.avg - b.avg);
}

export function getMarketStats(product: Product) {
  if (product.markets.length === 0) return { min: 0, max: 0, avg: 0 };
  const min = Math.min(...product.markets.map(m => m.min));
  const max = Math.max(...product.markets.map(m => m.max));
  const avg = Math.round(product.markets.reduce((acc, m) => acc + (m.min + m.max) / 2, 0) / product.markets.length);
  return { min, max, avg };
}
