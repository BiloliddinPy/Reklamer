"use client";

import { Search } from "lucide-react";

export function HeroSearch() {
  return (
    <div className="w-full max-w-2xl mx-auto mt-2 mb-1 px-4 relative z-30">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground group-focus-within:text-foreground transition-colors" />
        </div>
        <input
          type="text"
          placeholder="Ism, nom yoki kalit so'z bilan izlang..."
          className="w-full h-12 sm:h-14 pl-12 sm:pl-14 pr-28 sm:pr-32 rounded-full bg-background border-2 border-border/80 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium text-sm sm:text-[15px] placeholder:text-muted-foreground"
        />
        <div className="absolute inset-y-1.5 right-1.5">
          <button className="h-full px-5 sm:px-6 bg-foreground hover:bg-foreground/90 text-background rounded-full flex items-center justify-center transition-transform active:scale-95 font-semibold text-[13px] sm:text-sm">
            Qidirish
          </button>
        </div>
      </div>
    </div>
  );
}
