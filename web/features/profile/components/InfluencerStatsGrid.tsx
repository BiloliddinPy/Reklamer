"use client";

import { BarChart3, DollarSign, Package, Star, TrendingUp } from "lucide-react";
import type { Influencer } from "@/domain/influencer/types";
import { influencerDashboardStats } from "@/features/profile/model/influencer-dashboard.data";

interface InfluencerStatsGridProps {
  influencer: Influencer;
}

function StatIcon({ icon }: { icon: (typeof influencerDashboardStats)[number]["icon"] }) {
  if (icon === "bar-chart") return <BarChart3 className="w-5 h-5" />;
  if (icon === "package") return <Package className="w-5 h-5" />;
  if (icon === "trending") return <TrendingUp className="w-5 h-5" />;
  return <DollarSign className="w-5 h-5" />;
}

export function InfluencerStatsGrid({ influencer }: InfluencerStatsGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
      {influencerDashboardStats.map((stat) => {
        const isDark = stat.tone === "dark";
        const value = stat.icon === "trending"
          ? (
            <div className="text-2xl sm:text-3xl font-black flex items-center gap-1">
              {influencer.rating} <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            </div>
          )
          : <div className="text-2xl sm:text-3xl font-black">{stat.value}</div>;

        return (
          <div
            key={stat.title}
            className={isDark
              ? "p-5 sm:p-6 rounded-[24px] border-none bg-gradient-to-br from-zinc-900 to-black text-white flex flex-col gap-2 transition-shadow group"
              : "p-5 sm:p-6 rounded-[24px] border border-border/60 bg-card flex flex-col gap-2 transition-shadow group"}
          >
            <div className={isDark
              ? "w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center mb-1 group-hover:scale-110 transition-transform"
              : "w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-1 group-hover:scale-110 transition-transform"}
            >
              <StatIcon icon={stat.icon} />
            </div>
            <div className={isDark ? "text-xs font-bold text-white/50 uppercase tracking-widest" : "text-xs font-bold text-muted-foreground uppercase tracking-widest"}>
              {stat.title}
            </div>
            {value}
            {isDark ? (
              <button className="text-[11px] font-bold text-black bg-white/90 hover:bg-white px-3 py-1.5 rounded-full w-full mt-auto transition-colors text-center">
                {stat.meta}
              </button>
            ) : (
              <div className="text-[11px] font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded-full w-fit">
                {stat.meta}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
