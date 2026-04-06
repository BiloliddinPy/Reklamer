"use client";

import { cn } from "@/lib/utils";
import { SlidersHorizontal, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { FiltersSidebar } from "@/features/catalog/components/FiltersSidebar";
import type { CategoryOption, FilterPlatform, PlatformOption } from "@/domain/catalog/types";

const platformIcons: Record<string, React.ReactNode> = {
  all: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-[10px] h-[10px] sm:w-[12px] sm:h-[12px] text-white"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-[10px] h-[10px] sm:w-[12px] sm:h-[12px] text-white"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
  ),
  telegram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-[10px] h-[10px] sm:w-[12px] sm:h-[12px] text-white"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-[10px] h-[10px] sm:w-[12px] sm:h-[12px] text-white"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-[10px] h-[10px] sm:w-[12px] sm:h-[12px] text-white"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
  ),
};

interface CategoryCarouselProps {
  activeCategory: string;
  onCategoryChange: (c: string) => void;
  activePlatform: FilterPlatform;
  onPlatformChange: (c: FilterPlatform) => void;
  categories: CategoryOption[];
  platforms: PlatformOption[];
}

export function CategoryCarousel({
  activeCategory,
  onCategoryChange,
  activePlatform,
  onPlatformChange,
  categories,
  platforms,
}: CategoryCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -250, behavior: 'smooth' });
  };
  
  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 250, behavior: 'smooth' });
  };

  return (
    <>
      <div className="w-full bg-background/95 backdrop-blur-md border-b border-border/40 py-2.5 sm:py-3 sticky top-[68px] z-40 transition-colors">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-6 w-full flex flex-col gap-2.5">
          
          {/* PLATFORMS ROW */}
          <div className="flex gap-2.5 overflow-x-auto hide-scrollbar pb-1">
            {platforms.map((plat) => {
              const isActive = activePlatform === plat.id;
              return (
                <button
                  key={plat.id}
                  onClick={() => onPlatformChange(plat.id)}
                  className={cn(
                    "flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold text-[13px] sm:text-sm transition-all duration-300 whitespace-nowrap",
                    isActive 
                      ? "bg-foreground text-background scale-105" 
                      : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground hover:-translate-y-0.5 border border-border/40"
                  )}
                >
                  <div className={cn("w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full shrink-0", plat.bg)}>
                    {platformIcons[plat.id]}
                  </div>
                  {plat.label}
                </button>
              );
            })}
          </div>

          {/* CATEGORIES ROW with CAROUSEL ARROWS */}
          <div className="flex items-center gap-2 w-full">
            <button 
              onClick={scrollLeft}
              className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full bg-background border border-border/60 text-muted-foreground hover:text-foreground hover:bg-muted transition-all active:scale-95 z-10 shrink-0 component-arrow"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            <div ref={scrollRef} className="flex-1 flex w-full items-center space-x-6 sm:space-x-8 pb-1 pt-1 overflow-x-auto hide-scrollbar scroll-smooth px-1">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => onCategoryChange(cat.id)}
                    className={cn(
                      "flex flex-col items-center gap-1.5 group transition-all duration-300 ease-out focus:outline-none shrink-0",
                      isActive ? "opacity-100" : "opacity-60 hover:opacity-100 hover:-translate-y-0.5"
                    )}
                  >
                    <div className={cn(
                      "w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-xl sm:text-2xl transition-all duration-300 ring-1 ring-offset-2 ring-offset-background overflow-hidden",
                      isActive ? "ring-foreground bg-muted" : "ring-border bg-muted/30 group-hover:bg-muted"
                    )}>
                      {cat.image.startsWith('http') || cat.image.startsWith('/') ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={cat.image} alt={cat.label} className="w-full h-full object-cover" />
                      ) : (
                        cat.image
                      )}
                    </div>
                    <span className={cn(
                      "text-[10px] sm:text-[11px] uppercase tracking-wider font-extrabold transition-colors duration-300",
                      isActive ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {cat.label}
                    </span>
                    
                    {/* Active Indicator Underline */}
                    <div className={cn(
                       "h-0.5 rounded-t-full bg-primary transition-all duration-300 mt-0",
                       isActive ? "w-5 opacity-100" : "w-0 opacity-0"
                    )} />
                  </button>
                );
              })}
            </div>

            <button 
              onClick={scrollRight}
              className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full bg-background border border-border/60 text-muted-foreground hover:text-foreground hover:bg-muted transition-all active:scale-95 z-10 shrink-0 component-arrow"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Filters Button (Right Aligned) */}
            <div className="hidden lg:flex pl-4 ml-2 border-l border-border/60 shrink-0">
              <Button 
                onClick={() => setIsSidebarOpen(true)}
                variant="outline" 
                className="rounded-full h-11 px-5 gap-2 font-bold bg-background border-border transition-all duration-300 text-foreground group"
              >
                <SlidersHorizontal className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                Boshqa filtrlar
              </Button>
            </div>
          </div>

        </div>
      </div>
      
      {/* Sidebar Overlay Modal */}
      <FiltersSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}
