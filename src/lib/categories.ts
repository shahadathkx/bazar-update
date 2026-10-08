import { apiFetch } from './api';
import { Category } from '@/types/category';
import { FALLBACK_CATEGORIES } from '@/data/categories';

export async function getCategories(): Promise<Category[]> {
  try {
    const data = await apiFetch<unknown>('/api/bazardor/categories');

    if (!Array.isArray(data)) {
      throw new Error('Categories API response is not an array');
    }

    const validCategories: Category[] = [];

    for (const item of data) {
      if (
        item &&
        typeof item === 'object' &&
        typeof item.id === 'string' &&
        typeof item.slug === 'string' &&
        typeof item.nameBn === 'string' &&
        typeof item.icon === 'string'
      ) {
        validCategories.push({
          id: item.id,
          slug: item.slug,
          nameBn: item.nameBn,
          icon: item.icon,
        });
      }
    }

    return validCategories;
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return FALLBACK_CATEGORIES;
  }
}
