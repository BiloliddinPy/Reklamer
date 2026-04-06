"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { HeroSearch } from "@/features/catalog/components/HeroSearch";
import { CategoryCarousel } from "@/features/catalog/components/CategoryCarousel";
import { CatalogResults } from "@/features/catalog/components/CatalogResults";
import { Loader2 } from "lucide-react";
import { readCatalogFilters, updateCatalogParam } from "@/features/catalog/model/catalog.query";
import { useCatalogTransitionKey } from "@/features/catalog/model/useCatalogTransitionKey";
import { useCatalogData } from "@/features/catalog/model/useCatalogData";

function CatalogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const filters = readCatalogFilters(searchParams);
  const { category, platform, isTopFilter, search } = filters;
  const transitionKey = useCatalogTransitionKey(filters);
  const { influencers, categories, platforms, isLoading } = useCatalogData({
    category,
    platform,
    isTop: isTopFilter,
    search,
  });

  const setCategory = (c: string) => {
    router.replace(`?${updateCatalogParam(searchParams, "category", c)}`, { scroll: false });
  };

  const setPlatform = (p: string) => {
    router.replace(`?${updateCatalogParam(searchParams, "platform", p)}`, { scroll: false });
  };

  const clearFilters = () => {
    router.replace("/catalog", { scroll: false });
  };

  return (
    <div className="flex flex-col flex-1 bg-background selection:bg-primary/20">
      
      {/* Hero Section with Search Input */}
      <div className="bg-muted/20 pt-4 pb-2">
        <HeroSearch />
      </div>

      <CategoryCarousel 
        activeCategory={category}
        onCategoryChange={setCategory}
        activePlatform={platform}
        onPlatformChange={setPlatform}
        categories={categories}
        platforms={platforms}
      />
      
      <CatalogResults
        transitionKey={transitionKey}
        category={category}
        platform={platform}
        search={search}
        influencers={influencers}
        isLoading={isLoading}
        onClear={clearFilters}
      />
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <span className="text-foreground font-black text-lg">Katalog yuklanmoqda...</span>
        </div>
      </div>
    }>
      <CatalogContent />
    </Suspense>
  );
}
