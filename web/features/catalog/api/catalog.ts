import { categories as fallbackCategories, platforms as fallbackPlatforms } from "@/domain/catalog/mock";
import type { FilterPlatform, CategoryOption, PlatformOption } from "@/domain/catalog/types";
import { filterInfluencers, getTopInfluencers } from "@/domain/influencer/selectors";
import type { Influencer } from "@/domain/influencer/types";
import { api } from "@/services/api";
import type {
  CatalogCategoryDto,
  CatalogCollectionDto,
  CatalogData,
  CatalogListDto,
  CatalogPlatformDto,
  InfluencerListItemDto,
} from "./catalog.types";

function getSocialUrl(platform: string, handle: string): string {
  const cleanHandle = handle.replace("@", "");
  switch (platform) {
    case "instagram": return `https://instagram.com/${cleanHandle}`;
    case "telegram": return `https://t.me/${cleanHandle}`;
    case "youtube": return `https://youtube.com/@${cleanHandle}`;
    case "tiktok": return `https://tiktok.com/@${cleanHandle}`;
    default: return "#";
  }
}

function mapInfluencer(dto: InfluencerListItemDto): Influencer {
  return {
    id: dto.id,
    name: dto.name,
    handle: dto.handle,
    platform: dto.platform,
    category: dto.category,
    followers: dto.followers,
    rating: dto.rating,
    price: dto.price,
    imageUrl: dto.image_url,
    isTop: dto.is_top,
    socialUrl: getSocialUrl(dto.platform, dto.handle),
    bio: dto.bio,
    location: dto.location,
    engagementRate: dto.engagement_rate,
  };
}

function mapCategory(dto: CatalogCategoryDto): CategoryOption {
  return {
    id: dto.id,
    label: dto.label,
    image: dto.image,
  };
}

function mapPlatformBackground(id: PlatformOption["id"]): string {
  return fallbackPlatforms.find((platform) => platform.id === id)?.bg ?? "bg-gradient-to-tr from-zinc-500 to-zinc-800";
}

function mapPlatform(dto: CatalogPlatformDto): PlatformOption {
  return {
    id: dto.id,
    label: dto.label,
    bg: mapPlatformBackground(dto.id),
  };
}

export interface FetchCatalogFilters {
  category?: string;
  platform?: FilterPlatform;
  isTop?: boolean;
  search?: string;
}

export async function fetchCatalogData(filters: FetchCatalogFilters): Promise<CatalogData> {
  const params = {
    category: filters.category && filters.category !== "all" ? filters.category : undefined,
    platform: filters.platform && filters.platform !== "all" ? filters.platform : undefined,
    only_top: filters.isTop || undefined,
    query: filters.search?.trim() || undefined,
  };

  try {
    const [influencersResponse, categoriesResponse, platformsResponse] = await Promise.all([
      api.get<CatalogListDto>("/catalog/influencers", { params }),
      api.get<CatalogCollectionDto<CatalogCategoryDto>>("/catalog/categories"),
      api.get<CatalogCollectionDto<CatalogPlatformDto>>("/catalog/platforms"),
    ]);

    return {
      influencers: influencersResponse.data.items.map(mapInfluencer),
      categories: categoriesResponse.data.items.map(mapCategory),
      platforms: platformsResponse.data.items.map(mapPlatform),
    };
  } catch {
    return {
      influencers: filterInfluencers(filters),
      categories: fallbackCategories,
      platforms: fallbackPlatforms,
    };
  }
}

export async function fetchTopInfluencers(limit: number): Promise<Influencer[]> {
  try {
    const response = await api.get<CatalogListDto>("/catalog/influencers", {
      params: {
        only_top: true,
        limit,
      },
    });

    return response.data.items.map(mapInfluencer).slice(0, limit);
  } catch {
    return getTopInfluencers(limit);
  }
}
