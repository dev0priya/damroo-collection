"use client";

import { useState } from "react";
import Link from "next/link";
import { MegaMenu } from "./navigation/MegaMenu";
import { MobileMenu } from "./navigation/MobileMenu";

export function SiteHeader() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const categories = [
    "Men Wear",
    "Women Wear",
    "Ethnic Wear",
    "Footwear",
    "Accessories",
    "Sale"
  ];

  return (
    <header 
      className="fixed top-0 w-full z-[100] bg-white/95 border-b border-outline-variant/30 backdrop-blur-md shadow-sm"
      onMouseLeave={() => setActiveMenu(null)}
    >
      <div className="flex justify-between items-center h-20 px-gutter max-w-container-max mx-auto">
        {/* Left Side: Logo + Nav */}
        <div className="flex items-center gap-2 md:gap-2xl flex-1">
          {/* Mobile Menu Button - Left aligned on mobile */}
          <button 
            className="md:hidden p-2 -ml-2 text-on-surface-variant hover:text-primary transition-all z-20"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="material-symbols-outlined text-[28px]">{isMobileMenuOpen ? "close" : "menu"}</span>
          </button>

          {/* Logo - Shifted slightly closer to hamburger on mobile */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <img 
              src="/damroo-logo.png" 
              alt="DAMROO" 
              className="h-10 md:h-20 w-auto object-contain transition-transform hover:scale-105 duration-300" 
            />
          </Link>

          {/* Desktop Navigation - Prevent Wrapping */}
          <nav className="hidden md:flex items-center gap-md lg:gap-lg h-20 overflow-hidden">
            {categories.map((cat) => (
              <div 
                key={cat}
                className="h-full flex items-center"
                onMouseEnter={() => setActiveMenu(cat)}
              >
                <Link 
                  href={`/shop?category=${cat.toLowerCase().replace(/ /g, "-")}`} 
                  className={`font-label-lg text-label-md lg:text-label-lg transition-all duration-300 py-2 border-b-2 tracking-wider uppercase whitespace-nowrap ${
                    activeMenu === cat ? "text-primary border-primary" : "text-on-surface-variant border-transparent hover:text-primary"
                  }`}
                >
                  {cat}
                </Link>
              </div>
            ))}
          </nav>
        </div>
        
        {/* Right Utilities: Search + Icons */}
        <div className="flex items-center gap-sm lg:gap-md">
          <div className="relative hidden xl:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
            <input 
              className="pl-9 pr-4 py-1.5 bg-surface-container border-none rounded-full w-48 xl:w-56 font-label-md text-label-md focus:ring-1 focus:ring-primary outline-none transition-all focus:w-64" 
              placeholder="Search..." 
              type="text"
            />
          </div>
          <div className="flex items-center gap-xs lg:gap-sm">
            <Link href="/profile" className="p-2 text-on-surface-variant hover:text-primary transition-all">
              <span className="material-symbols-outlined text-[24px]">person</span>
            </Link>
            <Link href="/wishlist" className="p-2 text-on-surface-variant hover:text-primary transition-all">
              <span className="material-symbols-outlined text-[24px]">favorite</span>
            </Link>
            <Link href="/cart" className="p-2 text-on-surface-variant hover:text-primary transition-all relative">
              <span className="material-symbols-outlined text-[24px]">shopping_bag</span>
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full border-2 border-white" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mega Menu Overlay */}
      <MegaMenu 
        activeCategory={activeMenu} 
        onMouseEnter={() => {} } 
        onMouseLeave={() => setActiveMenu(null)}
      />

      {/* Mobile Menu Accordion */}
      <MobileMenu 
        categories={categories} 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </header>
  );
}
