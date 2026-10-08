import { Product } from '@/types/product';
import { getMarketRows } from '@/lib/price';
import { formatTaka } from '@/lib/format';

export function MarketPriceTable({ product }: { product: Product }) {
  const rows = getMarketRows(product);

  return (
    <section>
      <h2 className="text-[18px] font-semibold leading-[28px] text-base-content mb-3">
        বাজারভিত্তিক আজকের দাম
      </h2>
      <div className="bg-base-100 border border-base-300 rounded-[16px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left">
            <caption className="sr-only">বাজারভিত্তিক দামের তালিকা</caption>
            <thead>
              <tr className="border-b border-base-300 text-[14px] font-semibold text-base-content/60">
                <th className="px-4 py-3 whitespace-nowrap">বাজার</th>
                <th className="px-4 py-3 whitespace-nowrap">বিভাগ</th>
                <th className="px-4 py-3 whitespace-nowrap text-right">সর্বনিম্ন</th>
                <th className="px-4 py-3 whitespace-nowrap text-right">সর্বাধিক</th>
                <th className="px-4 py-3 whitespace-nowrap text-right">গড়</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => {
                const key = `${row.market}-${row.division}`;
                return (
                  <tr 
                    key={key} 
                    className={`text-[14px] leading-[21px] text-base-content transition hover:bg-base-300/50 ${
                      i % 2 === 0 ? 'bg-base-100' : 'bg-base-200'
                    } ${i !== rows.length - 1 ? 'border-b border-base-300' : ''}`}
                  >
                    <td className="px-4 py-3 font-medium whitespace-nowrap">{row.market}</td>
                    <td className="px-4 py-3 font-normal whitespace-nowrap">{row.division}</td>
                    <td className="px-4 py-3 font-normal text-right whitespace-nowrap">{formatTaka(row.min)}</td>
                    <td className="px-4 py-3 font-normal text-right whitespace-nowrap">{formatTaka(row.max)}</td>
                    <td className="px-4 py-3 font-semibold text-right whitespace-nowrap">{formatTaka(row.avg)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
