"use client";

import Image from "next/image";
import { useState } from "react";
import { getAllInfluencers } from "@/domain/influencer/selectors";
import { InfluencerDashboardHeader } from "@/features/profile/components/InfluencerDashboardHeader";
import { InfluencerDashboardTabs } from "@/features/profile/components/InfluencerDashboardTabs";
import { InfluencerStatsGrid } from "@/features/profile/components/InfluencerStatsGrid";

export function InfluencerDashboard() {
  const user = getAllInfluencers()[0];
  const [activeTab, setActiveTab] = useState<"services" | "orders">("services");

  return (
    <>
       {/* Cover Image */}
       <div className="w-full h-48 md:h-72 bg-muted relative overflow-hidden">
          <Image 
             src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=80&w=2000&auto=format&fit=crop" 
             alt="Cover" 
             fill 
             className="object-cover opacity-70"
             sizes="100vw"
             priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
       </div>

       <div className="max-w-screen-xl mx-auto px-4 lg:px-6 w-full relative z-10">
          <InfluencerDashboardHeader influencer={user} />
          <InfluencerStatsGrid influencer={user} />
          <InfluencerDashboardTabs activeTab={activeTab} onTabChange={setActiveTab} />

          <div className="h-16" />
       </div>
    </>
  );
}
