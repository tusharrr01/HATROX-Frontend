import { useMemo } from "react";

export const messages = [
  "Free shipping on orders over ₹999 ",
  "10% off first order with code WELCOME10",
  "New drops every Friday at 10AM",
  "24/7 customer support",
  "Easy 7‑day returns",
  "COD available in select cities",
  "Student discount 15% — verify with ID",
  "Limited-time: Buy 2, get 1 free",
  "HATROX Originals — made to last",
  "Express delivery in 2–4 days",
  "Secure payments: UPI, Cards, NetBanking",
  "Gift cards now available",
  "Join HATROX Rewards — earn points on every order",
  "Sustainable packaging on all orders",
  "Bestsellers are back in stock",
  "Summer Sale — up to 40% off",
  "Track your order in real time",
  "Refer a friend, both get ₹250 off",
  "New arrivals: sneakers, tees, totes",
  "Premium quality, fair prices",
  "Festive picks curated for you",
  "Free size exchange on apparel",
  "HATROX Care: warranty on select products",
  "Flash Deal — ends tonight",
  "Pay later with Simpl/Paytm Postpaid",
  "Extra 5% off on prepaid orders",
  "Bulk and corporate orders welcome",
  "Limited edition colors just landed",
  "Trending now: monochrome fits",
  "Members-only early access",
];


export default function TopMarquee() {
  // Duplicate items so the loop feels continuous
  const items = useMemo(() => [...messages, ...messages, ...messages], []);

  return (
    <div className="relative z-50 w-full overflow-hidden bg-zinc-200 text-zinc-800 border-b border-zinc-200">
      <div className="mx-auto max-w-screen-2xl">
        {/* Mask edges for cleaner fade */}
        <div className="relative">
          <div
            className="flex gap-8 whitespace-nowrap will-change-transform animate-marquee px-4 py-2 text-sm"
            aria-label="Site announcements"
          >
            {items.map((msg, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-2 text-zinc-700"
              >
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-zinc-300" />
                <span>{msg}</span>
              </span>
            ))}
          </div>

          {/* Optional gradient fade left/right */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-zinc-50 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-zinc-50 to-transparent" />
        </div>
      </div>
    </div>
  );
}
