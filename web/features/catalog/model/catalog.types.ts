import type { FilterPlatform } from "@/domain/catalog/types";

export interface CatalogFilters {
  category: string;
  platform: FilterPlatform;
  search: string;
  isTopFilter: boolean;
}
