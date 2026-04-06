import Link from "next/link";
import { Flame, Mail, MapPin, Phone } from "lucide-react";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const TelegramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
);

export function Footer() {
  return (
    <footer className="w-full bg-muted/30 border-t border-border/40 pt-16 pb-8">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-6">
        
        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2 outline-none rounded-lg focus-visible:ring-2 focus-visible:ring-primary w-fit">
              <div className="bg-primary text-primary-foreground p-1.5 rounded-xl shadow-[0_4px_15px_rgba(232,68,10,0.3)] rotate-3 hover:rotate-0 transition-transform">
                <span className="font-heading font-black text-xl leading-none block">R.</span>
              </div>
              <span className="font-heading font-black text-2xl tracking-tight text-foreground">
                Reklamer
              </span>
            </Link>
            <p className="text-muted-foreground text-[15px] max-w-sm leading-relaxed">
              O&apos;zbekistondagi eng yirik va xavfsiz influenser-marketing platformasi. Biznesingizni ishonchli yuzlar orqali yuksaltiring.
            </p>
            <div className="flex items-center gap-4 mt-2">
               <a href="#" className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors shadow-sm">
                  <InstagramIcon className="w-4 h-4" />
               </a>
               <a href="#" className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-[#0088CC] hover:border-[#0088CC]/50 transition-colors shadow-sm">
                  <TelegramIcon className="w-4 h-4" />
               </a>
               <a href="#" className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-[#FF0000] hover:border-[#FF0000]/50 transition-colors shadow-sm">
                  <YoutubeIcon className="w-4 h-4" />
               </a>
            </div>
          </div>

          {/* Platform */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-foreground mb-2">Platforma</h4>
            <Link href="/catalog" className="text-muted-foreground hover:text-foreground transition-colors font-medium text-[15px]">Katalog</Link>
            <Link href="/catalog?isTop=true" className="text-muted-foreground hover:text-foreground transition-colors font-medium text-[15px] flex items-center gap-1.5">Top Reyting <Flame className="w-3.5 h-3.5 text-primary" /></Link>
            <Link href="/for-influencers" className="text-muted-foreground hover:text-foreground transition-colors font-medium text-[15px]">Blogerlar uchun</Link>
            <Link href="/register" className="text-muted-foreground hover:text-foreground transition-colors font-medium text-[15px]">Ro&apos;yxatdan o&apos;tish</Link>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-foreground mb-2">Kompaniya</h4>
            <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors font-medium text-[15px]">Biz haqimizda</Link>
            <Link href="/help" className="text-muted-foreground hover:text-foreground transition-colors font-medium text-[15px]">Yordam Markazi</Link>
            <Link href="/vacancies" className="text-muted-foreground hover:text-foreground transition-colors font-medium text-[15px]">Karyera</Link>
            <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors font-medium text-[15px]">Blog</Link>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-foreground mb-2">Aloqa</h4>
            <div className="flex items-center gap-2 text-muted-foreground font-medium text-[15px]">
               <Phone className="w-4 h-4" /> +998 71 200-00-00
            </div>
            <div className="flex items-center gap-2 text-muted-foreground font-medium text-[15px]">
               <Mail className="w-4 h-4" /> info@reklamer.uz
            </div>
            <div className="flex items-start gap-2 text-muted-foreground font-medium text-[15px] mt-1">
               <MapPin className="w-4 h-4 shrink-0 mt-0.5" /> 
               <span>Toshkent sh., Yunusobod tumani, 14-daha, IT Park</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4">
           <p className="text-muted-foreground text-sm font-medium">
             © {new Date().getFullYear()} Reklamer. Barcha huquqlar himoyalangan.
           </p>
           <div className="flex items-center gap-6">
             <Link href="/privacy" className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors">Maxfiylik siyosati</Link>
             <Link href="/terms" className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors">Foydalanish shartlari</Link>
           </div>
        </div>

      </div>
    </footer>
  );
}
