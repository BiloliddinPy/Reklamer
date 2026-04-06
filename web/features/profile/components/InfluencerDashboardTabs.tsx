"use client";

import { CheckCircle2, Clock, Plus, Users } from "lucide-react";
import Image from "next/image";
import { influencerDashboardOrders, influencerDashboardServices } from "@/features/profile/model/influencer-dashboard.data";
import { platformColors } from "@/features/profile/lib/platform";
import { cn } from "@/lib/utils";

interface InfluencerDashboardTabsProps {
  activeTab: "services" | "orders";
  onTabChange: (tab: "services" | "orders") => void;
}

export function InfluencerDashboardTabs({
  activeTab,
  onTabChange,
}: InfluencerDashboardTabsProps) {
  return (
    <div className="w-full">
      <div className="flex gap-1 bg-muted/50 p-1.5 rounded-2xl border border-border/50 w-fit mb-8">
        <button
          onClick={() => onTabChange("services")}
          className={cn(
            "px-5 py-2.5 rounded-full text-[14px] font-bold transition-all",
            activeTab === "services" ? "bg-background text-foreground ring-1 ring-border/50" : "text-muted-foreground hover:text-foreground"
          )}
        >
          Xizmatlarim ({influencerDashboardServices.length})
        </button>
        <button
          onClick={() => onTabChange("orders")}
          className={cn(
            "px-5 py-2.5 rounded-full text-[14px] font-bold transition-all flex items-center gap-2",
            activeTab === "orders" ? "bg-background text-foreground ring-1 ring-border/50" : "text-muted-foreground hover:text-foreground"
          )}
        >
          Buyurtmalar
          <span className="w-5 h-5 rounded-full bg-primary text-white text-[10px] flex items-center justify-center font-black">1</span>
        </button>
      </div>

      {activeTab === "services" && (
        <div className="flex flex-col gap-4 animate-in fade-in duration-300">
          {influencerDashboardServices.map((service) => (
            <div key={service.id} className="p-6 md:p-8 rounded-[28px] border border-border/50 bg-card hover:border-primary/30 transition-all group">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <div className={cn("w-7 h-7 rounded-full flex items-center justify-center", platformColors[service.platform])}>
                      <span className="text-white text-[9px] font-black uppercase">{service.platform.slice(0, 2)}</span>
                    </div>
                    <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-muted text-xs font-bold text-muted-foreground uppercase tracking-widest">{service.type}</div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-muted-foreground text-[15px] font-medium max-w-lg mb-4 leading-relaxed">{service.description}</p>

                  <div className="flex items-center gap-4 text-sm font-bold text-foreground/70">
                    <span className="flex items-center gap-1.5 bg-muted/60 px-3 py-1.5 rounded-lg">
                      <Clock className="w-4 h-4 text-muted-foreground" /> {service.deliveryDays} kunda tayyor
                    </span>
                    <span className="flex items-center gap-1.5 bg-muted/60 px-3 py-1.5 rounded-lg">
                      <Users className="w-4 h-4 text-muted-foreground" /> {service.views} ko&apos;rish
                    </span>
                    <span className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-600 px-3 py-1.5 rounded-lg">
                      <CheckCircle2 className="w-4 h-4" /> {service.orders} ta buyurtma
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-start md:items-end md:shrink-0 border-t md:border-t-0 md:border-l border-border/40 pt-5 md:pt-0 md:pl-8 gap-4">
                  <div>
                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Narxi</div>
                    <div className="text-3xl md:text-4xl font-black text-foreground">${service.price.toLocaleString()}</div>
                  </div>
                  <div className="flex items-center gap-2 w-full md:w-auto">
                    <button className="flex-1 md:flex-none px-5 py-2.5 rounded-xl bg-muted hover:bg-border font-bold text-sm transition-all text-foreground">
                      Tahrirlash
                    </button>
                    <button className="flex-1 md:flex-none px-5 py-2.5 rounded-full bg-foreground text-background hover:bg-foreground/90 font-bold text-sm transition-all active:scale-95">
                      Ko&apos;rinish
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button className="w-full p-6 rounded-[28px] border-2 border-dashed border-border/60 hover:border-primary/40 hover:bg-primary/5 transition-all flex items-center justify-center gap-3 text-muted-foreground hover:text-primary font-bold text-[15px] group">
            <div className="w-10 h-10 rounded-full bg-muted group-hover:bg-primary/10 flex items-center justify-center transition-colors">
              <Plus className="w-5 h-5" />
            </div>
            Yangi xizmat qo&apos;shish
          </button>
        </div>
      )}

      {activeTab === "orders" && (
        <div className="flex flex-col gap-3 animate-in fade-in duration-300">
          {influencerDashboardOrders.map((order) => (
            <div key={order.id} className="p-5 md:p-6 rounded-[24px] border border-border/50 bg-card hover:border-border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl border border-border/60 overflow-hidden relative bg-muted shrink-0">
                  <Image src={order.brandLogo} alt={order.brand} fill className="object-cover" sizes="48px" />
                </div>
                <div>
                  <div className="font-bold text-foreground text-base">{order.brand}</div>
                  <div className="text-sm text-muted-foreground font-medium">{order.service}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{order.date} • {order.id}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 sm:gap-6">
                <div className="text-xl font-black text-foreground">${order.amount.toLocaleString()}</div>
                {order.status === "pending" ? (
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-600 text-xs font-bold border border-amber-500/20">
                    <Clock className="w-3.5 h-3.5" /> Kutilmoqda
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-bold border border-emerald-500/20">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Bajarildi
                  </span>
                )}
                {order.status === "pending" && (
                  <button className="px-4 py-2 rounded-full bg-primary text-white font-bold text-sm hover:scale-105 transition-all active:scale-95">
                    Qabul qilish
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
