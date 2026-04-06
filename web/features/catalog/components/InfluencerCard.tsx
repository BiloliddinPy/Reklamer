import Image from "next/image";
import Link from "next/link";
import { Star, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface InfluencerCardProps {
  id: string;
  name: string;
  handle: string;
  platform: "instagram" | "telegram" | "youtube" | "tiktok";
  followers: number;
  rating: number;
  price: number;
  imageUrl: string;
  isTop?: boolean;
  isLocked?: boolean;
  bio?: string;
  engagementRate?: number;
}

const platformColors: Record<string, string> = {
  instagram: "bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]",
  telegram: "bg-gradient-to-tr from-[#00A2F1] to-[#0088CC]",
  youtube: "bg-gradient-to-tr from-[#FF0000] to-[#E62117]",
  tiktok: "bg-gradient-to-tr from-[#000000] via-[#25F4EE] to-[#FE2C55]",
};

const platformIcons: Record<string, React.ReactNode> = {
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-[14px] h-[14px] text-white"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
  ),
  telegram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-[14px] h-[14px] text-white"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-[14px] h-[14px] text-white"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-[14px] h-[14px] text-white"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
  ),
};

export function InfluencerCard({
  name,
  handle,
  platform,
  followers,
  rating,
  price,
  imageUrl,
  isTop = false,
  isLocked = false,
  bio,
  engagementRate,
}: InfluencerCardProps) {
  const fmt = (n: number) => n >= 1000000 ? `${(n/1000000).toFixed(1)}M` : n >= 1000 ? `${(n/1000).toFixed(0)}K` : `${n}`;

  return (
    <Link href={`/influencer/${handle}`} className="group block outline-none">
      <div className="relative aspect-[3/4] sm:aspect-[4/5] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-muted transition-all duration-500 group-hover:-translate-y-2 active:scale-[0.97] border border-border/40 group-hover:border-primary/20">
        
        {/* Image */}
        <div className="absolute inset-0 will-change-transform">
          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
            quality={80}
            loading="lazy"
            decoding="async"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </div>

        {/* Gradient overlay — stronger on hover */}
        <div className="absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none transition-opacity duration-500 opacity-85 group-hover:opacity-100" />
        
        {/* Top glow on hover */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-transparent transition-all duration-700 pointer-events-none" />
        
        {/* Top Badges Area */}
        <div className="absolute top-3 inset-x-3 z-20 flex justify-between items-start pointer-events-none">
          <div className="flex flex-col gap-1 items-start">
            {isTop ? (
              <div className="flex items-center gap-1 text-[10px] sm:text-xs font-bold bg-white text-black px-2.5 py-1 rounded-full capitalize tracking-tight pointer-events-auto transition-transform group-hover:scale-105">
                <Award className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary" />
                Top
              </div>
            ) : (
              <div className="flex items-center gap-1 text-[10px] sm:text-xs font-bold bg-black/50 backdrop-blur-md text-white px-2.5 py-1 rounded-full border border-white/20 pointer-events-auto">
                <Star className="h-2.5 w-2.5 sm:h-3 sm:w-3 fill-yellow-400 text-yellow-400" />
                <span>{rating.toFixed(1)}</span>
              </div>
            )}
            
            {engagementRate && (
              <div className="flex items-center gap-1 text-[9px] sm:text-[10px] font-bold bg-emerald-500/80 backdrop-blur-md text-white px-2 py-0.5 rounded-full border border-white/20 pointer-events-auto transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                ER: {engagementRate}%
              </div>
            )}
          </div>

          <div className={cn("w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border-2 border-white transition-all duration-300 group-hover:scale-110 pointer-events-auto shrink-0", platformColors[platform])}>
             {platformIcons[platform]}
          </div>
        </div>

        {/* Content Box */}
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 z-20 flex flex-col justify-end transition-transform duration-300 group-hover:translate-y-[-2px]">
          <h3 className="font-heading font-black text-base sm:text-lg md:text-xl leading-tight text-white truncate drop-shadow-md">
            {name}
          </h3>
          <p className="text-[11px] sm:text-xs font-medium text-white/80 truncate mb-[2px]">@{handle}</p>
          {bio && (
            <p className="text-[10px] leading-[13px] text-white/60 line-clamp-2 mt-0.5 mb-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-0 group-hover:h-auto overflow-hidden">
              {bio}
            </p>
          )}
          <p className="text-[10px] font-bold text-white/60 mb-1">{fmt(followers)} obunachilar</p>

          {isLocked ? (
             <div className="flex items-center gap-2 mt-1">
                <span className="text-white text-lg sm:text-xl md:text-2xl font-black tracking-tighter leading-none drop-shadow-md blur-[4px] select-none opacity-80 pointer-events-none">
                  $0,000
                </span>
                <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-full backdrop-blur-md text-white border border-white/30 flex items-center gap-1 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  Yopiq
                </span>
             </div>
          ) : (
             <span className="text-white text-lg sm:text-xl md:text-2xl font-black tracking-tighter leading-none drop-shadow-md">
               ${price.toLocaleString()}
             </span>
          )}

        </div>
      </div>
    </Link>
  );
}
