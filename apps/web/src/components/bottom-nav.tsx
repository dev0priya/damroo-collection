"use client";

import Link from "next/link";

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 w-full z-50 rounded-t-xl flex justify-around items-center py-sm pb-safe bg-surface dark:bg-inverse-surface md:hidden border-t border-outline-variant/20 shadow-[0_-4px_20px_rgba(40,44,63,0.05)]">
      <Link className="flex flex-col items-center justify-center text-primary dark:text-primary-fixed-dim font-bold scale-110 transition-transform duration-300" href="/">
        <span className="material-symbols-outlined">home</span>
        <span className="font-label-md text-label-md">Home</span>
      </Link>
      <Link className="flex flex-col items-center justify-center text-on-surface-variant dark:text-on-secondary-fixed-variant hover:bg-surface-variant/50 transition-colors" href="/shop">
        <span className="material-symbols-outlined">grid_view</span>
        <span className="font-label-md text-label-md">Categories</span>
      </Link>
      <Link className="flex flex-col items-center justify-center text-on-surface-variant dark:text-on-secondary-fixed-variant hover:bg-surface-variant/50 transition-colors" href="/wishlist">
        <span className="material-symbols-outlined">favorite</span>
        <span className="font-label-md text-label-md">Wishlist</span>
      </Link>
      <Link className="flex flex-col items-center justify-center text-on-surface-variant dark:text-on-secondary-fixed-variant hover:bg-surface-variant/50 transition-colors" href="/cart">
        <span className="material-symbols-outlined">shopping_bag</span>
        <span className="font-label-md text-label-md">Bag</span>
      </Link>
    </nav>
  );
}
