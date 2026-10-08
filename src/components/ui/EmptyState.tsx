import Link from 'next/link';

export function EmptyState({
  emoji,
  title,
  description,
  ctaHref,
  ctaLabel
}: {
  emoji: string;
  title: string;
  description?: string;
  ctaHref: string;
  ctaLabel: string;
}) {
  return (
    <div className="bg-base-100 border border-base-300 rounded-[16px] py-[40px] px-[24px] max-w-xl mx-auto text-center flex flex-col items-center">
      <div className="text-[48px] leading-none mb-4">{emoji}</div>
      <h2 className="text-[24px] font-bold leading-[32px] text-base-content mb-2">{title}</h2>
      {description && (
        <p className="text-[14px] text-base-content/70 mb-6">{description}</p>
      )}
      <Link 
        href={ctaHref}
        className="h-9 px-3 text-sm sm:h-10 sm:px-[17px] inline-flex items-center justify-center rounded-[8px] bg-primary text-primary-content font-semibold hover:bg-primary-strong focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none transition-all"
      >
        {ctaLabel}
      </Link>
    </div>
  );
}
