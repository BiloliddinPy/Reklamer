"use client";

import type { CatalogFilters } from "@/features/catalog/model/catalog.types";

export function useCatalogTransitionKey(filters: CatalogFilters): string {
  return JSON.stringify(filters);
}
