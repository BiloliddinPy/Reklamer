"use client";

import { User, Bell, Shield, CreditCard, Paintbrush } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background flex flex-col md:flex-row pb-20">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 lg:w-80 flex-shrink-0 border-r border-border/40 md:min-h-screen">
         <div className="sticky top-[68px] p-6">
            <h1 className="text-2xl font-heading font-black mb-6">Sozlamalar</h1>
            <nav className="flex flex-col gap-2">
               <button className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted font-bold text-foreground text-sm text-left">
                  <User className="w-4 h-4" /> Umumiy Ma&apos;lumotlar
               </button>
               <button className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted font-semibold text-muted-foreground hover:text-foreground text-sm text-left transition-colors">
                  <Bell className="w-4 h-4" /> Bildirishnomalar
               </button>
               <button className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted font-semibold text-muted-foreground hover:text-foreground text-sm text-left transition-colors">
                  <Shield className="w-4 h-4" /> Parol va Xavfsizlik
               </button>
               <button className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted font-semibold text-muted-foreground hover:text-foreground text-sm text-left transition-colors">
                  <CreditCard className="w-4 h-4" /> To&apos;lov Tizimlari
               </button>
               <button className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted font-semibold text-muted-foreground hover:text-foreground text-sm text-left transition-colors">
                  <Paintbrush className="w-4 h-4" /> Ko&apos;rinish
               </button>
            </nav>
         </div>
      </aside>

      {/* Main Form Area */}
      <main className="flex-1 px-4 lg:px-12 py-8 lg:py-12 max-w-3xl">
         <div className="mb-10">
            <h2 className="text-3xl font-heading font-bold mb-2">Asosiy Profil</h2>
            <p className="text-muted-foreground">Tizimda boshqalarga qanday ko&apos;rinishingizni boshqaring.</p>
         </div>

         <div className="space-y-8">
            
            {/* Avatar Row */}
            <div className="flex items-center gap-6 pb-8 border-b border-border/40">
               <div className="w-24 h-24 rounded-full bg-muted border-2 border-dashed border-border flex items-center justify-center text-muted-foreground">
                  No Image
               </div>
               <div>
                  <button className="px-5 py-2.5 rounded-full bg-foreground text-background font-bold text-sm mb-2 hover:opacity-90 transition-opacity">
                     Rasm yuklash
                  </button>
                  <p className="text-xs text-muted-foreground">Tavsiya etiladi: Kamida 400x400 sifatli PNG yoki JPG</p>
               </div>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground">Ism va Familiya</label>
                  <input type="text" placeholder="Ismingizni kiriting" className="w-full h-12 px-4 rounded-xl border border-border/80 bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-[15px]" />
               </div>
               <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground">Foydalanuvchi nomi (@)</label>
                  <input type="text" placeholder="trolluz" className="w-full h-12 px-4 rounded-xl border border-border/80 bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-[15px]" />
               </div>
            </div>

            <div className="space-y-2">
               <label className="text-sm font-bold text-foreground">Siz haqingizda (Bio)</label>
               <textarea rows={4} placeholder="O&apos;zingiz va qiladigan ishlaringiz haqida qisqacha..." className="w-full p-4 rounded-xl border border-border/80 bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-[15px] resize-none" />
               <p className="text-xs text-muted-foreground text-right">0 / 160 ta belgi</p>
            </div>

            <div className="space-y-2">
               <label className="text-sm font-bold text-foreground">Asosiy Manzil</label>
               <input type="text" placeholder="Toshkent, O'zbekiston" className="w-full h-12 px-4 rounded-xl border border-border/80 bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-[15px]" />
            </div>

            <div className="pt-6 border-t border-border/40 flex items-center justify-end gap-4">
               <button className="px-6 py-3 rounded-full font-bold text-muted-foreground hover:bg-muted transition-colors">
                  Bekor qilish
               </button>
               <button className="px-8 py-3 rounded-full bg-primary text-white font-bold hover:scale-105 transition-transform shadow-lg shadow-primary/20 flex items-center gap-2">
                  O&apos;zgarishlarni saqlash
               </button>
            </div>

         </div>
      </main>

    </div>
  );
}
