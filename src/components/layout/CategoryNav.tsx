'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef, useEffect } from 'react';
import { Category } from '@/types/category';

export function CategoryNav({ categories }: { categories: Category[] }) {
  const pathname = usePathname();
  const activeRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [pathname]);

  return (
    <div className="border-t border-base-200">
      <div className="mx-auto w-full max-w-6xl overflow-x-auto scrollbar-hide snap-x py-2">
        <div className="flex justify-center-safe gap-1 min-w-max px-4">
          {categories.map((cat) => {
            const href = `/category/${cat.slug}`;
            const isActive = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={cat.id}
                href={href}
                ref={isActive ? activeRef : null}
                aria-current={isActive ? 'page' : undefined}
                className={`snap-center h-9 sm:h-8 rounded-[8px] px-[13px] flex items-center gap-[6px] text-[12px] leading-[17.1px] font-semibold transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-content'
                    : 'text-base-content hover:bg-base-200'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.nameBn}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
