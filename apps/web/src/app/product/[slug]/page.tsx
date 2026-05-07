import { api, money } from "../../../lib/api";

export async function generateStaticParams() {
  const { products } = await api.getProducts().catch(() => ({ products: [] }));
  return products.map((product: any) => ({ slug: product.slug }));
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const { product } = await api.getProduct(params.slug).catch(() => ({ product: null }));

  if (!product) return <div className="py-20 text-center font-headline-md">Product not found.</div>;

  const displayPrice = product.variants?.[0]?.salePrice || 0;
  const displayMrp = product.variants?.[0]?.mrp || 0;

  return (
    <div className="mx-auto grid max-w-container-max gap-xl px-gutter py-xl lg:grid-cols-[1fr_450px]">
      <div className="grid gap-md grid-cols-1 md:grid-cols-2">
        {product.images?.length > 0 ? (
          product.images.map((img: any, index: number) => (
            <div key={index} className="aspect-[3/4] overflow-hidden rounded-xl bg-surface-container-low shadow-sm">
              <img src={img.url} alt={`${product.name} view ${index + 1}`} className="h-full w-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          ))
        ) : (
          <div className="aspect-[3/4] overflow-hidden rounded-xl bg-surface-container-low">
             <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          </div>
        )}
      </div>
      
      <section className="space-y-xl">
        <div>
          <p className="font-label-lg text-primary uppercase tracking-widest">{product.brand}</p>
          <h1 className="mt-2 font-headline-xl text-headline-xl text-on-surface leading-tight">{product.name}</h1>
          <div className="mt-md flex items-center gap-md">
            <div className="flex items-center gap-1 bg-green-100 px-2 py-0.5 rounded text-green-800 text-xs font-black">
              {product.rating} <span className="material-symbols-outlined text-[10px]">star</span>
            </div>
            <span className="font-body-md text-on-surface-variant text-sm border-l border-outline-variant/30 pl-md">{product.ratingCount} Ratings</span>
          </div>
        </div>

        <div className="flex items-baseline gap-xl py-lg border-y border-outline-variant/10">
          <span className="font-headline-lg text-headline-lg text-primary">{money(displayPrice)}</span>
          <span className="font-body-lg text-on-surface-variant line-through">{money(displayMrp)}</span>
          <span className="font-label-lg text-green-600 uppercase tracking-widest ml-auto">Inclusive of all taxes</span>
        </div>

        <div className="space-y-lg">
          <div className="flex items-center justify-between">
            <h2 className="font-label-lg text-on-surface uppercase tracking-widest">Select Size</h2>
            <button className="text-xs font-black text-primary uppercase border-b border-primary">Size Chart</button>
          </div>
          <div className="flex gap-md flex-wrap">
            {product.variants?.map((v: any) => (
              <button key={v.id} className="h-12 min-w-[60px] rounded-lg border-2 border-outline-variant/30 font-label-lg hover:border-primary hover:text-primary transition-all">
                {v.size}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-md sm:grid-cols-2">
          <button className="bg-primary text-on-primary font-label-lg py-xl rounded-xl hover:shadow-xl transition-all active:scale-[0.98] uppercase tracking-widest font-black flex items-center justify-center gap-2">
            <span className="material-symbols-outlined">shopping_bag</span> Add to Bag
          </button>
          <button className="bg-white text-on-surface border-2 border-outline-variant/30 font-label-lg py-xl rounded-xl hover:border-primary hover:text-primary transition-all active:scale-[0.98] uppercase tracking-widest font-black flex items-center justify-center gap-2">
            <span className="material-symbols-outlined">favorite</span> Wishlist
          </button>
        </div>

        <div className="p-xl bg-surface-container-low rounded-xl space-y-lg border border-outline-variant/20">
          <div className="flex items-center gap-md font-label-lg text-on-surface uppercase tracking-widest">
            <span className="material-symbols-outlined text-primary">local_shipping</span> Delivery Options
          </div>
          <div className="flex gap-md">
            <input className="h-12 flex-1 rounded-lg border border-outline-variant/30 bg-white px-md font-label-md outline-none focus:ring-1 focus:ring-primary" placeholder="Enter Pincode" />
            <button className="bg-inverse-surface text-inverse-on-surface px-lg rounded-lg font-label-md uppercase tracking-widest">Check</button>
          </div>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Please enter PIN code to check delivery time & Pay on Delivery Availability
          </p>
        </div>

        <div className="space-y-md pt-xl">
          <h2 className="font-label-lg text-on-surface uppercase tracking-widest border-b border-outline-variant/20 pb-2">Product Description</h2>
          <div className="font-body-md text-on-surface-variant leading-relaxed whitespace-pre-line">
            {product.description || "Premium fashion curation defined by quality craftsmanship and timeless elegance. Part of our Digital Silk collection."}
          </div>
        </div>
      </section>
    </div>
  );
}
