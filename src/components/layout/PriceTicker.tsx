import { tickerData } from '@/data/ticker';

export function PriceTicker() {
  return (
    <div
      className="bg-base-100 border-b border-base-300 overflow-hidden text-[13px] sm:text-[14px] leading-[20px]"
      role="marquee"
      aria-label="আজকের দামের পরিবর্তন"
    >
      <div className="flex group ticker-track hover:pause active:pause">
        {[...Array(2)].map((_, index) => (
          <div
            key={index}
            className="flex items-center shrink-0 min-w-max"
            aria-hidden={index === 1 ? 'true' : undefined}
          >
            {tickerData.map((item) => {
              const formattedPrice = item.price.toLocaleString('bn-BD');
              const formattedChange = Math.abs(item.changePercent).toLocaleString('bn-BD', {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              });
              const isUp = item.changePercent > 0;

              return (
                <div
                  key={item.id}
                  className="flex items-center gap-[6px] px-4 py-2 border-r border-base-200 whitespace-nowrap"
                >
                  <span>{item.emoji}</span>
                  <span className="font-medium text-base-content">{item.name}</span>
                  <span className="font-normal text-base-content">
                    {formattedPrice} টাকা/{item.unit}
                  </span>
                  <span
                    className={`font-semibold ${
                      isUp ? 'text-error' : 'text-success'
                    }`}
                  >
                    {isUp ? '▲' : '▼'} {formattedChange}%
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
