import { Container } from '@/components/layout/Container';

export default function Loading() {
  return (
    <Container className="pt-6 flex flex-col gap-6 animate-pulse">
      <div className="w-64 h-5 bg-base-200 rounded-[4px]"></div>
      
      <div className="bg-base-100 border border-base-300 rounded-[16px] p-[21px] flex flex-col md:flex-row gap-4 items-center">
        <div className="w-20 h-20 shrink-0 bg-base-200 rounded-[16px]"></div>
        <div className="flex-1 flex flex-col gap-3 w-full">
          <div className="w-48 h-8 bg-base-200 rounded-[8px]"></div>
          <div className="w-32 h-5 bg-base-200 rounded-[4px]"></div>
          <div className="w-full max-w-sm h-5 bg-base-200 rounded-[4px]"></div>
          <div className="w-24 h-7 bg-base-200 rounded-[8px] mt-2"></div>
        </div>
        <div className="w-full md:w-[120px] h-32 bg-base-200 rounded-[16px]"></div>
      </div>

      <div className="flex flex-col gap-8 mt-2">
        <section>
          <div className="w-40 h-7 bg-base-200 rounded-[4px] mb-3"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-base-100 border border-base-300 rounded-[16px] px-[25px] py-[17px] h-28"></div>
            ))}
          </div>
        </section>

        <section>
          <div className="w-48 h-7 bg-base-200 rounded-[4px] mb-3"></div>
          <div className="bg-base-100 border border-base-300 rounded-[16px] h-64"></div>
        </section>
      </div>
    </Container>
  );
}
