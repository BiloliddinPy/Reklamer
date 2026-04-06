"use client";

import { Flame, SearchX } from "lucide-react";
import type { Influencer } from "@/domain/influencer/types";
import { InfluencerCard } from "@/features/catalog/components/InfluencerCard";

interface CatalogResultsProps {
  transitionKey: string;
  category: string;
  platform: string;
  search: string;
  influencers: Influencer[];
  isLoading: boolean;
  onClear: () => void;
}

export function CatalogResults({
  transitionKey,
  category,
  platform,
  search,
  influencers,
  isLoading,
  onClear,
}: CatalogResultsProps) {
  return (
    <main className="flex-1 w-full max-w-screen-2xl mx-auto px-4 lg:px-6 py-6 md:py-8">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {category === "all" && platform === "all" ? (
            <>
              <Flame className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-heading font-black tracking-tight text-foreground">Eng ommabop yulduzlar</h2>
            </>
          ) : (
            <h2 className="text-xl font-heading font-black tracking-tight text-foreground">
              {influencers.length} ta natija topildi
            </h2>
          )}
        </div>
        {(category !== "all" || platform !== "all" || search) && (
          <button
            onClick={onClear}
            className="text-sm font-bold text-primary hover:text-primary/80 transition-colors"
          >
            Tozalash
          </button>
        )}
      </div>

      {influencers.length > 0 ? (
        <>
          <div key={transitionKey} className="grid grid-cols-2 min-[480px]:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-5 transition-all duration-300">
            {influencers.map((influencer, index) => (
              <div
                key={influencer.id}
                className="animate-scale-in"
                style={{ animationDelay: `${Math.min(index * 50, 500)}ms` }}
              >
                <InfluencerCard {...influencer} />
              </div>
            ))}
          </div>

          <div className="mt-12 text-center pb-12">
            <button className="px-8 py-3 rounded-full border border-border/60 bg-card text-foreground font-semibold hover:border-primary/50 hover:text-primary transition-all active:scale-95 duration-300 hover:-translate-y-0.5">
              Ko&apos;proq ko&apos;rsatish
            </button>
          </div>
        </>
      ) : isLoading ? (
        <div className="grid grid-cols-2 min-[480px]:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-5">
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={`catalog-skeleton-${index}`}
              className="rounded-[28px] border border-border/50 bg-card/70 overflow-hidden animate-pulse"
            >
              <div className="aspect-[4/5] bg-muted/70" />
              <div className="p-4 space-y-3">
                <div className="h-4 rounded-full bg-muted/70" />
                <div className="h-3 w-2/3 rounded-full bg-muted/60" />
                <div className="h-3 w-1/2 rounded-full bg-muted/50" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center animate-scale-in bg-muted/30 rounded-[32px] border border-border/50 mt-4">
          <div className="bg-card w-20 h-20 rounded-full flex items-center justify-center mb-6 border border-border/50">
            <SearchX className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-heading font-black text-foreground mb-2">Afsuski natija topilmadi</h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            Siz izlayotgan mezonlar bo&apos;yicha influenserlar tizimda mavjud emas.
          </p>
          <button
            onClick={onClear}
            className="mt-6 px-6 py-2.5 rounded-full border border-border/80 bg-background font-semibold hover:bg-muted transition-colors text-sm"
          >
            Filtrlarni bekor qilish
          </button>
        </div>
      )}
    </main>
  );
}
