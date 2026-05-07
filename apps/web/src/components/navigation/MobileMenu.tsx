"use client";

import { useState } from "react";
import Link from "next/link";

interface Category {
  title: string;
  items: string[];
}

const MENU_DATA: Record<string, { sections: Category[] }> = {
  "Women Wear": {
    sections: [
      { title: "Western Wear", items: ["Dresses", "Tops", "Jeans", "Skirts"] },
      { title: "Seasonal Wear", items: ["Jackets", "Hoodies", "Shrugs"] },
      { title: "Ethnic Wear", items: ["Sarees", "Kurti Sets", "Lehengas"] }
    ]
  },
  "Men Wear": {
    sections: [
      { title: "Top Wear", items: ["T-Shirts", "Shirts", "Hoodies"] },
      { title: "Bottom Wear", items: ["Jeans", "Cargo Pants"] },
      { title: "Footwear", items: ["Sneakers", "Boots"] }
    ]
  },
  "Ethnic Wear": {
    sections: [
      { title: "Women Ethnic", items: ["Sarees", "Lehenga Choli"] },
      { title: "Men Ethnic", items: ["Kurtas", "Sherwanis"] }
    ]
  },
  "Footwear": {
    sections: [
      { title: "Men Footwear", items: ["Sneakers", "Loafers"] },
      { title: "Women Footwear", items: ["Heels", "Flats"] }
    ]
  },
  "Accessories": {
    sections: [
      { title: "Fashion Accessories", items: ["Sunglasses", "Watches", "Belts", "Caps"] },
      { title: "Jewellery", items: ["Earrings", "Necklaces", "Bracelets"] },
      { title: "Bags & Wallets", items: ["Handbags", "Tote Bags", "Backpacks"] }
    ]
  }
};

export function MobileMenu({ categories, isOpen, onClose }: { categories: string[], isOpen: boolean, onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] md:hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      {/* Sidebar Content */}
      <div className="absolute top-0 left-0 w-[85%] max-w-sm h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
        <div className="p-gutter border-b border-outline-variant/20 flex justify-between items-center bg-surface-container-low">
          <span className="font-headline-md text-primary font-bold tracking-tighter">DUMROO</span>
          <button onClick={onClose} className="p-2 text-on-surface-variant"><span className="material-symbols-outlined">close</span></button>
        </div>

        <div className="flex-1 overflow-y-auto p-gutter space-y-md">
          {categories.map((cat) => (
            <div key={cat} className="border-b border-outline-variant/10 pb-2">
              <button 
                className="w-full flex justify-between items-center py-2 text-left"
                onClick={() => setExpanded(expanded === cat ? null : cat)}
              >
                <span className="font-label-lg uppercase tracking-widest text-on-surface">{cat}</span>
                {MENU_DATA[cat] && (
                  <span className={`material-symbols-outlined transition-transform text-primary ${expanded === cat ? "rotate-180" : ""}`}>
                    expand_more
                  </span>
                )}
              </button>

              {expanded === cat && MENU_DATA[cat] && (
                <div className="pl-4 space-y-md py-md animate-in slide-in-from-top-2 duration-200">
                  {MENU_DATA[cat].sections.map((section, idx) => (
                    <div key={idx} className="space-y-sm">
                      <h4 className="font-label-md text-primary uppercase tracking-widest text-[10px]">{section.title}</h4>
                      <ul className="space-y-sm">
                        {section.items.map((item, i) => (
                          <li key={i}>
                            <Link href={`/shop?category=${item.toLowerCase().replace(/ /g, "-")}`} className="font-body-md text-on-surface-variant block py-1" onClick={onClose}>{item}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="p-gutter bg-surface-container-lowest border-t border-outline-variant/10">
          <p className="text-[10px] text-on-surface-variant text-center uppercase tracking-widest">Digital Silk Experience</p>
        </div>
      </div>
    </div>
  );
}
