"use client";

import { CheckCircle2, Settings, BarChart3, Clock, Users, Building2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function BrandDashboard() {
  return (
    <>
       {/* Distinct Corporate Header (No full height cover to distinguish it) */}
       <div className="w-full bg-zinc-50 dark:bg-zinc-950/40 relative overflow-hidden border-b border-border/40 pt-16 pb-12">
          <div className="max-w-screen-xl mx-auto px-4 lg:px-6 relative z-10">
             
             <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-6 w-full">
                   <div className="w-24 h-24 rounded-2xl bg-white border border-border shadow-md flex items-center justify-center relative overflow-hidden shrink-0">
                      <Image 
                         src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=500&auto=format&fit=crop" 
                         alt="Company Logo" 
                         fill 
                         sizes="96px"
                         className="object-cover p-2"
                      />
                   </div>
                   <div className="flex-1">
                      <h1 className="text-3xl font-heading font-black tracking-tight flex items-center gap-3">
                         TechStore MCHJ
                         <CheckCircle2 className="w-5 h-5 text-blue-500" />
                      </h1>
                      <div className="text-sm font-medium text-muted-foreground flex items-center gap-2 mt-1">
                         <span>Mijoz ID: #BR-84920</span> • 
                         <span>Toshkent, UZ</span>
                      </div>
                   </div>
                </div>

                <div className="flex items-center gap-3 md:w-auto w-full shrink-0">
                   <Link href="/catalog" className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-bold text-sm hover:scale-105 transition-all w-full text-center sm:w-auto shadow-md shadow-primary/20">
                     Yangi reklama izlash
                   </Link>
                   <Link href="/settings" className="w-10 h-10 rounded-full border border-border/60 bg-card hover:bg-muted font-bold flex items-center justify-center transition-colors shrink-0 outline-none">
                     <Settings className="w-4 h-4 text-foreground" />
                   </Link>
                </div>
             </div>

          </div>
       </div>

       <div className="max-w-screen-xl mx-auto px-4 lg:px-6 w-full pb-16 pt-8">
          
          {/* Analytics Overview for Brand */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
             <div className="p-5 rounded-2xl border border-border/60 bg-card flex flex-col gap-1">
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1 flex items-center gap-2">
                   <BarChart3 className="w-4 h-4 text-emerald-500" /> Jami Sarflangan
                </div>
                <div className="text-2xl font-black text-foreground">$12,850</div>
                <div className="text-[11px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md w-fit mt-2">
                   +14% o&apos;sish oxirgi oyda
                </div>
             </div>
             
             <div className="p-5 rounded-2xl border border-border/60 bg-card flex flex-col gap-1">
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1 flex items-center gap-2">
                   <Clock className="w-4 h-4 text-blue-500" /> Faol Kampaniyalar
                </div>
                <div className="text-2xl font-black text-foreground">3 ta</div>
                <div className="text-[11px] font-bold text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-md w-fit mt-2">
                   Jarayondagi loyihalar
                </div>
             </div>

             <div className="p-5 rounded-2xl border border-border/60 bg-card flex flex-col gap-1">
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1 flex items-center gap-2">
                   <Users className="w-4 h-4 text-primary" /> Hamkor Blogerlar
                </div>
                <div className="text-2xl font-black text-foreground">14 kishi</div>
                <div className="text-[11px] font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded-md w-fit mt-2">
                   Siz ishonganlar
                </div>
             </div>

             <div className="p-5 rounded-2xl border border-border/60 bg-card flex flex-col gap-1 bg-gradient-to-br from-zinc-900 to-black text-white border-none">
                <div className="text-xs font-bold text-white/50 uppercase tracking-widest mb-1 flex items-center gap-2">
                   <Building2 className="w-4 h-4" /> Balans
                </div>
                <div className="text-2xl font-black">$4,500</div>
                <button className="text-[11px] font-bold text-black bg-white/90 hover:bg-white px-3 py-1.5 rounded-md w-full mt-auto transition-colors align-center text-center">
                   Hisobni to&apos;ldirish
                </button>
             </div>
          </div>

          <div className="flex items-center justify-between mb-6">
             <h2 className="text-xl font-black tracking-tight text-foreground">Mening kampaniyalarim</h2>
             <span className="text-sm font-bold text-primary cursor-pointer hover:underline">Barchasi</span>
          </div>

          <div className="w-full border border-border/60 rounded-2xl overflow-hidden bg-card">
             {/* Empty State Mockup for Brand */}
             <div className="py-16 flex flex-col items-center justify-center text-center px-4">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center text-muted-foreground mb-4 ring-1 ring-border/50">
                   <Clock className="w-8 h-8 opacity-40" />
                </div>
                <h3 className="text-lg font-black tracking-tighter mb-2">Hali faol loyihalar yo&apos;q</h3>
                <p className="text-[14px] text-muted-foreground max-w-sm mb-6">Katalogdan mos keladigan eng zo&apos;r influenserni toping va birinchi xaridingizni amalga oshiring.</p>
                <Link href="/catalog" className="px-6 py-2.5 rounded-full bg-foreground text-background font-bold text-sm transition-transform active:scale-95">
                   Katalogga o&apos;tish
                </Link>
             </div>
          </div>

       </div>
    </>
  );
}
