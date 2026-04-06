export type Platform = "instagram" | "telegram" | "youtube" | "tiktok";

export interface Influencer {
  id: string;
  name: string;
  handle: string;      // @username (platformdagi haqiqiy handle)
  platform: Platform;
  category: string;
  followers: number;
  rating: number;
  price: number;       // USD, bir post/video uchun boshlang'ich narx
  isTop?: boolean;
  imageUrl: string;

  // === YANGI MAYDONLAR ===
  socialUrl: string;   // Haqiqiy ijtimoiy tarmoq havolasi (instagram.com/..., t.me/..., youtube.com/@...)
  bio?: string;        // Qisqa tavsif (o'zbek tilida)
  location?: string;   // Shahar (masalan: "Toshkent")
  verified?: boolean;  // Platforma tomonidan tasdiqlangan hisob
  engagementRate?: number; // ER % (masalan: 3.2)
}
