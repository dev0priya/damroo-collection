export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export type Product = {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category: { name: string; slug: string };
  price: number;
  mrp: number;
  rating: number;
  ratingCount: number;
  image: string;
  images: { url: string; alt: string; rank: number }[];
  variants: { sku: string; size: string; color: string; mrp: number; salePrice: number; stock: number }[];
  description: string;
  badge?: string;
};

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, { 
    credentials: "include", 
    ...init,
    next: { revalidate: 60 } // Cache for 1 minute
  });
  if (!response.ok) throw new Error(`API error ${response.status}`);
  return response.json() as Promise<T>;
}

export function money(value: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value / 100);
}

export const api = {
  getProducts: () => apiFetch<{ products: any[] }>("/products"),
  getProduct: (slug: string) => apiFetch<{ product: any }>(`/products/${slug}`),
  getCategories: () => apiFetch<{ categories: any[] }>("/categories"),
  getHeroBanners: () => apiFetch<{ banners: any[] }>("/hero-banners"),
  getSiteConfig: () => apiFetch<{ config: Record<string, string> }>("/site-config"),
  getNavigation: (position?: string) => apiFetch<{ items: any[] }>(`/navigation${position ? `?position=${position}` : ""}`)
};
