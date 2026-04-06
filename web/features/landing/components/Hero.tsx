"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search, Star, TrendingUp, Users, Award, type LucideIcon } from "lucide-react";
import { useTopInfluencers } from "@/features/landing/model/useTopInfluencers";
import { cn } from "@/lib/utils";

interface AnimatedStatCardProps {
  icon: LucideIcon;
  iconClassName: string;
  label: string;
  target: number;
  suffix?: string;
  duration?: number;
}

function AnimatedStatCard({
  icon: Icon,
  iconClassName,
  label,
  target,
  suffix = "",
  duration = 2000,
}: AnimatedStatCardProps) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!started) {
      return;
    }

    let startTime: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [started, target, duration]);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center gap-1 p-4 rounded-2xl bg-muted/30 border border-border/40 backdrop-blur-sm hover:bg-muted/50 transition-all hover:-translate-y-1 duration-300"
    >
      <div className="flex items-center gap-1.5">
        <Icon className={cn("w-4 h-4", iconClassName)} />
        <span className="text-2xl md:text-3xl font-black text-foreground tracking-tight">
          {count}
          {suffix}
        </span>
      </div>
      <span className="text-[11px] md:text-xs font-bold text-muted-foreground uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}

export function Hero() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/catalog?q=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      router.push("/catalog");
    }
  };

  // Top 5 influencers for floating avatars
  const topFaces = useTopInfluencers(5);

  const avatarPositions = [
    "top-[8%] left-[12%] w-16 h-16 md:w-20 md:h-20",
    "top-[30%] right-[8%] w-14 h-14 md:w-16 md:h-16",
    "bottom-[28%] left-[6%] w-12 h-12 md:w-14 md:h-14",
    "bottom-[12%] right-[18%] w-16 h-16 md:w-20 md:h-20",
    "top-[3%] right-[22%] w-10 h-10 md:w-12 md:h-12",
  ];

  return (
    <section className="relative w-full pt-24 pb-12 md:pt-36 md:pb-20 overflow-hidden border-b border-border/40">
      
      {/* Background animated gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/10 blur-[120px] rounded-full pointer-events-none animate-pulse-glow" />
      <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-blue-400/5 blur-[100px] rounded-full pointer-events-none animate-pulse-glow" style={{ animationDelay: "2s" }} />
      
      {/* Floating Avatars */}
      <div className="absolute inset-0 pointer-events-none hidden sm:block max-w-[1400px] mx-auto">
         {topFaces.map((inf, i) => (
           <div 
              key={inf.id} 
              className={cn(
                "absolute rounded-full border-4 border-background overflow-hidden z-0 animate-float",
                avatarPositions[i] || ""
              )}
              style={{ animationDelay: `${i * 0.8}s`, animationDuration: `${5 + i}s` }}
           >
              <Image 
                src={inf.imageUrl} 
                alt={inf.name} 
                fill 
                className="object-cover"
                sizes="80px"
              />
           </div>
         ))}
      </div>

      <div className="max-w-screen-md mx-auto px-4 lg:px-6 relative z-10 text-center flex flex-col items-center">
        
        <div className="inline-flex items-center gap-2 rounded-full border-2 border-border/80 bg-background/80 backdrop-blur-md px-4 py-1.5 text-sm font-bold text-foreground mb-8 animate-slide-up">
           <Star className="w-4 h-4 text-primary fill-primary" />
           O&apos;zbekistondagi 1-raqamli infulenser bozori
        </div>
        
        <h1 className="text-[44px] sm:text-[56px] md:text-[76px] lg:text-[84px] leading-[1.05] md:leading-[1] font-heading font-black tracking-tighter text-foreground mb-6 md:mb-8 animate-slide-up stagger-1">
          Kafolatlangan ta&apos;sir. <br/> <span className="text-muted-foreground">Tezkor daromad.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground font-medium text-balance mb-12 max-w-xl animate-slide-up stagger-2">
          Eng mashhur va ishonchli blogerlarni izlab toping. Ularning real analitikasi (ER, CPM) ga ro&apos;baro&apos; qarab, biznesingiz uchun aniq reklama xarid qiling.
        </p>

        {/* Search Bar */}
        <form 
          onSubmit={handleSearch} 
          className="w-full max-w-xl relative flex flex-col sm:flex-row items-center gap-3 sm:gap-2 animate-slide-up stagger-3"
        >
          <div className={cn(
            "relative w-full group transition-all duration-500",
            isFocused && "transform scale-[1.02]"
          )}>
             <Search className={cn(
               "absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors duration-300",
               isFocused ? "text-primary" : "text-muted-foreground"
             )} />
             <input 
               type="text" 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               onFocus={() => setIsFocused(true)}
               onBlur={() => setIsFocused(false)}
               placeholder="Bloger nomi, soha yoki platformani yozing..." 
               className={cn(
                 "w-full h-14 md:h-16 pl-14 pr-6 rounded-full border-2 bg-background/90 backdrop-blur-md text-foreground font-semibold placeholder:text-muted-foreground/60 focus:outline-none transition-all text-base md:text-lg",
                 isFocused
                   ? "border-primary ring-4 ring-primary/20"
                   : "border-border/80"
               )}
             />
          </div>
          
          <button 
             type="submit"
             className="w-full sm:w-auto px-8 h-14 md:h-16 rounded-full bg-primary text-primary-foreground font-black text-lg md:text-xl hover:scale-105 transition-all active:scale-95 shrink-0"
          >
             Saytdan izlash
          </button>
        </form>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm font-bold text-muted-foreground animate-slide-up stagger-4">
           <span>Ommabop qidiruvlar:</span>
           <button type="button" onClick={() => router.push('/catalog?category=humor')} className="px-3 py-1.5 rounded-full bg-muted hover:bg-border hover:text-foreground transition-all hover:-translate-y-0.5 text-foreground">Kulgu/Yumor</button>
           <button type="button" onClick={() => router.push('/catalog?category=business')} className="px-3 py-1.5 rounded-full bg-muted hover:bg-border hover:text-foreground transition-all hover:-translate-y-0.5 text-foreground">Biznes</button>
           <button type="button" onClick={() => router.push('/catalog?category=finance')} className="px-3 py-1.5 rounded-full bg-muted hover:bg-border hover:text-foreground transition-all hover:-translate-y-0.5 text-foreground">Moliya</button>
        </div>

        {/* Animated Stats Counter */}
        <div className="mt-16 w-full max-w-lg mx-auto animate-slide-up stagger-5">
          <div className="grid grid-cols-3 gap-4">
            <AnimatedStatCard icon={Users} iconClassName="text-primary" label="Blogerlar" target={30} suffix="+" duration={1800} />
            <AnimatedStatCard icon={TrendingUp} iconClassName="text-emerald-500" label="Platformalar" target={4} suffix="+" duration={1500} />
            <AnimatedStatCard icon={Award} iconClassName="text-amber-500" label="Ishonch" target={98} suffix="%" duration={2000} />
          </div>
        </div>
        
      </div>
    </section>
  );
}
