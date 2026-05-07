"use client";

import Link from "next/link";
import { money, type Product } from "../lib/api";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group cursor-pointer">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-surface-container-high mb-md shadow-[0_4px_20px_rgba(40,44,63,0.05)] group-hover:shadow-md transition-all">
          {/* Product Image with Zoom Effect */}
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
          />

          <button 
            className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <span className="material-symbols-outlined text-primary">favorite</span>
          </button>

          {product.badge && (
            <div className="absolute bottom-4 left-4 z-10">
              <span className="bg-primary text-on-primary font-label-md px-sm py-xs rounded uppercase tracking-widest text-[10px] font-black">
                {product.badge}
              </span>
            </div>
          )}
        </div>
      </Link>
      
      <div className="space-y-1">
        <h3 className="font-label-lg text-label-lg text-on-surface truncate">{product.name}</h3>
        <p className="font-body-md text-body-md text-on-surface-variant">{product.brand}</p>
        <p className="font-label-lg text-label-lg text-primary">
          {typeof product.price === "string" ? product.price : money(product.price)}
        </p>
      </div>
    </div>
  );
}
