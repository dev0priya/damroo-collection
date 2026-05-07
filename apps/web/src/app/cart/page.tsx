import Link from "next/link";
import { money, api } from "../../lib/api";

export default async function CartPage() {
  const { products } = await api.getProducts().catch(() => ({ products: [] }));
  const cartItems = products.slice(0, 1).map((p: any) => ({
    ...p,
    image: p.images?.[0]?.url || "",
    price: p.variants?.[0]?.salePrice || 0,
    mrp: p.variants?.[0]?.mrp || 0
  }));

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const shipping = subtotal >= 199900 || subtotal === 0 ? 0 : 9900;
  const tax = Math.round(subtotal * 0.05);

  return (
    <div className="mx-auto grid max-w-container-max gap-xl px-gutter py-xl lg:grid-cols-[1fr_380px]">
      <section>
        <div className="flex items-center gap-md mb-xl">
          <span className="material-symbols-outlined text-4xl text-primary">shopping_bag</span>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Shopping Bag</h1>
        </div>
        
        {cartItems.length > 0 ? (
          <div className="space-y-lg">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-lg p-md border border-outline-variant/30 rounded-xl bg-surface-container-lowest shadow-sm overflow-hidden">
                <img src={item.image} alt={item.name} className="h-48 w-36 rounded-lg object-cover" />
                <div className="flex-1 flex flex-col justify-between py-2">
                  <div>
                    <h2 className="font-headline-md text-on-surface mb-1">{item.name}</h2>
                    <p className="font-body-md text-on-surface-variant uppercase tracking-widest text-xs">{item.brand}</p>
                    <div className="mt-md flex items-center gap-md">
                      <span className="font-label-lg text-primary text-xl">{money(item.price)}</span>
                      {item.mrp > item.price && (
                        <span className="font-body-md text-on-surface-variant line-through text-sm">{money(item.mrp)}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-xl text-xs font-label-lg uppercase tracking-widest">
                    <button className="text-primary hover:font-black transition-all flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">favorite</span> Move to Wishlist
                    </button>
                    <button className="text-on-surface-variant hover:text-error transition-all flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">delete</span> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-surface-container-low rounded-xl border border-dashed border-outline-variant/50">
            <span className="material-symbols-outlined text-6xl text-outline-variant/30 mb-md">shopping_cart_off</span>
            <h2 className="font-headline-md text-on-surface-variant">Your bag is empty</h2>
            <Link href="/shop" className="mt-lg inline-block bg-primary text-on-primary font-label-lg px-xl py-md rounded-full uppercase tracking-widest shadow-lg">
              Start Shopping
            </Link>
          </div>
        )}
      </section>

      <aside className="space-y-lg">
        <div className="bg-surface-container p-xl rounded-xl border border-outline-variant/30 shadow-sm sticky top-28">
          <h2 className="font-label-lg text-on-surface uppercase tracking-widest mb-xl border-b border-outline-variant/20 pb-md">Order Summary</h2>
          <div className="space-y-md font-body-md text-on-surface-variant">
            <div className="flex justify-between">
              <span>Bag Subtotal</span>
              <span className="text-on-surface">{money(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Shipping</span>
              <span className={shipping === 0 ? "text-green-600 font-bold" : "text-on-surface"}>
                {shipping === 0 ? "FREE" : money(shipping)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Taxes</span>
              <span className="text-on-surface">{money(tax)}</span>
            </div>
            <div className="pt-md border-t border-outline-variant/20 flex justify-between font-label-lg text-on-surface text-xl">
              <span>Total Amount</span>
              <span className="text-primary">{money(subtotal + shipping + tax)}</span>
            </div>
          </div>
          <button className="w-full bg-primary text-on-primary font-label-lg py-md rounded-lg mt-xl hover:shadow-xl transition-all active:scale-[0.98] uppercase tracking-widest font-black shadow-lg">
            Proceed to Checkout
          </button>
          <div className="mt-lg flex items-center justify-center gap-2 text-xs text-on-surface-variant uppercase tracking-tighter">
            <span className="material-symbols-outlined text-sm">lock</span> 100% Secure Checkout
          </div>
        </div>
      </aside>
    </div>
  );
}
