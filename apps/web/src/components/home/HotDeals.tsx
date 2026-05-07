export function HotDeals() {
  const deals = [
    {
      title: "UP TO 50% OFF",
      label: "Urban Chic",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAASK5S7fsgdX2V6UPb1zdoK58wEtzaCbLOvm6lkgI7DqM8Ayb_gTBdDW0q13420zXCYVgHku6UCn_z0Xx0f4PuZhxoLo6HWoLGwt3xn2sva9XvvWNE9dgMs0ykjuRHumazKCQ3OiVf-6SOaosXtQtlBIt76UqFOHa6cvV-qfAlKm58wBIWpTy26z4hZKScJcmi8KmfueJfR1BPkFlmJC242D54AJTD8briNvoSdua2ISEEF8e6D457j71PAEjOech9Pc_ENfPC-sxW7",
      cta: "Shop Now"
    },
    {
      title: "30% OFF ACCESSORIES",
      label: "Summer Essentials",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCs3PjSr3VGzG1GeauiPZohFHi5agElwWCM-4CFLAizt3SnZ8GHj3Ai30Kmdd7UZx37BU0-8WRCndxT88Ud-AmdmQOdCkvLTE_HhbpOLBzWFZdjgH4n4JH9n_osiTWqbed2XIbqKMaomsJrB-1N7Fs5hlK6hT9d7_4q9XBQ3jxq_nrSZHkuiF-75ffVbfeMQ7oTVkXZFzNEvrsO_6CKoS9ciOqY4ejYVwDyhGbC1icMTmRS3_GJ_dMxnVBxo8GvgZ8QBkgXvdxEHfiD",
      cta: "Discover"
    },
    {
      title: "BUY 2 GET 1 FREE",
      label: "Luxury Edit",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDaKMSgH54YuMCuMyxaiabYyPsg03ST3nG07o2VaqJaPVsebnRsLaCFGNdbckRTaCtewyjRn4k1wWeus_9MR-KhE_82cI1TEtbpDwVXu1UTpFRjFrIHAcJm0V255e9bmB-yAFv6UrpyNy8LKEj0nuu9bsp1txeCc0Gs3sFuxKyEpdVF7JO9EcKcPtoe_i8dNKtEF_459Mct6eLDxscpD80jnav7ZRU-RYu1Xd0f9L-EnaK2kYEww6qvL03ZpCrNikaEDZZGfIVboubz",
      cta: "Redeem"
    }
  ];

  return (
    <section className="py-xl bg-surface-container-lowest">
      <div className="max-w-container-max mx-auto px-gutter">
        <div className="flex items-center justify-between mb-lg">
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Hot Deals</h2>
          <span className="text-primary font-label-lg flex items-center gap-xs">
            Exclusive Offers <span className="material-symbols-outlined">bolt</span>
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
          {deals.map((deal, idx) => (
            <div key={idx} className="relative group overflow-hidden rounded-xl h-64 cursor-pointer">
              <img 
                alt={deal.label} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                src={deal.image} 
              />
              <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-lg">
                <span className="font-label-lg text-white/90 tracking-widest uppercase mb-xs">{deal.label}</span>
                <h3 className="font-headline-md text-white mb-md uppercase">{deal.title}</h3>
                <div className="w-fit bg-white text-on-surface font-label-md px-md py-sm rounded-full group-hover:bg-primary group-hover:text-on-primary transition-colors">
                  {deal.cta}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
