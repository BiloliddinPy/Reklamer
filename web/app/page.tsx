import Link from "next/link";
import { ArrowRight, BarChart3, ShieldCheck, Zap, Star, Quote, MousePointerClick, CreditCard, Rocket } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/features/landing/components/Hero";

const testimonials = [
  {
    name: "Sardor Umarov",
    role: "CEO, TechnoMart.uz",
    text: "Reklamer orqali 3 oyda 15 ta bloger bilan ishlashga muvaffaq bo'ldik. Har bir kampaniya uchun ROI dan mamnunmiz.",
    avatar: "S",
    color: "from-blue-500 to-cyan-400",
  },
  {
    name: "Nilufar Karimova",
    role: "SMM Manager, Artel",
    text: "Oldin blogerlarni izlash, narx kelishish juda ko'p vaqt olardi. Endi Reklamer bilan bir kunda 5 ta kampaniya boshlaymiz.",
    avatar: "N",
    color: "from-purple-500 to-pink-400",
  },
  {
    name: "Alisher Rahimov",
    role: "Bloger, 1.2M followers",
    text: "Escrow tizimi tufayli endi hech qachon to'lov muammolari bo'lmaydi. Brendlar bilan munosabat ham ancha professional bo'ldi.",
    avatar: "A",
    color: "from-amber-500 to-orange-400",
  },
];

const howItWorks = [
  {
    step: "01",
    icon: MousePointerClick,
    title: "Bloger tanlang",
    desc: "Katalogdan sohangizga mos blogerlarni filterlang va ularning real statistikalarini tahlil qiling.",
    color: "bg-blue-500/10 text-blue-600",
    borderColor: "border-blue-200",
  },
  {
    step: "02",
    icon: CreditCard,
    title: "Xavfsiz to'lov qiling",
    desc: "Escrow tizimi orqali to'lov amalga oshiriladi. Pul blogerga faqat ish bajarilgandan keyin o'tkaziladi.",
    color: "bg-emerald-500/10 text-emerald-600",
    borderColor: "border-emerald-200",
  },
  {
    step: "03",
    icon: Rocket,
    title: "Natijaga erishing",
    desc: "Reklamangiz chiqadi, real vaqtda statistikani kuzating va ROI hisoblang.",
    color: "bg-primary/10 text-primary",
    borderColor: "border-primary/20",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] bg-background selection:bg-primary/20">
      
      {/* Hero Section */}
      <Hero />

      {/* How It Works — Step-by-step */}
      <section className="py-24 md:py-32 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/[0.03] blur-[100px] rounded-full pointer-events-none" />
        
        <div className="container max-w-screen-xl px-4 mx-auto relative z-10">
          <div className="text-center mb-16 md:mb-20">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-muted/50 px-4 py-1.5 text-sm font-bold text-muted-foreground mb-6">
              <Zap className="w-4 h-4 text-primary" />
              Oddiy va tezkor
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-black tracking-tight mb-6">Qanday ishlaydi?</h2>
            <p className="text-xl text-muted-foreground w-full max-w-2xl mx-auto">Uch oddiy qadamda brendingizni millionlab auditoriyaga yetkazing.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {howItWorks.map((item, i) => (
              <div 
                key={item.step} 
                className={`relative flex flex-col gap-5 p-8 rounded-[28px] border ${item.borderColor} bg-card hover:-translate-y-2 transition-all duration-500 group`}
              >
                <div className="absolute -top-4 -right-2 text-[64px] font-heading font-black text-muted/80 leading-none select-none pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity">
                  {item.step}
                </div>
                
                <div className={`h-14 w-14 rounded-2xl ${item.color} flex items-center justify-center transition-transform group-hover:scale-110 duration-300`}>
                  <item.icon className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold tracking-tight mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-[15px] leading-relaxed">{item.desc}</p>
                </div>

                {/* Connector arrow on desktop */}
                {i < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute -right-5 top-1/2 -translate-y-1/2 z-20">
                    <ArrowRight className="w-5 h-5 text-muted-foreground/40" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 md:py-32 bg-card relative z-20 border-y border-border/40">
        <div className="container max-w-screen-xl px-4 mx-auto">
          <div className="text-center mb-16 md:mb-24">
             <h2 className="text-3xl md:text-5xl font-heading font-black tracking-tight mb-6">Nega aynan Reklamer?</h2>
             <p className="text-xl text-muted-foreground w-full max-w-2xl mx-auto">Oddiy izlash o&apos;rniga haqiqiy investitsiya qilishingiz uchun noldan qurilgan platformamiz imkoniyatlari.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            
            <div className="flex flex-col gap-6 group hover:-translate-y-2 transition-all duration-500">
              <div className="h-20 w-20 rounded-[28px] bg-blue-500/10 flex items-center justify-center text-blue-600 border border-blue-200/60 group-hover:border-blue-300 transition-all duration-300">
                <BarChart3 className="h-9 w-9" />
              </div>
              <div>
                <h3 className="text-2xl font-bold tracking-tight mb-3">Tahlillar asosi</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Har bir blogerning ER (Faollik) va CPM narxlarini o&apos;rganib chiqib eng daromad keltiruvchi auditoriyaga pul tiking. SMM adashmaydi.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-6 group hover:-translate-y-2 transition-all duration-500">
              <div className="h-20 w-20 rounded-[28px] bg-emerald-500/10 flex items-center justify-center text-emerald-600 border border-emerald-200/60 group-hover:border-emerald-300 transition-all duration-300">
                <ShieldCheck className="h-9 w-9" />
              </div>
              <div>
                <h3 className="text-2xl font-bold tracking-tight mb-3">Xavfsiz to&apos;lov (Escrow)</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Pulingiz osmonda uchmaydi. Blogerlar reklamani to&apos;liq tarqatmaguniga qadar pul hisobingizda kafolatli saqlanib turadi.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-6 group hover:-translate-y-2 transition-all duration-500">
              <div className="h-20 w-20 rounded-[28px] bg-amber-500/10 flex items-center justify-center text-amber-600 border border-amber-200/60 group-hover:border-amber-300 transition-all duration-300">
                <Zap className="h-9 w-9" />
              </div>
              <div>
                <h3 className="text-2xl font-bold tracking-tight mb-3">Tezlik va Shaffoflik</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Direct yozishmalar yoki uzun kutishlar yo&apos;q. Istalgan yulduzga bir marta bosish orqali xarid qiling va natijani kuting. Vositachisiz.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials / Social Proof */}
      <section className="py-24 md:py-32 bg-background relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/[0.03] blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container max-w-screen-xl px-4 mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-muted/50 px-4 py-1.5 text-sm font-bold text-muted-foreground mb-6">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              Ishonchli fikrlar
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-black tracking-tight mb-6">Brendlar va blogerlar nima deydi?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Bizning platformadan foydalanayotgan real foydalanuvchilarning tajribalari.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((t, i) => (
              <div 
                key={i} 
                className="relative p-8 rounded-[28px] bg-card border border-border/50 hover:border-border hover:-translate-y-1 transition-all duration-500 group"
              >
                <Quote className="w-10 h-10 text-muted/60 mb-4 group-hover:text-primary/30 transition-colors" />
                
                <p className="text-foreground text-[15px] leading-relaxed mb-8 font-medium">
                  &ldquo;{t.text}&rdquo;
                </p>
                
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-tr ${t.color} flex items-center justify-center text-white font-black text-lg`}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-foreground">{t.name}</div>
                    <div className="text-sm text-muted-foreground">{t.role}</div>
                  </div>
                </div>

                {/* 5 stars */}
                <div className="absolute top-8 right-8 flex gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust CTA section — Premium Dark Mode */}
      <section className="py-24 m-4 md:m-8 rounded-[40px] relative overflow-hidden bg-[#09090b] border border-white/10">
         {/* Elegant glowing orbs */}
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/15 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none animate-pulse-glow" />
         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full -translate-x-1/4 translate-y-1/4 pointer-events-none" />
         <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 pointer-events-none" />
         
         <div className="container px-4 relative z-10 text-center flex flex-col items-center">

            {/* Trusted by logos mockup */}
            <div className="flex items-center gap-3 mb-10 opacity-60">
              <span className="text-white/50 text-sm font-medium">Ishonch bildirgan kompaniyalar:</span>
              <div className="flex items-center gap-4">
                {["Artel", "Uzum", "Billz", "Korzinka"].map((name) => (
                  <span key={name} className="text-white/40 font-heading font-bold text-sm border border-white/10 px-3 py-1 rounded-full">{name}</span>
                ))}
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-black tracking-tighter text-white mb-6 drop-shadow-sm">
               Katta nufuzingiz — <br className="hidden md:block" /> bitta qadam narida. 
            </h2>
            <p className="text-zinc-400 text-xl font-medium max-w-2xl text-center mb-10 drop-shadow-sm">
               Brendingiz haqida millionlarga so&apos;zlab berish imkoniyatini qoldirmang. Eng yaxshi sarmoya eng ishongan yuzlargadir.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
               <Link 
                 href="/catalog" 
                 className="px-12 py-5 rounded-full bg-primary text-white font-black text-xl hover:scale-105 active:scale-95 transition-all text-center"
               >
                 Katalogni ko&apos;rish
               </Link>
               <Link 
                 href="/login?mode=register&role=brand" 
                 className="px-12 py-5 rounded-full bg-white/5 border border-white/10 text-white font-black text-xl hover:bg-white/10 hover:border-white/20 hover:scale-105 active:scale-95 transition-all text-center backdrop-blur-md"
               >
                 Saytga kirish
               </Link>
            </div>
         </div>
      </section>
      
      <Footer />
    </div>
  );
}
