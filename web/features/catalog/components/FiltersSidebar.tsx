"use client";

import { X, Check, Users, Percent, DollarSign, Filter, ShieldCheck, Gem } from "lucide-react";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface FiltersSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FiltersSidebar({ isOpen, onClose }: FiltersSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isTopFilter = searchParams?.get("isTop") === "true";

  const handleTopFilterToggle = () => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    if (isTopFilter) params.delete("isTop");
    else params.set("isTop", "true");
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <div 
        className={cn(
          "fixed top-0 right-0 h-full w-full sm:w-[400px] md:w-[450px] lg:w-[480px] bg-background shadow-2xl z-50 transition-transform duration-300 ease-in-out flex flex-col border-l border-border/50",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 sm:py-5 border-b border-border/40 shrink-0">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-primary" />
            <h2 className="text-xl sm:text-2xl font-heading font-black tracking-tight text-foreground">Kengaytirilgan Filtrlar</h2>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-all active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8 pb-32 hide-scrollbar">

          {/* Followers Range */}
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-[17px] flex items-center gap-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              Auditoriya hajmi
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <label className="flex items-center p-3 sm:p-4 rounded-xl border-2 border-muted hover:border-primary/50 cursor-pointer bg-muted/20 transition-all font-medium text-sm has-[:checked]:border-primary has-[:checked]:bg-primary/5 group">
                <input type="radio" name="followers" className="sr-only" />
                <div className="flex items-center justify-between w-full">
                  Nano (1K - 10K)
                  <div className="w-4 h-4 rounded-full border-2 border-muted-foreground group-has-[:checked]:border-primary flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary opacity-0 group-has-[:checked]:opacity-100 transition-opacity" />
                  </div>
                </div>
              </label>
              <label className="flex items-center p-3 sm:p-4 rounded-xl border-2 border-muted hover:border-primary/50 cursor-pointer bg-muted/20 transition-all font-medium text-sm has-[:checked]:border-primary has-[:checked]:bg-primary/5 group">
                <input type="radio" name="followers" className="sr-only" />
                <div className="flex items-center justify-between w-full">
                  Micro (10K - 50K)
                  <div className="w-4 h-4 rounded-full border-2 border-muted-foreground group-has-[:checked]:border-primary flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary opacity-0 group-has-[:checked]:opacity-100 transition-opacity" />
                  </div>
                </div>
              </label>
              <label className="flex items-center p-3 sm:p-4 rounded-xl border-2 border-muted hover:border-primary/50 cursor-pointer bg-muted/20 transition-all font-medium text-sm has-[:checked]:border-primary has-[:checked]:bg-primary/5 group">
                <input type="radio" name="followers" className="sr-only" />
                <div className="flex items-center justify-between w-full">
                  Makro (50K - 500K)
                  <div className="w-4 h-4 rounded-full border-2 border-muted-foreground group-has-[:checked]:border-primary flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary opacity-0 group-has-[:checked]:opacity-100 transition-opacity" />
                  </div>
                </div>
              </label>
              <label className="flex items-center p-3 sm:p-4 rounded-xl border-2 border-muted hover:border-primary/50 cursor-pointer bg-muted/20 transition-all font-medium text-sm has-[:checked]:border-primary has-[:checked]:bg-primary/5 group">
                <input type="radio" name="followers" className="sr-only" />
                <div className="flex items-center justify-between w-full">
                  Yulduzlar (500K+)
                  <div className="w-4 h-4 rounded-full border-2 border-muted-foreground group-has-[:checked]:border-primary flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary opacity-0 group-has-[:checked]:opacity-100 transition-opacity" />
                  </div>
                </div>
              </label>
            </div>
          </div>

          <div className="h-[1px] w-full bg-border/40" />

          {/* ER (Engagement Rate) Slider Standin */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-[17px] flex items-center gap-2">
                <Percent className="w-4 h-4 text-muted-foreground" />
                Engagement Rate (ER)
              </h3>
              <span className="font-bold text-primary">Min 5%</span>
            </div>
            <div className="pt-2 pb-4">
              <div className="relative w-full h-2 bg-muted rounded-full">
                 <div className="absolute top-0 left-0 h-full bg-primary rounded-full w-[40%]" />
                 <div className="absolute top-1/2 left-[40%] -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-primary rounded-full shadow-md cursor-grab active:cursor-grabbing" />
              </div>
              <div className="flex justify-between text-xs font-semibold text-muted-foreground mt-2">
                 <span>Tanishish (0%)</span>
                 <span>O&apos;rtacha (5%)</span>
                 <span>Yuqori (15%+)</span>
              </div>
            </div>
          </div>

          <div className="h-[1px] w-full bg-border/40" />

          {/* Budget Range Inputs */}
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-[17px] flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-muted-foreground" />
              Narx chegarasi (USD)
            </h3>
            <div className="flex items-center gap-4">
               <div className="flex-1 relative">
                 <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">$</span>
                 <input type="number" placeholder="0" className="w-full h-12 pl-8 pr-4 rounded-xl border border-border/80 bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-semibold" />
               </div>
               <span className="text-muted-foreground font-bold">-</span>
               <div className="flex-1 relative">
                 <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">$</span>
                 <input type="number" placeholder="5000" className="w-full h-12 pl-8 pr-4 rounded-xl border border-border/80 bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-semibold" />
               </div>
            </div>
          </div>

          <div className="h-[1px] w-full bg-border/40" />

          {/* Specific Attributes */}
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-[17px] flex items-center gap-2">
              <Gem className="w-4 h-4 text-muted-foreground" />
              Qo&apos;shimcha hususiyatlar
            </h3>
            
            <label className="flex items-start gap-4 p-4 rounded-xl border border-border/60 hover:border-primary/40 cursor-pointer bg-background transition-all group has-[:checked]:bg-primary/5 has-[:checked]:border-primary">
               <div className="relative mt-0.5">
                 <input type="checkbox" className="peer sr-only" />
                 <div className="w-5 h-5 rounded border-2 border-muted-foreground peer-checked:border-primary peer-checked:bg-primary flex items-center justify-center transition-all">
                    <Check className="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100" />
                 </div>
               </div>
               <div>
                 <span className="block font-bold text-foreground">Verified (Rasmiy ko&apos;k belgi)</span>
                 <span className="block text-sm text-muted-foreground mt-0.5">Faqatgina Instagram/Telegram tomonidan tasdiqlangan profillar.</span>
               </div>
            </label>

            <label className="flex items-start gap-4 p-4 rounded-xl border border-border/60 hover:border-primary/40 cursor-pointer bg-background transition-all group has-[:checked]:bg-primary/5 has-[:checked]:border-primary">
               <div className="relative mt-0.5">
                 <input 
                   type="checkbox" 
                   className="peer sr-only" 
                   checked={isTopFilter}
                   onChange={handleTopFilterToggle}
                 />
                 <div className="w-5 h-5 rounded border-2 border-muted-foreground peer-checked:border-primary peer-checked:bg-primary flex items-center justify-center transition-all">
                    <Check className="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100" />
                 </div>
               </div>
               <div>
                 <span className="block font-bold text-foreground flex items-center gap-1.5">Top Reklamerlar <ShieldCheck className="w-4 h-4 text-primary" /></span>
                 <span className="block text-sm text-muted-foreground mt-0.5">Bizning platformada sifati yozma tarzda kafolatlangan va bahosi eng ideal bo&apos;lganlar.</span>
               </div>
            </label>

          </div>

        </div>

        {/* Footer Fixed Action Buttons */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-background border-t border-border/50 flex gap-3 z-20">
           <button 
             onClick={onClose}
             className="flex-1 py-3.5 rounded-xl border-2 border-border/60 font-bold bg-background text-foreground hover:bg-muted transition-all active:scale-95"
           >
             Bekor qilish
           </button>
           <button 
             onClick={onClose}
             className="flex-[2] py-3.5 rounded-xl bg-foreground hover:bg-foreground/90 font-bold text-background transition-all shadow-lg active:scale-95"
           >
             62 ta natijani ko&apos;rsatish
           </button>
        </div>

      </div>
    </>
  );
}
