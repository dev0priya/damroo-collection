"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function CategoryShowcase({ categories }: { categories: any[] }) {
  if (categories.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tighter text-stone-900 md:text-4xl">Featured Categories</h2>
          <div className="mt-2 h-1 w-20 bg-pink-600" />
        </div>
        <Link href="/shop" className="group flex items-center gap-1 text-sm font-black uppercase tracking-widest text-stone-500 hover:text-pink-600 transition">
          View All Collections <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {categories.map((cat) => (
          <Link 
            key={cat.id} 
            href={`/shop?category=${cat.slug}`} 
            className="group flex flex-col items-center gap-4 text-center"
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-full border-4 border-stone-100 shadow-sm transition-all group-hover:border-pink-200 group-hover:shadow-xl">
              <img 
                src={cat.imageUrl || "/placeholder-cat.png"} 
                alt={cat.name} 
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
            </div>
            <span className="text-sm font-black uppercase tracking-widest text-stone-600 transition group-hover:text-pink-600">{cat.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
