"use client";

import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

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

export type Platform = "instagram" | "telegram" | "youtube" | "tiktok";

interface FilterBarProps {
  activePlatform: Platform;
  onPlatformChange: (p: Platform) => void;
  activeCategory: string;
  onCategoryChange: (c: string) => void;
}

const platforms = [
  { id: "instagram", label: "Instagram", icon: InstagramIcon, color: "hover:bg-pink-50 hover:text-pink-600 dark:hover:bg-pink-900/20" },
  { id: "telegram", label: "Telegram", icon: TelegramIcon, color: "hover:bg-blue-50 hover:text-blue-500 dark:hover:bg-blue-900/20" },
  { id: "youtube", label: "YouTube", icon: YoutubeIcon, color: "hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20" },
  { id: "tiktok", label: "TikTok", icon: TiktokIcon, color: "hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800" },
];

export const categories = [
  { id: "all", label: "Hammasi", emoji: "🔥" },
  { id: "lifestyle", label: "Lifestyle", emoji: "☕" },
  { id: "tech", label: "Texnologiya", emoji: "💻" },
  { id: "beauty", label: "Go'zallik", emoji: "✨" },
  { id: "humor", label: "Yumor", emoji: "😂" },
  { id: "food", label: "Ovqat", emoji: "🍔" },
  { id: "business", label: "Biznes", emoji: "💼" },
  { id: "travel", label: "Sayohat", emoji: "✈️" },
  { id: "education", label: "Ta'lim", emoji: "📚" },
];

export function FilterBar({ 
  activePlatform, onPlatformChange, 
  activeCategory, onCategoryChange 
}: FilterBarProps) {
  return (
    <div className="sticky top-16 z-40 w-full glass-panel border-b-0 border border-border/10">
      <div className="container mx-auto px-4 py-4 md:py-5 space-y-4 md:space-y-5">
        
        {/* Top filter: Platforms & All Filters Action */}
        <div className="flex items-center justify-between">
          <div className="flex items-center glass-content p-1.5 rounded-2xl w-full sm:w-auto overflow-x-auto hide-scrollbar">
            {platforms.map((p) => {
              const Icon = p.icon;
              const isActive = activePlatform === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => onPlatformChange(p.id as Platform)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ease-out whitespace-nowrap",
                    isActive 
                      ? "bg-white/90 dark:bg-zinc-800 text-foreground scale-[1.02]" 
                      : `text-muted-foreground hover:bg-white/50 dark:hover:bg-zinc-800/50`
                  )}
                >
                  <Icon className={cn("w-4 h-4", isActive && p.id === 'instagram' ? "text-pink-500" : isActive && p.id === 'telegram' ? "text-blue-500" : isActive && p.id === 'youtube' ? "text-red-500" : isActive && p.id === 'tiktok' ? "text-foreground" : "")} />
                  {p.label}
                </button>
              );
            })}
          </div>

          <div className="hidden lg:flex shrink-0">
            <Button variant="outline" className="rounded-full h-[48px] px-6 gap-2 font-medium bg-background transition-all duration-300 hover:border-primary/30">
              <SlidersHorizontal className="h-4 w-4" />
              Barcha filterlar
            </Button>
          </div>
        </div>

        {/* Secondary filter: Categories */}
        <ScrollArea className="w-full whitespace-nowrap -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex w-max space-x-2.5 pb-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onCategoryChange(cat.id)}
                  className={cn(
                    "flex items-center gap-2.5 px-5 py-2 rounded-full border text-sm font-medium transition-all duration-300 shrink-0",
                    isActive 
                      ? "border-primary bg-primary text-primary-foreground scale-105"
                      : "border-border/40 glass-content text-muted-foreground hover:border-border hover:bg-background/80 hover:text-foreground"
                  )}
                >
                  <span className="text-base">{cat.emoji}</span>
                  {cat.label}
                </button>
              );
            })}
          </div>
          <ScrollBar orientation="horizontal" className="hidden invisible" />
        </ScrollArea>
      </div>
    </div>
  );
}

