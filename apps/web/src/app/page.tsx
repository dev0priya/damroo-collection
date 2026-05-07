import { api } from "../lib/api";
import { HeroSlider } from "../components/home/HeroSlider";
import { Marquee } from "../components/home/Marquee";
import { HotDeals } from "../components/home/HotDeals";
import { TrustBar } from "../components/home/TrustBar";
import { TrendingNow } from "../components/home/TrendingNow";
import { Philosophy } from "../components/home/Philosophy";
import { AboutUsSection } from "../components/home/AboutUs";
import { ShopTheFeed } from "../components/home/ShopTheFeed";
import { ReachToUs } from "../components/home/ReachToUs";

export default async function HomePage() {
  const [{ banners }, { products }] = await Promise.all([
    api.getHeroBanners().catch(() => ({ banners: [] })),
    api.getProducts().catch(() => ({ products: [] }))
  ]);

  const activeBanners = banners.filter(b => b.isActive).sort((a, b) => a.rank - b.rank);
  const trendingProducts = products.filter(p => p.isFeatured || p.isBestSeller).slice(0, 4);

  return (
    <main className="min-h-screen">
      {/* 1. Hero Section */}
      <HeroSlider />
      <Marquee />

      {/* 2. Hot Deals Section */}
      <HotDeals />

      {/* 3. Trust Bar (Small Services) */}
      <TrustBar />

      {/* 4. Trending Now Section */}
      <TrendingNow />

      {/* 5. Our Philosophy Section */}
      <Philosophy />

      {/* 6. About Us Section */}
      <AboutUsSection />

      {/* 7. Shop the Feed Section */}
      <ShopTheFeed />

      {/* 8. Reach to Us Section */}
      <ReachToUs />
    </main>
  );
}
