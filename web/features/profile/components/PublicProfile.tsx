"use client";

import { AlertCircle, ChevronRight, Shield, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { findInfluencerByHandle, getAllInfluencers } from "@/domain/influencer/selectors";
import type { Influencer } from "@/domain/influencer/types";
import { ProfileAnalytics } from "@/features/profile/components/ProfileAnalytics";
import { ProfileHeader } from "@/features/profile/components/ProfileHeader";
import { ProfileServices } from "@/features/profile/components/ProfileServices";
import { platformLabels } from "@/features/profile/lib/platform";
import { cn } from "@/lib/utils";

interface BookingModalProps {
  influencer: Influencer;
  service: { title: string; price: number; type: string };
  onClose: () => void;
}

function BookingModal({ influencer, service, onClose }: BookingModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [brief, setBrief] = useState("");

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full sm:max-w-lg bg-background sm:rounded-[32px] rounded-t-[32px] border border-border/60 overflow-hidden z-10 animate-in slide-in-from-bottom-4 duration-300">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/40">
          <div>
            <h3 className="text-xl font-heading font-black tracking-tight">Xizmatni Bron qilish</h3>
            <p className="text-sm text-muted-foreground font-medium mt-0.5">{step === 1 ? "Tafsilotlarga ko'z tashlaing" : "Buyurtmani tasdiqlang"}</p>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-border transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          {/* Service Summary */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/40 border border-border/50">
            <div className="w-12 h-12 rounded-full overflow-hidden relative shrink-0">
              <Image src={influencer.imageUrl} alt={influencer.name} fill className="object-cover" sizes="48px" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-foreground truncate">{influencer.name}</div>
              <div className="text-sm text-muted-foreground font-medium">{service.type}</div>
              <div className="text-sm font-bold text-foreground mt-0.5">{service.title}</div>
            </div>
            <div className="text-2xl font-black text-foreground ml-2 shrink-0">${service.price.toLocaleString()}</div>
          </div>

          {step === 1 ? (
            <>
              {/* Brief */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground/90 flex items-center gap-1.5">
                  Reklama maqsadi va matni
                  <span className="text-primary">*</span>
                </label>
                <textarea
                  value={brief}
                  onChange={(e) => setBrief(e.target.value)}
                  placeholder="Mahsulot/xizmat nomi, asosiy xabar, havolalar va boshqa muhim tafsilotlarni yozing..."
                  className="w-full h-28 px-4 py-3 rounded-xl border border-border/80 bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-[15px] text-foreground resize-none"
                />
              </div>

              {/* Guarantees */}
              <div className="space-y-2">
                {[
                  "To'lov faqat ish tugatilganda o'tkaziladi (Escrow)",
                  "3 marta bepul tahrirlash huquqi",
                  "24 soat ichida javob kafolati",
                ].map((g, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm font-medium text-foreground/80">
                    <Shield className="w-4 h-4 text-emerald-500 shrink-0" />
                    {g}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="p-4 rounded-2xl border border-border/50 space-y-3 bg-card">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-muted-foreground">Xizmat narxi</span>
                  <span className="font-bold">${service.price}</span>
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-muted-foreground">Platforma komissiyasi (5%)</span>
                  <span className="font-bold">-${Math.round(service.price * 0.05)}</span>
                </div>
                <div className="h-[1px] bg-border/40" />
                <div className="flex justify-between font-black text-lg">
                  <span>Jami to&apos;lov</span>
                  <span className="text-primary">${service.price}</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50 border border-amber-200 dark:bg-amber-950/20 dark:border-amber-800/30">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs font-medium text-amber-700 dark:text-amber-500">Pul faqat bloger vazifani muvaffaqiyatli yakunlaganidan keyin uning hisobiga o&apos;tkaziladi.</p>
              </div>
            </>
          )}
        </div>

        <div className="p-6 border-t border-border/40 flex gap-3">
          {step === 2 && (
            <button onClick={() => setStep(1)} className="px-6 py-3.5 rounded-full border-2 border-border/60 font-bold text-foreground hover:bg-muted transition-all">
              Orqaga
            </button>
          )}
          <button 
            onClick={() => {
              if (step === 1) setStep(2);
              else alert("Buyurtma qabul qilindi! (Demo rejim)");
            }}
            disabled={step === 1 && brief.trim().length < 10}
            className={cn(
              "flex-1 py-3.5 rounded-full font-black text-[15px] transition-all active:scale-95 flex items-center justify-center gap-2",
              step === 1 && brief.trim().length < 10
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "bg-primary text-white hover:scale-[1.02]"
            )}
          >
            {step === 1 ? (
              <>Davom etish <ChevronRight className="w-5 h-5" /></>
            ) : (
              <>Buyurtmani rasmiylashtirish <Shield className="w-5 h-5" /></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export function PublicProfile({ handle }: { handle: string }) {
  const allInfluencers = getAllInfluencers();
  const user = findInfluencerByHandle(handle) || allInfluencers[0];
  const [bookingService, setBookingService] = useState<null | { title: string; price: number; type: string }>(null);

  // Platform-specific services
  const services = [
    {
      type: `${platformLabels[user.platform] || "Social"} ${user.platform === "youtube" ? "Video" : user.platform === "telegram" ? "Post" : "Post & Story"}`,
      title: user.platform === "youtube" ? "Dedicated Video Review" : user.platform === "telegram" ? "Reklama xabar (Text + Rasm)" : "Mahsulot taqdimot (Post + Story)",
      description: user.platform === "youtube"
        ? "Mahsulot yoki xizmatga to'liq video sharh tayyorlanadi. Yuqori sifatli montaj va organik integratsiya."
        : user.platform === "telegram"
        ? "Kanalda brendingizni qisqa, aniq va samarali tarzda yozma shaklda taqdim etamiz. Havolalar va rasm bilan."
        : "Mahsulotingizni Stories'da 24 soatlik tanitib, Feed'da doimiy post sifatida joylashtiramiz. Tabiiy ko'rinish.",
      price: user.price,
      delivery: user.platform === "youtube" ? "7-10 kun" : user.platform === "telegram" ? "24 soat" : "2-3 kun",
    },
    {
      type: `${platformLabels[user.platform] || "Social"} ${user.platform === "instagram" ? "Reels" : user.platform === "tiktok" ? "Video" : "Qo'shimcha"}`,
      title: user.platform === "instagram" ? "Reels Yumoristik Sketch" : user.platform === "tiktok" ? "Short-form Viral Video" : user.platform === "youtube" ? "Integration (Sponsor Segment)" : "Pinned Reklama Xabar",
      description: "Auditoriyani eng ko'p jalb qiladigan format. Brendingizni organik va qiziqarli tarzda taqdim etib, eng yuqori ER va konversiyani ta'minlaymiz.",
      price: Math.round(user.price * 0.45),
      delivery: "1-2 kun",
    },
  ];

  const similarInfluencers = allInfluencers
    .filter((influencer) => influencer.platform === user.platform && influencer.id !== user.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background pb-24">
       {/* Booking Modal */}
       {bookingService && (
         <BookingModal 
           influencer={user} 
           service={bookingService}
           onClose={() => setBookingService(null)}
         />
       )}

       {/* Cover Image */}
       <div className="w-full h-56 md:h-80 bg-muted relative overflow-hidden">
          <Image 
             src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=80&w=2000&auto=format&fit=crop" 
             alt="Cover" 
             fill 
             className="object-cover opacity-80 blur-[1px]"
             sizes="100vw"
             priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
       </div>

       <div className="max-w-screen-xl mx-auto px-4 lg:px-6 w-full relative z-10">
          <ProfileHeader influencer={user} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             <div className="lg:col-span-1 space-y-6">
               <ProfileAnalytics />
             </div>
             <ProfileServices
               influencer={user}
               services={services}
               similarInfluencers={similarInfluencers}
               onBook={setBookingService}
             />

          </div>

       </div>
    </div>
  );
}
