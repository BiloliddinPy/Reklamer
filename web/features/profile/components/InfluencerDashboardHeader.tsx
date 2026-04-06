"use client";

import { CalendarDays, CheckCircle2, Eye, Link as LinkIcon, MapPin, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Influencer } from "@/domain/influencer/types";

interface InfluencerDashboardHeaderProps {
  influencer: Influencer;
}

export function InfluencerDashboardHeader({ influencer }: InfluencerDashboardHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 sm:items-end -mt-16 sm:-mt-24 mb-10">
      <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-background overflow-hidden relative shadow-xl shrink-0 ring-2 ring-primary/20">
        <Image src={influencer.imageUrl} alt={influencer.name} fill className="object-cover" sizes="160px" />
      </div>

      <div className="flex-1 pb-2 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-heading font-black tracking-tight flex items-center gap-3">
            {influencer.name}
            <CheckCircle2 className="w-6 h-6 text-blue-500" />
            <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider align-middle mt-1">
              Top Bloger
            </span>
          </h1>
          <div className="text-lg font-medium text-muted-foreground mb-3">@{influencer.handle}</div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm font-medium text-muted-foreground">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/50 border border-border/40"><MapPin className="w-4 h-4" /> Toshkent, UZ</span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/50 border border-border/40"><CalendarDays className="w-4 h-4" /> 2022-yildan beri</span>
            <a href="#" className="flex items-center gap-1.5 text-primary hover:underline px-3 py-1.5 rounded-full bg-primary/5 border border-primary/20"><LinkIcon className="w-4 h-4" /> bio.site/{influencer.handle}</a>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link href="/settings" className="px-5 py-2.5 rounded-full bg-muted font-bold text-sm text-foreground hover:bg-border transition-colors flex items-center gap-2 shadow-sm border border-border/60">
            <Settings className="w-4 h-4" /> Profilni tahrirlash
          </Link>
          <Link href={`/influencer/${influencer.handle}`} className="px-5 py-2.5 rounded-full border border-border/60 font-bold text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors flex items-center gap-2 shadow-sm">
            <Eye className="w-4 h-4" /> Jamoatchi ko&apos;rinish
          </Link>
        </div>
      </div>
    </div>
  );
}
