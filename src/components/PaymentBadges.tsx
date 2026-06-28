/** Small, recognizable payment-brand marks shown as a trust row. */
const badgeBase =
  'inline-flex h-7 items-center justify-center rounded-md bg-white px-2 text-[11px] font-extrabold ring-1 ring-black/10';

export default function PaymentBadges({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`} aria-label="Accepted payment methods">
      <span className={`${badgeBase} text-[#ff6000]`}>DISC<span className="text-ink/80">OVER</span></span>
      <span className={`${badgeBase} italic text-[#1a1f71]`}>VISA</span>
      <span className={badgeBase} aria-label="Mastercard">
        <span className="-mr-1 h-4 w-4 rounded-full bg-[#eb001b]" />
        <span className="h-4 w-4 rounded-full bg-[#f79e1b]/90" />
      </span>
      <span className={`${badgeBase} text-[#006fcf]`}>AMEX</span>
      <span className={`${badgeBase} text-ink`}> Pay</span>
    </div>
  );
}
