import { Unit } from '@/types/product';

const numberFormat = new Intl.NumberFormat('bn-BD');
const decimalFormat = new Intl.NumberFormat('bn-BD', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const percentFormat = new Intl.NumberFormat('bn-BD', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

export function formatPrice(n: number): string {
  if (Number.isInteger(n)) {
    return numberFormat.format(n);
  }
  return decimalFormat.format(n);
}

export function formatTaka(n: number): string {
  return `${formatPrice(n)} টাকা`;
}

export function formatPercent(pct: number): string {
  return `${percentFormat.format(Math.abs(pct))}%`;
}

export function getUnitLabel(unit: Unit | string): { per: string; short: string } {
  switch (unit) {
    case 'kg':
      return { per: 'প্রতি কেজি', short: 'কেজি' };
    case 'litre':
      return { per: 'প্রতি লিটার', short: 'লিটার' };
    case 'dozen':
      return { per: 'প্রতি ডজন', short: 'ডজন' };
    case 'piece':
      return { per: 'প্রতি পিস', short: 'পিস' };
    default:
      return { per: `প্রতি ${unit}`, short: unit };
  }
}
