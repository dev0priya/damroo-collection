import { Truck, RotateCcw, ShieldCheck, Heart } from "lucide-react";

const promises = [
  {
    icon: <Truck className="h-8 w-8 text-pink-600" />,
    title: "Free Shipping",
    desc: "For all orders above ₹999"
  },
  {
    icon: <RotateCcw className="h-8 w-8 text-pink-600" />,
    title: "Easy Returns",
    desc: "7-day hassle-free policy"
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-pink-600" />,
    title: "Secure Payment",
    desc: "100% encrypted transactions"
  },
  {
    icon: <Heart className="h-8 w-8 text-pink-600" />,
    title: "Premium Quality",
    desc: "Handcrafted with pure love"
  }
];

export function BrandPromise() {
  return (
    <section className="bg-stone-900 py-16 text-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {promises.map((p, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-stone-800 p-4 transition-transform hover:scale-110">
                {p.icon}
              </div>
              <h3 className="text-lg font-black uppercase tracking-widest">{p.title}</h3>
              <p className="mt-2 text-sm text-stone-400">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
