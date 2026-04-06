import type { Platform } from "@/types";

// ─── Platform Colors ───────────────────────────────────────────────────────────

/** Tailwind gradient classes per platform — use in className */
export const PLATFORM_COLORS: Record<Platform, string> = {
  instagram: "bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]",
  telegram:  "bg-gradient-to-tr from-[#00A2F1] to-[#0088CC]",
  youtube:   "bg-gradient-to-tr from-[#FF0000] to-[#E62117]",
  tiktok:    "bg-gradient-to-tr from-[#000000] via-[#25F4EE] to-[#FE2C55]",
};

/** Human-readable display names per platform */
export const PLATFORM_LABELS: Record<Platform, string> = {
  instagram: "Instagram",
  telegram:  "Telegram",
  youtube:   "YouTube",
  tiktok:    "TikTok",
};

/**
 * Platform list with "all" option — used in filter UIs.
 * Enumerate in display order.
 */
export const PLATFORM_FILTER_LIST = [
  { id: "all",       label: "Barchasi",  bg: "bg-gradient-to-tr from-zinc-500 to-zinc-800" },
  { id: "instagram", label: "Instagram", bg: PLATFORM_COLORS.instagram },
  { id: "telegram",  label: "Telegram",  bg: PLATFORM_COLORS.telegram },
  { id: "youtube",   label: "YouTube",   bg: PLATFORM_COLORS.youtube },
  { id: "tiktok",    label: "TikTok",    bg: PLATFORM_COLORS.tiktok },
] as const;

// ─── Categories ────────────────────────────────────────────────────────────────

export const CATEGORIES = [
  { id: "all",         label: "Hammasi",     image: "🌟" },
  { id: "finance",     label: "Moliya",      image: "💰" },
  { id: "psychology",  label: "Psixologiya", image: "🧠" },
  { id: "development", label: "Rivojlanish", image: "📈" },
  { id: "programming", label: "Dasturlash",  image: "💻" },
  { id: "lifestyle",   label: "Lifestyle",   image: "☕" },
  { id: "beauty",      label: "Go'zallik",   image: "✨" },
  { id: "humor",       label: "Yumor",       image: "😂" },
  { id: "business",    label: "Biznes",      image: "💼" },
  { id: "family",      label: "Oilaviy",     image: "👨‍👩‍👧‍👦" },
  { id: "medicine",    label: "Tibbiyot",    image: "🏥" },
  { id: "kids",        label: "Bolalar",     image: "👶" },
  { id: "nature",      label: "Tabiat",      image: "🌿" },
  { id: "travel",      label: "Sayohat",     image: "✈️" },
  { id: "education",   label: "Ta'lim",      image: "📚" },
  { id: "gaming",      label: "O'yinlar",    image: "🎮" },
  { id: "sport",       label: "Sport",       image: "⚽" },
] as const;
