import { ProductCard } from "../../components/product-card";
import { api } from "../../lib/api";

export default async function WishlistPage() {
  const { products } = await api.getProducts().catch(() => ({ products: [] }));

  return (
    <div className="mx-auto max-w-container-max px-gutter py-xl min-h-[60vh]">
      <div className="mb-xl text-center">
        <h1 className="font-headline-lg text-headline-lg text-on-surface">Your Wishlist</h1>
        <p className="font-body-md text-on-surface-variant mt-2">Curate your perfect digital silk collection.</p>
      </div>

      {products.length > 0 ? (
        <div className="grid gap-gutter sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 4).map((product: any) => (
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
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <span className="material-symbols-outlined text-6xl text-outline-variant/30 mb-md">favorite</span>
          <h2 className="font-headline-md text-on-surface-variant">Your wishlist is empty</h2>
          <p className="font-body-md text-on-surface-variant mb-lg">Start exploring and save your favorite pieces.</p>
          <button className="bg-primary text-on-primary font-label-lg px-xl py-md rounded-full uppercase tracking-widest">
            Explore Collections
          </button>
        </div>
      )}
    </div>
  );
}
