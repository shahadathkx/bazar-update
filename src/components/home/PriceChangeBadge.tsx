import { CHANGE_STYLES } from '@/lib/price';
import { formatPercent } from '@/lib/format';

export function PriceChangeBadge({ dir, pct }: { dir: 'up' | 'down' | 'flat'; pct: number }) {
  const style = CHANGE_STYLES[dir];
  const value = dir === 'flat' ? '০.০%' : formatPercent(pct);
  
  return (
    <div className={`bg-base-200 rounded-[12px] px-2 py-1 flex items-center gap-1 text-[12px] font-semibold leading-[16px] ${style.textClass}`}>
      <span>{style.symbol}</span>
      <span>{value}</span>
    </div>
  );
}
