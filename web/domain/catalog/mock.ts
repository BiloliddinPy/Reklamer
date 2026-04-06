import type { CategoryOption, PlatformOption } from "@/domain/catalog/types";

export const platforms: PlatformOption[] = [
  { id: "all", label: "Barchasi", bg: "bg-gradient-to-tr from-zinc-500 to-zinc-800" },
  { id: "instagram", label: "Instagram", bg: "bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]" },
  { id: "telegram", label: "Telegram", bg: "bg-gradient-to-tr from-[#00A2F1] to-[#0088CC]" },
  { id: "youtube", label: "YouTube", bg: "bg-gradient-to-tr from-[#FF0000] to-[#E62117]" },
  { id: "tiktok", label: "TikTok", bg: "bg-gradient-to-tr from-[#000000] via-[#25F4EE] to-[#FE2C55]" },
];

export const categories: CategoryOption[] = [
  { id: "all", label: "Hammasi", image: "🌟" },
  { id: "finance", label: "Moliya", image: "💰" },
  { id: "psychology", label: "Psixologiya", image: "🧠" },
  { id: "development", label: "Rivojlanish", image: "📈" },
  { id: "programming", label: "Dasturlash", image: "💻" },
  { id: "lifestyle", label: "Lifestyle", image: "☕" },
  { id: "beauty", label: "Go'zallik", image: "✨" },
  { id: "humor", label: "Yumor", image: "😂" },
  { id: "business", label: "Biznes", image: "💼" },
  { id: "family", label: "Oilaviy", image: "👨‍👩‍👧‍👦" },
  { id: "medicine", label: "Tibbiyot", image: "🏥" },
  { id: "kids", label: "Bolalar", image: "👶" },
  { id: "nature", label: "Tabiat", image: "🌿" },
  { id: "travel", label: "Sayohat", image: "✈️" },
  { id: "education", label: "Ta'lim", image: "📚" },
  { id: "gaming", label: "O'yinlar", image: "🎮" },
  { id: "sport", label: "Sport", image: "⚽" },
];
