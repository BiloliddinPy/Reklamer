import Link from "next/link";
import { ArrowRight, CheckCircle2, TrendingUp, Wallet, Shield, Star, Users, Zap } from "lucide-react";
import { Footer } from "@/components/layout/Footer";

const stats = [
  { value: "30+", label: "Faol blogerlar", icon: Users },
  { value: "98%", label: "To'lov kafolati", icon: Shield },
  { value: "4.9", label: "O'rtacha reyting", icon: Star },
];

export default function ForInfluencersPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-primary/20">
      
      {/* Hero Area */}
      <header className="relative w-full pt-16 pb-20 md:pt-28 md:pb-32 overflow-hidden border-b border-border/40 bg-zinc-50 dark:bg-zinc-950/20">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/[0.05] blur-[100px] rounded-full pointer-events-none" />
        
        <div className="max-w-screen-xl mx-auto px-4 lg:px-6 relative z-10 flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          
          <div className="flex-1 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 rounded-full border-2 border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary mb-6 animate-slide-up">
              <Zap className="w-4 h-4" />
              Influenserlar dasturlari
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-[80px] leading-[0.95] font-heading font-black tracking-tighter text-foreground mb-6 animate-slide-up stagger-1">
              Auditoriyangizni <br/> <span className="text-primary italic">daromadga</span> aylantiring.
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground font-medium mb-10 max-w-lg leading-relaxed animate-slide-up stagger-2">
              O&apos;zbekistonning eng ishonchli marketpleysida o&apos;z xizmatlaringizni taklif qiling. Yirik brendlardan to&apos;g&apos;ridan-to&apos;g&apos;ri, xavfsiz va oldindan to&apos;lovli buyurtmalar o&apos;rnating.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto animate-slide-up stagger-3">
              <Link 
                href="/login?mode=register&role=influencer" 
                className="w-full sm:w-auto px-8 py-4 sm:py-5 rounded-full bg-primary text-white font-black text-lg shadow-[0_8px_30px_rgba(232,68,10,0.3)] hover:scale-105 hover:shadow-[0_8px_40px_rgba(232,68,10,0.4)] transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                Hozir qo&apos;shiling <ArrowRight className="h-5 w-5" />
              </Link>
            </div>

            {/* Quick stats */}
            <div className="flex items-center gap-6 mt-10 animate-slide-up stagger-4">
              {stats.map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <s.icon className="w-4 h-4 text-primary" />
                  <span className="font-black text-foreground">{s.value}</span>
                  <span className="text-sm text-muted-foreground font-medium hidden sm:block">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 w-full relative animate-scale-in">
             {/* Earnings UI Mockup */}
             <div className="relative mx-auto w-full max-w-md bg-card rounded-[32px] md:rounded-[40px] p-8 shadow-2xl border border-border/60 hover:shadow-3xl transition-shadow duration-500">
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-emerald-400 rounded-full blur-[40px] opacity-20 animate-pulse-glow" />
                <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-primary rounded-full blur-[40px] opacity-20 animate-pulse-glow" style={{ animationDelay: "2s" }} />
                
                <h3 className="text-xl font-bold text-muted-foreground mb-2">Sizning aylanmangiz</h3>
                <div className="text-5xl font-black text-foreground tracking-tighter mb-8">$12,450<span className="text-2xl text-muted-foreground">/oy</span></div>

                <div className="space-y-4">
                   <div className="w-full bg-muted/50 rounded-2xl p-4 flex items-center justify-between border border-border/40 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-amber-500 flex items-center justify-center text-white font-bold text-sm">IG</div>
                         <div className="font-bold">Instagram Post</div>
                      </div>
                      <div className="font-black text-lg text-emerald-600">+$450</div>
                   </div>
                   <div className="w-full bg-muted/50 rounded-2xl p-4 flex items-center justify-between border border-border/40 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-400 to-sky-600 flex items-center justify-center text-white font-bold text-sm">TG</div>
                         <div className="font-bold">Telegram Kanal</div>
                      </div>
                      <div className="font-black text-lg text-emerald-600">+$180</div>
                   </div>
                   <div className="w-full bg-muted/50 rounded-2xl p-4 flex items-center justify-between border border-border/40 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-red-500 to-red-600 flex items-center justify-center text-white font-bold text-sm">YT</div>
                         <div className="font-bold">YouTube Video</div>
                      </div>
                      <div className="font-black text-lg text-emerald-600">+$720</div>
                   </div>
                </div>

                <div className="mt-8 flex items-center justify-center gap-2 text-emerald-500 font-bold bg-emerald-500/10 py-3 rounded-full border border-emerald-500/20">
                   <Shield className="w-5 h-5" />
                   To&apos;lovlar 100% kafolatlangan
                </div>
             </div>
          </div>

        </div>
      </header>

      {/* How it works */}
      <section className="py-24 bg-background">
         <div className="max-w-screen-xl mx-auto px-4 lg:px-6">
            <h2 className="text-3xl md:text-5xl font-heading font-black tracking-tight text-center mb-16">Hammasi faqat 3 qadamda</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
               
               <div className="flex flex-col items-center text-center group">
                  <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center text-3xl font-black text-foreground mb-6 shadow-sm border border-border group-hover:scale-110 group-hover:border-primary/30 transition-all duration-300">1</div>
                  <h3 className="text-2xl font-bold mb-3">O&apos;z kartangizni yarating</h3>
                  <p className="text-lg text-muted-foreground">O&apos;zingizning narxlaringiz, tarmoqlaringiz va portfoliongizni tizimga joylang. Hech qanday vositachilarsiz!</p>
               </div>
               
               <div className="flex flex-col items-center text-center group">
                  <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center text-3xl font-black text-foreground mb-6 shadow-sm border border-border group-hover:scale-110 group-hover:border-primary/30 transition-all duration-300">2</div>
                  <h3 className="text-2xl font-bold mb-3">Buyurtmalarni tasdiqlang</h3>
                  <p className="text-lg text-muted-foreground">Kompaniyalar to&apos;g&apos;ridan-to&apos;g&apos;ri sizga so&apos;rov yuborishadi. Materialni ko&apos;rib chiqing va tasdiqlang.</p>
               </div>
               
               <div className="flex flex-col items-center text-center group">
                  <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-3xl font-black text-white mb-6 shadow-lg shadow-primary/30 group-hover:scale-110 transition-all duration-300">3</div>
                  <h3 className="text-2xl font-bold mb-3">Daromadni qabul qiling</h3>
                  <p className="text-lg text-muted-foreground">Barcha to&apos;lovlar Escrow orqali garantiyalangan. Post joylangandan so&apos;ng darhol pulni yechib oling.</p>
               </div>

            </div>
         </div>
      </section>

      {/* Benefits grid */}
      <section className="py-24 bg-card border-t border-border/40">
         <div className="max-w-screen-xl mx-auto px-4 lg:px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
               
               <div>
                  <h2 className="text-3xl md:text-5xl font-heading font-black tracking-tight mb-8">Nege Reklamer guruhlarga qaraganda foydaliroq?</h2>
                  <div className="space-y-6">
                     <div className="flex gap-4 group hover:translate-x-1 transition-transform duration-300">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                          <CheckCircle2 className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                           <h4 className="text-xl font-bold mb-1">Menejerlar bilan savdolashish yo&apos;q</h4>
                           <p className="text-muted-foreground">Barchasi avtomatlashgan. Buyurtmachi narxni ko&apos;radi, rozi bo&apos;ladi va sotib oladi.</p>
                        </div>
                     </div>
                     <div className="flex gap-4 group hover:translate-x-1 transition-transform duration-300">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/15 transition-colors">
                          <Wallet className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div>
                           <h4 className="text-xl font-bold mb-1">Qarz bo&apos;lib qolish xavfi nolga teng</h4>
                           <p className="text-muted-foreground">Reklamer&apos;da obunachini &ldquo;kichitish&rdquo; yoki &ldquo;kechroq tashlab beraman&rdquo; degan tushuncha yo&apos;q.</p>
                        </div>
                     </div>
                     <div className="flex gap-4 group hover:translate-x-1 transition-transform duration-300">
                        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:bg-blue-500/15 transition-colors">
                          <TrendingUp className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                           <h4 className="text-xl font-bold mb-1">SEO va Ochiq bozor</h4>
                           <p className="text-muted-foreground">Brendlar aynan sohangiz bo&apos;yicha profilni topishadi. Doimiy reklama qidirish kerak emas.</p>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="bg-gradient-to-br from-muted/30 to-muted/60 p-8 sm:p-12 border border-border/50 rounded-[40px] text-center hover:shadow-xl transition-shadow duration-500">
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-4 py-1.5 text-sm font-bold mb-6">
                    <Star className="w-4 h-4 fill-primary" /> Premium platforma
                  </div>
                  <h3 className="text-3xl font-black mb-6">Faqat jiddiy niyatli brendlar</h3>
                  <p className="text-lg text-muted-foreground mb-8">Bizning bozordagi yirik korxonalar, agentliklar va xususiy tadbirkorlar bevosita sizning reklamangiz kuchi bilan katta maqsadlarga erishishadi.</p>
                  <Link 
                     href="/login?mode=register&role=influencer" 
                     className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-foreground text-background font-bold text-lg hover:scale-105 transition-all active:scale-95 shadow-lg hover:shadow-xl"
                  >
                     Yangi Profil yaratish
                  </Link>
               </div>

            </div>
         </div>
      </section>

      <Footer />
    </div>
  );
}
