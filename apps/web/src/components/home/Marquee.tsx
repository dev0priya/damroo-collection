"use client";

export function Marquee() {
  const items = [
    "FREE SHIPPING ON ORDERS OVER ₹1999",
    "NEW SEASON ARRIVALS NOW LIVE",
    "LUXURY EDITORIAL COLLECTION 2024",
    "PREMIUM FABRIC • SUSTAINABLE FASHION",
    "UP TO 30% OFF ON ETHNIC WEAR",
    "DUMROO • THE DIGITAL SILK EXPERIENCE",
  ];

  return (
    <div className="bg-primary py-4 overflow-hidden border-y border-white/10 select-none">
      <div className="flex whitespace-nowrap animate-marquee">
        {/* Render twice for seamless loop */}
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex items-center">
            {items.map((item, idx) => (
              <div key={idx} className="flex items-center">
                <span className="text-on-primary font-label-lg uppercase tracking-[0.2em] px-12">
                  {item}
                </span>
                <span className="w-2 h-2 rounded-full bg-white/40" />
              </div>
            ))}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
