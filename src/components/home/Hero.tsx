import Image from 'next/image';
import { getBanglaDate } from '@/lib/date';
import { connection } from 'next/server';
import { Container } from '@/components/layout/Container';

export async function Hero() {
  await connection();
  const dateStr = getBanglaDate();

  return (
    <Container className="mt-6">
      <div className="bg-base-100 border border-base-300 rounded-[24px] py-6 px-4 md:py-10 md:px-10 flex flex-col md:flex-row justify-between items-center md:items-start gap-6">
        
        {/* Left Column */}
        <div className="w-full max-w-xl flex flex-col items-center text-center md:items-start md:text-left">
          {/* Eyebrow */}
          <div className="rounded-[14px] px-3 py-1 bg-primary/10 text-primary text-[14px] font-medium leading-[20px] mb-2">
            {dateStr}
          </div>

          {/* Main Heading */}
          <h1 className="text-[28px] md:text-[36px] font-bold leading-[36px] md:leading-[45px] text-base-content mb-1">
            আজকের বাজারের দাম এক নজরে
          </h1>

          {/* Subtitle */}
          <p className="text-[16px] font-normal leading-[24px] text-base-content mb-3">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          {/* CTA */}
          <a
            href="#সব-পণ্য"
            className="w-full md:w-auto h-9 px-3 text-sm sm:h-10 sm:px-[17px] inline-flex items-center justify-center rounded-[8px] bg-primary border border-primary-strong text-primary-content font-semibold hover:bg-primary-strong active:translate-y-px focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none transition-all shadow-[0_4px_1.5px_rgba(5,137,62,0.3),_0_3px_1px_rgba(5,137,62,0.3),_inset_0_0.5px_0_rgba(255,255,255,0.06)] active:shadow-[0_1px_1px_rgba(5,137,62,0.3),_inset_0_0.5px_0_rgba(255,255,255,0.06)]"
          >
            সব পণ্য দেখুন
          </a>
        </div>

        {/* Right Column (Image) */}
        <div className="flex-shrink-0">
          <Image
            src="/bazar-hero.png"
            alt="ঝুড়িতে তাজা ফল ও সবজির ছবি"
            width={315}
            height={263}
            unoptimized
            priority
            className="max-w-[240px] md:max-w-none w-auto h-auto object-contain"
          />
        </div>
      </div>
    </Container>
  );
}
