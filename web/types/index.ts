export type { Platform, Influencer } from "@/domain/influencer/types";
export type { FilterPlatform } from "@/domain/catalog/types";

export type Role = "brand" | "influencer" | "admin";

export interface User {
  id: string;
  email: string;
  role: Role;
  name: string;
  createdAt: string;
  avatar?: string;
}

export interface InfluencerProfile {
  id: string;
  userId: string;
  handle: string;
  platform: import("@/domain/influencer/types").Platform;
  categoryId: string;
  rating: number;
  price: number;
  isVerified: boolean;
  isTop: boolean;
  followersCount: number;
  engagementRate: number;
}

export interface BrandProfile {
  id: string;
  userId: string;
  companyName: string;
  balance: number;
}

export interface Campaign {
  id: string;
  brandId: string;
  influencerId: string;
  status: "pending" | "active" | "completed" | "cancelled";
  price: number;
  createdAt: string;
}
