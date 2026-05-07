"use client";

import Link from "next/link";

interface Category {
  title: string;
  items: string[];
}

interface MenuData {
  sections: Category[];
  banner: string;
}

const MENU_DATA: Record<string, MenuData> = {
  "Women Wear": {
    sections: [
      {
        title: "Western Wear",
        items: ["Dresses", "Mini Dresses", "Maxi Dresses", "Party Wear", "Bodycon Dresses", "Co-ord Sets", "Tops", "Crop Tops", "Shirts", "Oversized T-Shirts", "Skirts", "Mini Skirts", "Jeans", "Cargo Pants", "Shorts", "Jumpsuits"]
      },
      {
        title: "Seasonal Wear",
        items: ["Beach Wear", "Winter Wear", "Jackets", "Hoodies", "Shrugs"]
      },
      {
        title: "Ethnic Wear",
        items: ["Sarees", "Kurti Sets", "Anarkali Suits", "Lehengas", "Dupattas", "Ethnic Gowns"]
      }
    ],
    banner: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1000"
  },
  "Men Wear": {
    sections: [
      {
        title: "Top Wear",
        items: ["T-Shirts", "Oversized T-Shirts", "Polo T-Shirts", "Shirts", "Casual Shirts", "Formal Shirts", "Hoodies", "Sweatshirts"]
      },
      {
        title: "Bottom Wear",
        items: ["Jeans", "Cargo Pants", "Joggers", "Trousers", "Shorts"]
      },
      {
        title: "Ethnic Wear",
        items: ["Kurtas", "Kurta Sets", "Nehru Jackets"]
      },
      {
        title: "Footwear",
        items: ["Sneakers", "Casual Shoes", "Sports Shoes", "Loafers", "Boots"]
      }
    ],
    banner: "https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&q=80&w=1000"
  },
  "Ethnic Wear": {
    sections: [
      {
        title: "Women Ethnic",
        items: ["Sarees", "Silk Sarees", "Designer Sarees", "Lehenga Choli", "Salwar Suits", "Kurti Sets"]
      },
      {
        title: "Men Ethnic",
        items: ["Kurtas", "Sherwanis", "Nehru Jackets", "Dhoti Sets"]
      },
      {
        title: "Festive Collection",
        items: ["Wedding Wear", "Festival Wear", "Designer Collection"]
      }
    ],
    banner: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=1000"
  },
  "Footwear": {
    sections: [
      {
        title: "Men Footwear",
        items: ["Sneakers", "Running Shoes", "Loafers", "Boots", "Sandals"]
      },
      {
        title: "Women Footwear",
        items: ["Heels", "Flats", "Sandals", "Sneakers", "Boots"]
      },
      {
        title: "Sports Footwear",
        items: ["Gym Shoes", "Walking Shoes", "Training Shoes"]
      }
    ],
    banner: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000"
  },
  "Accessories": {
    sections: [
      {
        title: "Fashion Accessories",
        items: ["Sunglasses", "Watches", "Belts", "Caps", "Hair Accessories", "Scarves", "Wallets", "Keychains"]
      },
      {
        title: "Jewellery",
        items: ["Earrings", "Necklaces", "Bracelets", "Rings", "Anklets", "Fashion Jewellery", "Silver Jewellery", "Gold-Plated Jewellery"]
      },
      {
        title: "Bags & Wallets",
        items: ["Handbags", "Tote Bags", "Sling Bags", "Shoulder Bags", "Clutches", "Backpacks", "Laptop Bags", "Travel Bags", "Card Holders"]
      },

    ],
    // High-quality Handbag/Accessories Image
    banner: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=1000"
  }
};

export function MegaMenu({ activeCategory, onMouseEnter, onMouseLeave }: {
  activeCategory: string | null;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  if (!activeCategory || !MENU_DATA[activeCategory]) return null;

  const data = MENU_DATA[activeCategory];

  return (
    <div
      className="absolute top-full left-0 w-full bg-white shadow-2xl border-t border-outline-variant/10 z-[110] animate-in fade-in slide-in-from-top-2 duration-300"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="max-w-container-max mx-auto px-gutter py-xl flex gap-xl items-start">
        {/* Categories Sections */}
        <div className="flex-1 grid grid-cols-3 gap-xl">
          {data.sections.map((section, idx) => (
            <div key={idx} className="space-y-lg">
              <h4 className="font-label-lg text-primary uppercase tracking-widest mb-md">{section.title}</h4>
              <ul className="space-y-xs">
                {section.items.map((item, i) => (
                  <li key={i}>
                    <Link href={`/shop?category=${item.toLowerCase().replace(/ /g, "-")}`} className="font-body-md text-on-surface-variant hover:text-primary hover:font-bold transition-all">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Right Promotional Image Section - Adjusted for better balance */}
        <div className="w-[20%] max-w-[240px]">
          <div className="group/banner relative overflow-hidden rounded-xl aspect-[3/4] bg-surface-container-low shadow-sm">
            <img
              src={data.banner}
              alt={activeCategory}
              className="w-full h-full object-cover transition-transform duration-700 group-hover/banner:scale-110"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=1000";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex flex-col justify-end p-md">
              <span className="text-white text-[10px] uppercase tracking-widest mb-1">New In</span>
              <h3 className="text-white font-label-lg leading-tight mb-2">{activeCategory}</h3>
              <button className="w-fit bg-white text-on-surface text-[10px] px-3 py-1.5 rounded-full hover:bg-primary hover:text-on-primary transition-all uppercase tracking-widest font-black">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
