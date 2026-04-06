"use client";

import { MapPin, ExternalLink, CheckCircle2, MessageSquare, Star, Users, TrendingUp } from "lucide-react";
import Image from "next/image";
import type { Influencer } from "@/domain/influencer/types";
import { platformColors, platformLabels } from "@/features/profile/lib/platform";
import { formatCompactNumber } from "@/features/profile/lib/format";
import { cn } from "@/lib/utils";

// Platform-specific CTA labels
const socialCTALabel: Record<string, string> = {
  instagram: "Instagram'da ko'rish",
  telegram: "Telegram'ga o'tish",
  youtube: "YouTube'da ko'rish",
  tiktok: "TikTok'da ko'rish",
};

interface ProfileHeaderProps {
  influencer: Influencer;
}

export function ProfileHeader({ influencer }: ProfileHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-8 md:items-end -mt-20 md:-mt-28 mb-12">
      <div className="w-36 h-36 md:w-48 md:h-48 rounded-full border-4 border-background overflow-hidden relative shrink-0 bg-muted ring-2 ring-primary/20">
        <Image src={influencer.imageUrl} alt={influencer.name} fill className="object-cover" sizes="192px" />
      </div>

      <div className="flex-1 pb-2 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-5xl font-heading font-black tracking-tight flex items-center gap-3 mb-1 text-foreground">
            {influencer.name}
            {influencer.isTop && <CheckCircle2 className="w-6 h-6 md:w-8 md:h-8 text-blue-500" fill="white" />}
          </h1>
          <div className="flex items-center gap-2 text-muted-foreground mb-3">
            <span className="text-base font-semibold">@{influencer.handle}</span>
            {influencer.verified && (
              <CheckCircle2 className="w-4 h-4 text-blue-500 fill-current" aria-label="Tasdiqlangan hisob" />
            )}
          </div>

          {/* Bio */}
          {influencer.bio && (
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xl mb-4 font-medium">
              {influencer.bio}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4">
            <div className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-xs font-bold", platformColors[influencer.platform])}>
              {platformLabels[influencer.platform]}
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-xs font-bold text-yellow-600">
              <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" /> {influencer.rating} reyting
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted border border-border/40 text-xs font-bold text-foreground">
              <Users className="w-3.5 h-3.5 text-muted-foreground" /> {formatCompactNumber(influencer.followers)} obunachi
            </div>
            {influencer.engagementRate && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-600">
                <TrendingUp className="w-3.5 h-3.5" /> {influencer.engagementRate}% ER
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-muted-foreground">
            {influencer.location && (
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/50 border border-border/40">
                <MapPin className="w-4 h-4" /> {influencer.location}, UZ
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 flex-col sm:flex-row">
          {/* Real social media link */}
          {influencer.socialUrl && (
            <a
              href={influencer.socialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full border-2 border-border/60 bg-background text-foreground font-bold text-sm hover:border-primary/40 hover:text-primary transition-all active:scale-95 flex items-center gap-2 group"
            >
              <ExternalLink className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              {socialCTALabel[influencer.platform] ?? "Profilga o'tish"}
            </a>
          )}
          <button className="px-8 py-4 rounded-full bg-foreground text-background font-black text-[15px] hover:scale-105 transition-all active:scale-95 flex items-center gap-2">
            <MessageSquare className="w-5 h-5" /> Aloqaga chiqish
          </button>
        </div>
      </div>
    </div>
  );
}
