import type { Platform } from "@/domain/influencer/types";

export type FilterPlatform = Platform | "all";

export interface PlatformOption {
  id: FilterPlatform;
  label: string;
  bg: string;
}

export interface CategoryOption {
  id: string;
  label: string;
  image: string;
}
