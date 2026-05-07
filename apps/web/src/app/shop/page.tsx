import { SlidersHorizontal } from "lucide-react";
import { ProductCard } from "../../components/product-card";
import { api } from "../../lib/api";

export default async function ShopPage({ searchParams }: { searchParams: { category?: string; q?: string } }) {
  const [{ products }, { categories }] = await Promise.all([
    api.getProducts().catch(() => ({ products: [] })),
    api.getCategories().catch(() => ({ categories: [] }))
  ]);

  const filtered = products.filter((product) => {
    const categoryOk = searchParams.category ? product.category.slug === searchParams.category : true;
    const queryOk = searchParams.q ? `${product.name} ${product.brand}`.toLowerCase().includes(searchParams.q.toLowerCase()) : true;
    return categoryOk && queryOk;
  });

  return (
    <div className="mx-auto grid max-w-container-max gap-6 px-4 py-8 lg:grid-cols-[260px_1fr]">
      <aside className="rounded-xl border border-outline-variant/30 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-2 font-headline-md text-primary"><span className="material-symbols-outlined">tune</span> Filters</div>
        <div className="space-y-8 text-sm">
          <div>
            <h3 className="font-label-lg text-on-surface mb-3 uppercase tracking-widest">Category</h3>
            <div className="grid gap-2">
              {categories.map((category: any) => (
                <label key={category.id} className="flex items-center gap-2 font-body-md text-on-surface-variant cursor-pointer hover:text-primary transition-colors">
                  <input 
                    type="checkbox" 
                    className="rounded text-primary focus:ring-primary" 
                    defaultChecked={searchParams.category === category.slug} 
                  /> 
                  {category.name}
                </label>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-label-lg text-on-surface mb-3 uppercase tracking-widest">Size</h3>
            <div className="flex flex-wrap gap-2">
              {["S", "M", "L", "XL", "Free"].map((size) => (
                <button key={size} className="h-10 min-w-10 rounded border border-outline-variant/30 text-label-md hover:border-primary hover:text-primary transition-all">
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-label-lg text-on-surface mb-3 uppercase tracking-widest">Price Range</h3>
            <input type="range" min="500" max="50000" className="w-full accent-primary" />
            <div className="flex justify-between mt-1 text-[10px] font-black uppercase text-on-surface-variant">
              <span>₹500</span>
              <span>₹50,000+</span>
            </div>
          </div>
          <div>
            <h3 className="font-label-lg text-on-surface mb-3 uppercase tracking-widest">Rating</h3>
            <label className="flex items-center gap-2 font-body-md text-on-surface-variant cursor-pointer hover:text-primary transition-colors">
              <input type="checkbox" className="rounded text-primary focus:ring-primary" /> 4 stars & above
            </label>
          </div>
        </div>
      </aside>
      
      <section>
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface">Curated Collections</h1>
            <p className="mt-1 font-body-md text-on-surface-variant">{filtered.length} exquisite pieces found</p>
          </div>
          <div className="flex items-center gap-md">
            <span className="font-label-md text-on-surface-variant">Sort by:</span>
            <select className="h-11 rounded-lg border border-outline-variant/30 bg-white px-4 font-label-md text-label-md outline-none focus:ring-1 focus:ring-primary">
              <option>Newest First</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Most Popular</option>
            </select>
          </div>
        </div>
        
        <div className="grid gap-gutter sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((product: any) => (
            <ProductCard 
              key={product.id} 
              product={{
                ...product,
                image: product.images?.[0]?.url || "",
                price: product.variants?.[0]?.salePrice || 0,
                mrp: product.variants?.[0]?.mrp || 0
              }} 
            />
          ))}
        </div>
        
        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <span className="material-symbols-outlined text-6xl text-outline-variant/50">inventory_2</span>
            <p className="mt-4 font-headline-md text-on-surface-variant">No pieces found matching your criteria.</p>
            <button className="mt-md text-primary font-label-lg border-b border-primary pb-1">Clear all filters</button>
          </div>
        )}
      </section>
    </div>
  );
}
