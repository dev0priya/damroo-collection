"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const HERO_BANNERS = [
  {
    id: 1,
    title: "Editorial Collection 2024",
    subtitle: "Digital Silk Experience",
    description: "Elevating your wardrobe with curated pieces that define modern luxury. Craftsmanship meets digital elegance.",
    imageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2070",
    ctaText: "Explore Women",
    ctaLink: "/shop?category=women"
  },
  {
    id: 2,
    title: "Minimalist Elegance",
    subtitle: "The Neutral Palette",
    description: "Discover our latest range of premium pieces in sophisticated cream and beige tones. Perfect for the modern minimalist.",
    imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=2070",
    ctaText: "Shop Collection",
    ctaLink: "/shop"
  }
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % HERO_BANNERS.length);
      setIsTransitioning(false);
    }, 500);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const b = HERO_BANNERS[current];

  return (
    <section className="relative h-[80vh] md:h-[90vh] overflow-hidden bg-on-surface">
      {/* Background Image with Scale Animation */}
      <div className="absolute inset-0">
        <img 
          alt={b.title} 
          className={`w-full h-full object-cover transition-all duration-1000 ease-in-out ${isTransitioning ? "opacity-40 scale-105" : "opacity-100 scale-100"}`}
          src={b.imageUrl} 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center px-gutter">
        <div className="max-w-container-max mx-auto w-full">
          <div className={`max-w-2xl text-white transition-all duration-700 transform ${isTransitioning ? "translate-y-4 opacity-0" : "translate-y-0 opacity-100"}`}>
            <span className="font-label-lg uppercase tracking-[0.3em] mb-md block text-primary-fixed-dim border-l-2 border-primary pl-4">
              {b.subtitle}
            </span>
            <h1 className="font-headline-xl text-headline-xl md:text-8xl mb-lg leading-none font-bold tracking-tighter">
              {b.title.split(" ").map((word, i) => (
                <span key={i} className="inline-block mr-4">{word}</span>
              ))}
            </h1>
            <p className="font-body-lg text-body-lg mb-xl opacity-80 max-w-lg leading-relaxed">
              {b.description}
            </p>
            <div className="flex flex-wrap gap-md">
              <Link href={b.ctaLink} className="group relative bg-primary text-on-primary font-label-lg px-xl py-md rounded-full overflow-hidden transition-all hover:shadow-[0_0_20px_rgba(185,0,65,0.4)]">
                <span className="relative z-10 uppercase tracking-widest">{b.ctaText}</span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 opacity-10" />
              </Link>
              <Link href="/shop" className="bg-white/10 backdrop-blur-md text-white border border-white/20 font-label-lg px-xl py-md rounded-full hover:bg-white hover:text-on-surface transition-all uppercase tracking-widest">
                New Arrivals
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-12 left-gutter right-gutter flex justify-between items-center max-w-container-max mx-auto z-20">
        <div className="flex gap-4">
          {HERO_BANNERS.map((_, i) => (
            <button 
              key={i} 
              onClick={() => {
                setIsTransitioning(true);
                setTimeout(() => {
                  setCurrent(i);
                  setIsTransitioning(false);
                }, 400);
              }}
              className="group py-4"
            >
              <div className={`h-[2px] transition-all duration-500 ${current === i ? "w-16 bg-primary" : "w-8 bg-white/30 group-hover:bg-white/60"}`} />
            </button>
          ))}
        </div>
        
        {/* Slide Counter */}
        <div className="font-label-lg text-white/50 tracking-widest">
          <span className="text-white">0{current + 1}</span> / 0{HERO_BANNERS.length}
        </div>
      </div>

      {/* Side Decorative Text */}
      <div className="absolute right-[-100px] top-1/2 -rotate-90 hidden lg:block">
        <span className="font-label-lg text-white/20 uppercase tracking-[1em] whitespace-nowrap">DUMROO COLLECTION • EST 2024</span>
      </div>
    </section>
  );
}
