export function ShopTheFeed() {
  const feed = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuASK5S7fsgdX2V6UPb1zdoK58wEtzaCbLOvm6lkgI7DqM8Ayb_gTBdDW0q13420zXCYVgHku6UCn_z0Xx0f4PuZhxoLo6HWoLGwt3xn2sva9XvvWNE9dgMs0ykjuRHumazKCQ3OiVf-6SOaosXtQtlBIt76UqFOHa6cvV-qfAlKm58wBIWpTy26z4hZKScJcmi8KmfueJfR1BPkFlmJC242D54AJTD8briNvoSdua2ISEEF8e6D457j71PAEjOech9Pc_ENfPC-sxW7",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCs3PjSr3VGzG1GeauiPZohFHi5agElwWCM-4CFLAizt3SnZ8GHj3Ai30Kmdd7UZx37BU0-8WRCndxT88Ud-AmdmQOdCkvLTE_HhbpOLBzWFZdjgH4n4JH9n_osiTWqbed2XIbqKMaomsJrB-1N7Fs5hlK6hT9d7_4q9XBQ3jxq_nrSZHkuiF-75ffVbfeMQ7oTVkXZFzNEvrsO_6CKoS9ciOqY4ejYVwDyhGbC1icMTmRS3_GJ_dMxnVBxo8GvgZ8QBkgXvdxEHfiD",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDaKMSgH54YuMCuMyxaiabYyPsg03ST3nG07o2VaqJaPVsebnRsLaCFGNdbckRTaCtewyjRn4k1wWeus_9MR-KhE_82cI1TEtbpDwVXu1UTpFRjFrIHAcJm0V255e9bmB-yAFv6UrpyNy8LKEj0nuu9bsp1txeCc0Gs3sFuxKyEpdVF7JO9EcKcPtoe_i8dNKtEF_459Mct6eLDxscpD80jnav7ZRU-RYu1Xd0f9L-EnaK2kYEww6qvL03ZpCrNikaEDZZGfIVboubz",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDEq5c-BZmXKTq7zKEXs6cv_yXflkVMbaT2s3wNDP-TD--9-ofiXFTshKTj3pFHhdF_kSC_7s5ieBCXjGeoON3zJEnzgufcF4aYtxGJEBRGOZYTjCLabo7DDglEEwsR6Ssqr109dtHVVvQuMP3Y9w8KjTm3S-tAwjqzKdPhtoToEn6NTJlQrp_4sM6c1L7e__f5e_JmuwI-5zfiSpXoQeXBeSQCF79fopqTdkFzmlb2uC5OoCoL_i2A2CRsueY8UepZn3cAB45WBsSQ",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCH_efgUSgjZCGF-H_sYAhSDC-5R_Kv-fno0UKRRqLJxwaPNKSK8n_pTsb-cVVWZBJesWFOQtmRVaOpL9uw3gniBOX2toNyLHDP_buBdhA89hGBv__AxpgVSwEbg4mfD1OhjstNd_0hos3VI-4uEWxkZ36dVsmCGMAE7IlKAr9xcLk6tSjJf8Y70pR520ASx1dKpn1F--LmTsyg8JM84fMpGQ56kyA65xovE8P35hVhrtAGmj35GGNmhx09vTvHYdlENhYsMib5t4uG"
  ];

  return (
    <section className="py-xl overflow-hidden">
      <div className="max-w-container-max mx-auto px-gutter mb-lg">
        <h2 className="font-headline-md text-headline-md text-on-surface text-center">Shop the Feed</h2>
        <p className="font-body-md text-body-md text-on-surface-variant text-center">Follow @MODAANDCO for daily inspiration</p>
      </div>
      <div className="flex overflow-x-auto no-scrollbar gap-sm px-gutter pb-4">
        {feed.map((img, idx) => (
          <div key={idx} className="flex-shrink-0 w-64 md:w-80 group relative overflow-hidden rounded-xl">
            <img 
              alt={`Feed ${idx + 1}`} 
              className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-110" 
              src={img} 
            />
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button className="bg-surface text-on-surface font-label-md px-md py-sm rounded-full shadow-lg flex items-center gap-xs">
                <span className="material-symbols-outlined text-sm">shopping_bag</span> Shop Item
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
