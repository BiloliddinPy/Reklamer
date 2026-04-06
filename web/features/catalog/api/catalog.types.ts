import type { CategoryOption, PlatformOption } from "@/domain/catalog/types";
import type { Influencer } from "@/domain/influencer/types";

export interface InfluencerListItemDto {
  id: string;
  name: string;
  handle: string;
  platform: Influencer["platform"];
  category: string;
  followers: number;
  rating: number;
  price: number;
  image_url: string;
  is_top: boolean;
  location?: string;
  bio?: string;
  engagement_rate?: number;
}

export interface CatalogListDto {
  items: InfluencerListItemDto[];
  meta: {
    total: number;
    limit: number;
    offset: number;
  };
}

export interface CatalogCategoryDto {
  id: string;
  label: string;
  image: string;
}

export interface CatalogPlatformDto {
  id: PlatformOption["id"];
  label: string;
}

export interface CatalogCollectionDto<T> {
  items: T[];
}

export interface CatalogData {
  influencers: Influencer[];
  categories: CategoryOption[];
  platforms: PlatformOption[];
}
