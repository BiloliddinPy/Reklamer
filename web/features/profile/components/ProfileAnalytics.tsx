"use client";

import { Activity, CheckCircle2, DollarSign, Percent } from "lucide-react";
import { cn } from "@/lib/utils";

const ageBreakdown = [
  { age: "13-17", pct: 15, color: "bg-primary/40" },
  { age: "18-24", pct: 60, color: "bg-primary", bold: true },
  { age: "25-34", pct: 20, color: "bg-primary/60" },
  { age: "35+", pct: 5, color: "bg-primary/20" },
];

const trustBadges = [
  "128 ta muvaffaqiyatli buyurtma",
  "Reklamer tomonidan tasdiqlangan",
  "Escrow to'lov kafolati",
];

export function ProfileAnalytics() {
  return (
    <div className="bg-card border border-border/60 rounded-[32px] p-6 sm:p-8 flex flex-col gap-6 shadow-sm">
      <h3 className="font-heading font-black text-xl tracking-tight text-foreground flex items-center gap-2">
        <Activity className="w-5 h-5 text-primary" /> Asosiy Metrikalar
      </h3>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-muted/30 border border-border/40 flex flex-col text-center items-center justify-center">
          <div className="text-muted-foreground font-bold text-xs uppercase tracking-widest mb-1 flex items-center gap-1"><Percent className="w-3.5 h-3.5" /> ER</div>
          <div className="text-2xl font-black text-foreground">8.2%</div>
          <div className="text-[10px] text-emerald-500 font-bold mt-1 bg-emerald-500/10 px-2 rounded-full py-0.5">Normadan yuqori</div>
        </div>
        <div className="p-4 rounded-2xl bg-muted/30 border border-border/40 flex flex-col text-center items-center justify-center">
          <div className="text-muted-foreground font-bold text-xs uppercase tracking-widest mb-1 flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" /> CPM</div>
          <div className="text-2xl font-black text-foreground">$3.5</div>
          <div className="text-[10px] text-blue-500 font-bold mt-1 bg-blue-500/10 px-2 rounded-full py-0.5">Sohasida arzon</div>
        </div>
      </div>

      <div className="h-[1px] w-full bg-border/40" />

      <div className="space-y-4">
        <h4 className="font-bold text-sm text-foreground/80 flex items-center justify-between">
          Auditoriya yoshi
          <span className="text-xs font-medium text-muted-foreground">O&apos;rtacha asosiy</span>
        </h4>
        <div className="space-y-2.5">
          {ageBreakdown.map((item) => (
            <div key={item.age} className="flex items-center gap-3">
              <span className={cn("text-xs font-bold w-12", item.bold ? "text-foreground" : "text-muted-foreground")}>{item.age}</span>
              <div className="flex-1 h-2.5 bg-muted rounded-full overflow-hidden">
                <div className={cn("h-full rounded-full", item.color)} style={{ width: `${item.pct}%` }} />
              </div>
              <span className={cn("text-xs font-bold w-8 text-right", item.bold ? "text-foreground" : "")}>{item.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3 pt-2">
        <h4 className="font-bold text-sm text-foreground/80">Jins ko&apos;rsatkichi</h4>
        <div className="flex h-4 w-full rounded-full overflow-hidden">
          <div className="bg-blue-500 h-full flex items-center justify-start pl-2 text-[10px] font-bold text-white leading-none" style={{ width: "55%" }}>Erkak</div>
          <div className="bg-pink-500 h-full flex items-center justify-end pr-2 text-[10px] font-bold text-white leading-none" style={{ width: "45%" }}>Ayol</div>
        </div>
      </div>

      <div className="pt-2 flex flex-col gap-2">
        {trustBadges.map((badge) => (
          <div key={badge} className="flex items-center gap-2 text-sm font-medium text-foreground/70">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            {badge}
          </div>
        ))}
      </div>
    </div>
  );
}
