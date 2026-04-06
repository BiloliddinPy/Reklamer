import type { ReadonlyURLSearchParams } from "next/navigation";
import type { FilterPlatform } from "@/domain/catalog/types";
import type { CatalogFilters } from "@/features/catalog/model/catalog.types";

export function readCatalogFilters(searchParams: ReadonlyURLSearchParams | null): CatalogFilters {
  return {
    category: searchParams?.get("category") || "all",
    platform: (searchParams?.get("platform") || "all") as FilterPlatform,
    isTopFilter: searchParams?.get("isTop") === "true",
    search: searchParams?.get("q") || "",
  };
}

export function updateCatalogParam(
  searchParams: ReadonlyURLSearchParams | null,
  key: string,
  value: string,
): string {
  const params = new URLSearchParams(searchParams?.toString() || "");

  if (value === "all" || value === "") params.delete(key);
  else params.set(key, value);

  return params.toString();
}
