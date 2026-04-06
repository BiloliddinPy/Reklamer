"use client";

import { cn } from "@/lib/utils";
import { Flame, Coffee, Laptop, Sparkles, Smile, Briefcase } from "lucide-react";

export type Platform = "instagram" | "telegram" | "youtube" | "tiktok";

interface SidebarFilterProps {
  activePlatform: Platform | "all";
  onPlatformChange: (p: Platform | "all") => void;
  activeCategory: string;
  onCategoryChange: (c: string) => void;
}

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const TelegramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
);

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
);

const TiktokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
);

const platforms = [
  { id: "all", label: "Barcha tarmoqlar", icon: Flame, color: "text-foreground" },
  { id: "instagram", label: "Instagram", icon: InstagramIcon, color: "text-pink-600 dark:text-pink-400" },
  { id: "telegram", label: "Telegram", icon: TelegramIcon, color: "text-blue-500 dark:text-blue-400" },
  { id: "youtube", label: "YouTube", icon: YoutubeIcon, color: "text-red-500 dark:text-red-400" },
  { id: "tiktok", label: "TikTok", icon: TiktokIcon, color: "text-zinc-900 dark:text-zinc-100" },
];

const categories = [
  { id: "all", label: "Barchasi", icon: Flame },
  { id: "lifestyle", label: "Lifestyle", icon: Coffee },
  { id: "tech", label: "Texnologiya", icon: Laptop },
  { id: "beauty", label: "Go'zallik", icon: Sparkles },
  { id: "humor", label: "Yumor", icon: Smile },
  { id: "business", label: "Biznes", icon: Briefcase },
];

export function SidebarFilter({ activePlatform, onPlatformChange, activeCategory, onCategoryChange }: SidebarFilterProps) {
  return (
    <div className="group hidden lg:flex flex-col fixed left-0 top-16 h-[calc(100vh-4rem)] w-[80px] hover:w-[260px] bg-card border-r border-border/60 transition-all duration-300 ease-in-out z-30 shadow-[4px_0_24px_rgba(0,0,0,0.02)] overflow-hidden">
      <div className="p-4 flex flex-col gap-8 w-[260px] h-full overflow-y-auto hide-scrollbar">
        
        {/* Platforms */}
        <div className="space-y-2 mt-4">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Platformalar
          </p>
          <div className="flex flex-col gap-1">
            {platforms.map((p) => {
              const isActive = activePlatform === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => onPlatformChange(p.id as Platform | "all")}
                  className={cn(
                    "flex items-center gap-4 px-3 py-2.5 rounded-xl transition-all duration-200 w-full text-left",
                    isActive ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground hover:bg-muted font-medium hover:text-foreground"
                  )}
                >
                  <p.icon className={cn("w-5 h-5 shrink-0", isActive ? "text-primary" : p.color)} />
                  <span className="truncate opacity-0 group-hover:opacity-100 transition-opacity duration-300">{p.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-2 pt-6 border-t border-border/50">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Kategoriyalar
          </p>
          <div className="flex flex-col gap-1">
            {categories.map((c) => {
              const isActive = activeCategory === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => onCategoryChange(c.id)}
                  className={cn(
                    "flex items-center gap-4 px-3 py-2.5 rounded-xl transition-all duration-200 w-full text-left",
                    isActive ? "bg-muted text-foreground font-semibold" : "text-muted-foreground hover:bg-muted/50 font-medium hover:text-foreground"
                  )}
                >
                  <c.icon className={cn("w-5 h-5 shrink-0", isActive ? "text-foreground" : "text-muted-foreground")} />
                  <span className="truncate opacity-0 group-hover:opacity-100 transition-opacity duration-300">{c.label}</span>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
