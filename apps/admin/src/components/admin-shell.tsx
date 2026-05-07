import { Boxes, FileText, LayoutDashboard, Package, ShoppingBag, Users, Image as ImageIcon, Settings } from "lucide-react";
import Link from "next/link";

const nav = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/products", label: "Products", icon: Package },
  { href: "/categories", label: "Categories", icon: Boxes },
  { href: "/hero", label: "Hero Banners", icon: ImageIcon },
  { href: "/pages", label: "Pages", icon: FileText },
  { href: "/settings", label: "CMS Settings", icon: Settings },
  { href: "/orders", label: "Orders", icon: ShoppingBag },
  { href: "/users", label: "Users", icon: Users }
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="border-r border-stone-200 bg-white p-4">
        <Link href="/" className="text-xl font-black">Damroo Admin</Link>
        <nav className="mt-8 grid gap-1">
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="flex min-h-11 items-center gap-3 rounded-md px-3 text-sm font-semibold text-stone-700 hover:bg-stone-100">
                <Icon className="h-4 w-4" /> {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className="p-4 md:p-8">{children}</main>
    </div>
  );
}
