import Link from 'next/link';
import { CategoryNav } from './CategoryNav';
import { AuthNavBlock } from './AuthNavBlock';
import { getBanglaDate } from '@/lib/date';
import { getCategories } from '@/lib/categories';
import { connection } from 'next/server';
import { Container } from './Container';

export async function Navbar() {
  await connection();
  const categories = await getCategories();
  
  const dateStr = getBanglaDate();

  return (
    <header className="bg-base-100 border-b border-base-300">

      <Container className="py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 min-w-0 mr-2">
          <div className="w-10 h-10 shrink-0 rounded-[12px] bg-primary flex items-center justify-center text-[18px] text-primary-content">
            🛒
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[20px] font-bold leading-[28px] tracking-[-0.5px] text-base-content truncate">
              বাজার দর
            </span>
            <span
              className="text-[11px] sm:text-[12px] font-normal leading-[16px] text-base-content truncate"
              suppressHydrationWarning
            >
              {dateStr}
            </span>
          </div>
        </Link>

        <div className="shrink-0">
          <AuthNavBlock />
        </div>
      </Container>


      <CategoryNav categories={categories} />
    </header>
  );
}
