import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind CSS classes safely */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format large follower counts for display.
 * @example formatFollowers(4_800_000) → "4.8M"
 * @example formatFollowers(950_000)   → "950K"
 * @example formatFollowers(500)       → "500"
 */
export function formatFollowers(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${Math.round(n / 1_000)}K`;
  return String(n);
}

/**
 * Format a USD price for display.
 * @example formatPrice(2500)  → "$2,500"
 * @example formatPrice(350)   → "$350"
 */
export function formatPrice(n: number): string {
  return `$${n.toLocaleString("en-US")}`;
}
