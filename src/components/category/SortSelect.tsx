'use client';

type SortOption = 'default' | 'price-asc' | 'price-desc';

export function SortSelect({ 
  value, 
  onChange 
}: { 
  value: SortOption; 
  onChange: (val: SortOption) => void;
}) {
  return (
    <div className="bg-base-100 border border-base-300 rounded-[16px] p-[17px] flex items-center justify-between sm:justify-end gap-2">
      <label htmlFor="sort" className="text-[14px] leading-[20px] text-base-content">
        সাজান
      </label>
      <div className="relative">
        <select
          id="sort"
          value={value}
          onChange={(e) => onChange(e.target.value as SortOption)}
          className="h-8 rounded-[8px] border border-base-300 bg-base-100 text-[12px] leading-[18px] text-base-content pl-[13px] pr-[29px] appearance-none hover:border-base-content/40 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none transition-colors"
        >
          <option value="default">ডিফল্ট</option>
          <option value="price-asc">দাম: কম থেকে বেশি</option>
          <option value="price-desc">দাম: বেশি থেকে কম</option>
        </select>
        <svg 
          width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"
          className="absolute right-[10px] top-[11px] pointer-events-none opacity-50 text-base-content"
        >
          <path d="M2.5 3.5L5 6L7.5 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
}
