/** Small, recognizable payment-brand marks shown as a trust row. */
const badgeBase =
  'inline-flex h-7 items-center justify-center gap-1 rounded-md bg-white px-2 text-[11px] font-extrabold ring-1 ring-black/10';

export default function PaymentBadges({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`} aria-label="Accepted payment methods">
      <span className={`${badgeBase} text-[#6d1ed4]`}>Zelle</span>
      <span className={`${badgeBase} text-[#00d632]`}>Cash App</span>
      <span className={`${badgeBase} text-[#1ec677]`}>Chime</span>
      <span className={`${badgeBase} text-ink`} aria-label="Apple Pay">
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
          <path d="M16.37 12.78c.02 2.34 2.05 3.12 2.07 3.13-.02.06-.32 1.11-1.07 2.19-.64.94-1.31 1.86-2.36 1.88-1.03.02-1.36-.61-2.54-.61-1.18 0-1.55.59-2.52.63-1.01.04-1.78-1.01-2.43-1.94-1.32-1.92-2.33-5.42-.97-7.79.67-1.17 1.88-1.91 3.19-1.93.99-.02 1.93.67 2.54.67.6 0 1.75-.83 2.95-.71.5.02 1.91.2 2.82 1.52-.07.05-1.68 .98-1.66 2.93M14.5 5.36c.54-.65.9-1.56.8-2.46-.78.03-1.71.52-2.27 1.17-.5.57-.94 1.49-.82 2.37.86.07 1.75-.44 2.29-1.08"/>
        </svg>
        Pay
      </span>
    </div>
  );
}
