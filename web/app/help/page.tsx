"use client";

import { HelpCircle, FileText, ChevronDown, Mail, Search } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "To'lovlar qanday kafolatlanadi?",
    a: "Reklamer 'Escrow' (kafil) tizimi orqali ishlaydi. Bu shuni anglatadiki, Mijoz reklamaga to'lagan puli tizim hisobida ushlanib turadi va influenser reklamani to'liq tarqatib bo'lgandagina uning hisobiga o'tkaziladi."
  },
  {
    q: "Platformada ishlash uchun komissiya qancha?",
    a: "Bizning xizmat haqimiz muvaffaqiyatli bitim narxidan atigi 10%. Bu komissiya o'z ichiga xavfsiz to'lov va yordam panelini qamrab oladi."
  },
  {
    q: "Influenser reklamani xato qo'ysa nima bo'ladi?",
    a: "Agar reklama kelishilgan vaqtda yoki shartlarda chop etilmasa, buyurtmachi Arbitraj (Yordam) markaziga murojaat qilishi mumkin. Mablag' to'liq qaytariladi."
  },
  {
    q: "Pulni yechib olish qanday ishlaydi?",
    a: "Pul hisobingizga tushishi bilan Uzcard, Humo vizalariga yoki bank hisob raqamingizga ko'pi bilan 2 soat ichida mutlaqo bepul o'tkazib beriladi."
  }
];

export default function HelpPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background flex flex-col items-center pb-24">
      
      {/* Help Hero */}
      <div className="w-full bg-muted/30 pt-16 pb-20 border-b border-border/40 text-center px-4">
        <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full text-primary mb-6 shadow-sm">
           <HelpCircle className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-heading font-black tracking-tight mb-4">
           Qanday yordam bera olamiz?
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
           Reklamer&apos;da ishlash qoidalari, xavfsizlik va boshqa barcha savollaringizga eng to&apos;g&apos;ri yechim.
        </p>

        <div className="max-w-xl mx-auto relative group">
           <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
           <input 
             type="text" 
             placeholder="Savolingizni izlang (Masalan: Pulni yechish)" 
             className="w-full h-14 pl-14 pr-6 rounded-full bg-background border-2 border-border/80 focus:border-primary shadow-sm outline-none text-[15px] font-medium transition-all"
           />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 mt-16 w-full space-y-12 shrink-0">
          
          {/* FAQ Accordion */}
          <section>
             <h2 className="text-2xl font-bold font-heading mb-8 flex items-center gap-3">
               <FileText className="w-6 h-6 text-primary" />
               Ko&apos;p so&apos;raladigan savollar
             </h2>
             <div className="space-y-4">
                {faqs.map((faq, i) => {
                  const isOpen = openIndex === i;
                  return (
                    <div 
                      key={i} 
                      className={cn(
                        "rounded-2xl border transition-all duration-300 overflow-hidden",
                        isOpen ? "border-primary/40 bg-primary/5 shadow-sm" : "border-border/60 bg-card hover:border-primary/30"
                      )}
                    >
                       <button 
                         onClick={() => setOpenIndex(isOpen ? null : i)}
                         className="w-full flex items-center justify-between p-5 text-left font-bold text-foreground text-[15px] outline-none"
                       >
                         {faq.q}
                         <div className={cn("shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300", isOpen ? "bg-primary text-white rotate-180" : "bg-muted text-muted-foreground")}>
                            <ChevronDown className="w-4 h-4" />
                         </div>
                       </button>
                       <div 
                         className={cn(
                           "px-5 text-muted-foreground transition-all duration-300 overflow-hidden",
                           isOpen ? "pb-5 max-h-40 opacity-100" : "max-h-0 opacity-0 pb-0"
                         )}
                       >
                         {faq.a}
                       </div>
                    </div>
                  );
                })}
             </div>
          </section>

          {/* Contact Bar */}
          <section className="bg-foreground text-background rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
             {/* Abstract circle decor */}
             <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-zinc-800 rounded-full" />
             <div className="absolute top-10 left-10 w-4 h-4 bg-primary rounded-full animate-pulse" />

             <div className="relative z-10 text-center md:text-left">
                <h3 className="text-2xl font-black font-heading mb-2">Javob topilmadingizmi?</h3>
                <p className="text-zinc-400">Bizning jamoa har doim siz bilan ishlashga tayyor.</p>
             </div>
             
             <button className="relative z-10 px-8 py-3 rounded-full bg-background text-foreground font-bold hover:scale-105 transition-transform flex items-center gap-2 active:scale-95 shadow-md">
                <Mail className="w-4 h-4" /> Aloqaga chiqish
             </button>
          </section>

      </div>
    </div>
  );
}
