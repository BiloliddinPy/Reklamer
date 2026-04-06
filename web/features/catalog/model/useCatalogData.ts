"use client";

import { useQuery } from "@tanstack/react-query";
import { categories as fallbackCategories, platforms as fallbackPlatforms } from "@/domain/catalog/mock";
import { filterInfluencers } from "@/domain/influencer/selectors";
import type { CategoryOption, PlatformOption } from "@/domain/catalog/types";
import type { Influencer } from "@/domain/influencer/types";
import { fetchCatalogData, type FetchCatalogFilters } from "../api/catalog";

interface CatalogDataResult {
  influencers: Influencer[];
  categories: CategoryOption[];
  platforms: PlatformOption[];
  isLoading: boolean;
}

export function useCatalogData(filters: FetchCatalogFilters): CatalogDataResult {
  const category = filters.category ?? "all";
  const platform = filters.platform ?? "all";
  const isTop = filters.isTop ?? false;
  const search = filters.search ?? "";

  const { data, isLoading } = useQuery({
    queryKey: ["catalog", { category, platform, isTop, search }],
    queryFn: () => fetchCatalogData({ category, platform, isTop, search }),
    placeholderData: (prev) => prev,
  });

  return {
    influencers: data?.influencers ?? filterInfluencers(filters),
    categories: data?.categories ?? fallbackCategories,
    platforms: data?.platforms ?? fallbackPlatforms,
    isLoading,
  };
}
