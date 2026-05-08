import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { BottomNav } from "../components/bottom-nav";

export const metadata: Metadata = {
  title: "DAMROO COLLECTION | Digital Silk Experience",
  description: "Curated luxury for the modern individual.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Noto+Serif:wght@600;700&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
      </head>
      <body className="bg-surface text-on-surface font-body-md overflow-x-hidden">
        <SiteHeader />
        <main className="pt-20 min-h-screen">
          {children}
        </main>
        <SiteFooter />
        <BottomNav />
      </body>
    </html>
  );
}
