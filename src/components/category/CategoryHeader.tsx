export function CategoryHeader({
  emoji,
  name,
  count
}: {
  emoji: string;
  name: string;
  count: string | null;
}) {
  return (
    <div className="bg-base-100 border border-base-300 rounded-[16px] p-[21px] flex flex-row gap-3 items-center">
      <div className="text-[36px] leading-[40px]">{emoji}</div>
      <div className="flex flex-col">
        <h1 className="text-[24px] font-bold leading-[32px] text-base-content">{name}</h1>
        {count && (
          <div className="text-[14px] leading-[20px] text-base-content/70">
            {count}টি পণ্যের আজকের দাম ও পরিবর্তন
          </div>
        )}
      </div>
    </div>
  );
}
