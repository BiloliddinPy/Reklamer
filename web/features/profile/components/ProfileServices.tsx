"use client";

import { BarChart3, Clock, DollarSign, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Influencer } from "@/domain/influencer/types";
import { formatCompactNumber } from "@/features/profile/lib/format";
import { platformColors, platformLabels } from "@/features/profile/lib/platform";
import { cn } from "@/lib/utils";

interface ServiceItem {
  title: string;
  type: string;
  description: string;
  price: number;
  delivery: string;
}

interface ProfileServicesProps {
  influencer: Influencer;
  services: ServiceItem[];
  similarInfluencers: Influencer[];
  onBook: (service: ServiceItem) => void;
}

export function ProfileServices({
  influencer,
  services,
  similarInfluencers,
  onBook,
}: ProfileServicesProps) {
  return (
    <div className="lg:col-span-2 space-y-6">
      <h2 className="text-2xl font-heading font-black tracking-tight text-foreground flex items-center gap-2 mb-4">
        <DollarSign className="w-6 h-6 text-emerald-500" /> Barcha xizmatlar oynasi
      </h2>

      <div className="flex flex-col gap-4">
        {services.map((service, idx) => (
          <div key={idx} className="p-6 md:p-8 rounded-[32px] border border-border/50 bg-card hover:border-primary/30 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6 group">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className={cn("w-6 h-6 rounded-full flex items-center justify-center", platformColors[influencer.platform])}>
                  <span className="text-white text-[8px] font-black">{platformLabels[influencer.platform]?.slice(0, 2).toUpperCase()}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-muted text-xs font-bold text-muted-foreground uppercase tracking-widest">{service.type}</div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">{service.title}</h3>
              <p className="text-muted-foreground text-[15px] font-medium max-w-lg mb-4 leading-relaxed">
                {service.description}
              </p>
              <div className="flex items-center gap-4 text-sm font-bold text-foreground">
                <span className="flex items-center gap-1.5 bg-muted/50 px-3 py-1.5 rounded-lg"><Clock className="w-4 h-4 text-muted-foreground" /> {service.delivery}</span>
                <span className="flex items-center gap-1.5 bg-muted/50 px-3 py-1.5 rounded-lg"><BarChart3 className="w-4 h-4 text-muted-foreground" /> {formatCompactNumber(influencer.followers)} reach</span>
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end md:shrink-0 border-t md:border-t-0 md:border-l border-border/40 pt-6 md:pt-0 md:pl-8">
              <div className="text-sm font-bold text-muted-foreground mb-1 uppercase tracking-widest">Narxi</div>
              <div className="text-3xl md:text-4xl font-black text-foreground mb-4">${service.price.toLocaleString()}</div>
              <button
                onClick={() => onBook(service)}
                className="w-full md:w-auto px-8 py-4 rounded-full bg-primary text-white font-black text-[15px] hover:scale-105 transition-all active:scale-95"
              >
                Bron qilish
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-6 sm:p-8 rounded-[32px] border border-border/50 bg-card">
        <h3 className="font-heading font-black text-lg tracking-tight text-foreground mb-5">O&apos;xshash Influenserlar</h3>
        <div className="flex flex-col gap-3">
          {similarInfluencers.map((influencerItem) => (
            <Link
              key={influencerItem.id}
              href={`/influencer/${influencerItem.handle}`}
              className="flex items-center gap-4 p-3 rounded-2xl hover:bg-muted/50 transition-colors group"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden relative border-2 border-border shrink-0">
                <Image src={influencerItem.imageUrl} alt={influencerItem.name} fill className="object-cover" sizes="48px" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-foreground group-hover:text-primary transition-colors truncate">{influencerItem.name}</div>
                <div className="text-sm text-muted-foreground font-medium flex items-center gap-2">
                  <span>{formatCompactNumber(influencerItem.followers)} obunachi</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />{influencerItem.rating}</span>
                </div>
              </div>
              <div className="font-black text-foreground text-sm shrink-0">${influencerItem.price.toLocaleString()}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
