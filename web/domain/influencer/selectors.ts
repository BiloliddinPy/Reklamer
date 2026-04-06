import type { FilterPlatform } from "@/domain/catalog/types";
import { mockInfluencers } from "@/domain/influencer/mock";
import type { Influencer } from "@/domain/influencer/types";

export interface InfluencerFilters {
  category?: string;
  platform?: FilterPlatform;
  isTop?: boolean;
  search?: string;
}

export function getAllInfluencers(): Influencer[] {
  return mockInfluencers;
}

export function getTopInfluencers(limit?: number): Influencer[] {
  const topInfluencers = mockInfluencers.filter((influencer) => influencer.isTop);

  return typeof limit === "number" ? topInfluencers.slice(0, limit) : topInfluencers;
}

export function findInfluencerByHandle(handle: string): Influencer | undefined {
  return mockInfluencers.find((influencer) => influencer.handle === handle);
}

export function filterInfluencers(filters: InfluencerFilters): Influencer[] {
  const {
    category = "all",
    platform = "all",
    isTop = false,
    search = "",
  } = filters;

  const normalizedSearch = search.trim().toLowerCase();

  return mockInfluencers.filter((influencer) => {
    const matchesPlatform = platform === "all" || influencer.platform === platform;
    const matchesCategory = category === "all" || influencer.category === category;
    const matchesTop = isTop ? influencer.isTop : true;
    const matchesSearch = !normalizedSearch
      || influencer.name.toLowerCase().includes(normalizedSearch)
      || influencer.handle.toLowerCase().includes(normalizedSearch);

    return matchesPlatform && matchesCategory && matchesTop && matchesSearch;
  });
}
