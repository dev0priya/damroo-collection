import Link from "next/link";
import { ProductCard } from "../product-card";

export function TrendingNow() {
  const dummyProducts = [
    {
      id: "1",
      name: "The Sculpted Blazer",
      brand: "Quiet Luxury",
      price: "$289.00",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC2DGL45jeD15wISvRgwcAGQjxZ1ZxJWs1Qu6CAAAdsIKFuqKDTShmuZclJjM7iJYbdevvc-iX_IwCBWu7MjD5SGvsrjGE8qSpAsG7buKM_OPm9GRTaZce_Qyi8MVfcp75KAYUnbrCoq-H-thcABJtgLq4nZIYnER9Q_lQVobqTv8Qrf2E48OwApKJEqv4wOLqHgBW1LHr-qsDtIOCxekr4a_SHgKx9OBSHlU_9fDMwD7iQfa6WaXRrdKEoK6mXzC0UhUPe2SWdDCFZ",
      badge: "NEW",
      slug: "sculpted-blazer"
    },
    {
      id: "2",
      name: "Magenta Silk Blouse",
      brand: "Trend-setters",
      price: "$145.00",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5fQkp9pZSZrR-Tyf9uaYiQpjygO5K5KPOkifOefioONlvTo1cZrSXiw3ceGu0mJpDRC9h4EZC-Ric_dvlRwgpW5RZvM5C8tafkUsyjd7r2_lzGBFqBzATWoQaW40Go_nDosQsJZ7QnHiJJEd7PZVIfgV_3gQj4Fpb0q7za_lFGHYChh2OjwlRgbWtQWj6QSwbn6g31pa3eMHPpMYstvLUlaVJetu1IzZmgT2aMTg6X6VIF0wx9USqAh-NYh_MEJBnuPes4WF2zMTt",
      slug: "magenta-silk-blouse"
    },
    {
      id: "3",
      name: "The Essential Slip",
      brand: "Quiet Luxury",
      price: "$195.00",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUkpAp5DrMIcfrQWU2ERqkX0slYyQMo886CQUCAW8O1TM0zBruAhj3qC68mHpzm35UI3PVO5Ah1t_mvrHcXPldDfcnXk7wNmN1SD2VxAjcLNjjRs2j2B9k0eIFhmPoNxXVvJRODmqehkJlrwaRBYiNPC7ZkwWDoQWtjBZcc5rb66vh57iML_j5OfZCtgljMk6bjLvqgqz2vflhz_ib3pL1OfKeKOHMAVO0OFqpnAN4vQ7UajJ4VZPO0MMOQw813fdtWLpKxJCesx8C",
      slug: "essential-slip"
    },
    {
      id: "4",
      name: "Architectural Knitwear",
      brand: "Trend-setters",
      price: "$210.00",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZnUWqDEWk1ZlucmDvxNfUP92r5-qKL9pEhZwHqGzOgWwNI4kWZ90O3PSsnaHBdI_8rrzdLxdPpXGryHA_M6aa28QAANyW7CcdgO2vvVROI-EodwtXKLipsh4kTJEwhV-01t8C6CU6PJCSi0VpVpQRXHDqdPCtRU359-xFVXi7j0Hf5YuL17m0xdVTm3URxabiwKMq2BTYjwVCoJz_kbIQVwVD3j6RVu7a8wMVPgCyp9CCQW9FXMKHOZRtA1iWRZZZo3VJz6Yo2PhG",
      slug: "architectural-knitwear"
    }
  ];

  return (
    <section className="py-xl max-w-container-max mx-auto px-gutter">
      <div className="flex justify-between items-end mb-xl">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Trending Now</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">The pieces everyone is talking about.</p>
        </div>
        <Link className="text-primary font-label-lg border-b border-primary pb-0.5 uppercase tracking-widest text-[10px] font-black" href="/shop">
          View All Collections
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-lg">
        {dummyProducts.map((product: any) => (
          <ProductCard 
            key={product.id} 
            product={product} 
          />
        ))}
      </div>
    </section>
  );
}
