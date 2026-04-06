"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronDown, User, Settings, HelpCircle, Megaphone, LayoutGrid, Menu, X, ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header className={cn(
        "sticky top-0 z-50 w-full transition-all duration-500",
        scrolled
          ? "glass-header"
          : "bg-transparent border-b border-transparent"
      )}>
        <div className="mx-auto px-4 lg:px-6 h-[68px] flex items-center justify-between gap-4 max-w-screen-2xl">
          
          {/* Brand / Logo */}
          <Link href="/" className="flex items-center gap-2.5 outline-none rounded-lg focus-visible:ring-2 focus-visible:ring-primary z-10 group" onClick={() => setMobileOpen(false)}>
            <div className="bg-primary text-primary-foreground p-1.5 rounded-xl rotate-3 group-hover:rotate-0 group-hover:scale-110 transition-all duration-300">
              <span className="font-heading font-black text-xl leading-none block">R.</span>
            </div>
            <span className="font-heading font-black text-xl hidden sm:block tracking-tight text-foreground">
              Reklamer
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2 h-full z-0">
            <Link 
              href="/catalog" 
              className={cn(
                 "text-[15px] font-semibold hover:text-primary transition-all duration-300 h-full flex items-center gap-1.5 border-b-2 hover:-translate-y-[1px]",
                 pathname?.startsWith("/catalog") ? "text-foreground border-primary" : "text-muted-foreground border-transparent"
              )}
            >
              <LayoutGrid className="w-4 h-4" />
              Katalog
            </Link>

            <Link 
              href="/for-influencers" 
              className={cn(
                 "text-[15px] font-semibold hover:text-primary transition-all duration-300 h-full flex items-center gap-1.5 border-b-2 hover:-translate-y-[1px]",
                 pathname?.startsWith("/for-influencers") ? "text-foreground border-primary" : "text-muted-foreground border-transparent"
              )}
            >
              <Megaphone className="w-4 h-4" />
              Blogerlar uchun
            </Link>

            {/* Dropdown Hover */}
            <div className="relative group h-full flex items-center">
              <button className="text-[15px] font-semibold text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 outline-none">
                Ko&apos;proq
                <ChevronDown className="w-4 h-4 opacity-50 group-hover:rotate-180 transition-transform duration-300" />
              </button>
              <div className="absolute top-[60px] left-1/2 -translate-x-1/2 w-52 bg-background/95 backdrop-blur-xl border border-border/60 rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 p-2 overflow-hidden z-50">
                 <Link href="/profile" className="flex items-center gap-2.5 px-3 py-2.5 hover:bg-muted text-sm font-medium rounded-xl transition-all duration-200 hover:translate-x-0.5">
                   <User className="w-4 h-4 text-muted-foreground" /> Mening profilim
                 </Link>
                 <Link href="/settings" className="flex items-center gap-2.5 px-3 py-2.5 hover:bg-muted text-sm font-medium rounded-xl transition-all duration-200 hover:translate-x-0.5">
                   <Settings className="w-4 h-4 text-muted-foreground" /> Sozlamalar
                 </Link>
                 <div className="h-[1px] w-full bg-border/50 my-1"></div>
                 <Link href="/help" className="flex items-center gap-2.5 px-3 py-2.5 hover:bg-muted text-sm font-medium rounded-xl transition-all duration-200 hover:translate-x-0.5">
                   <HelpCircle className="w-4 h-4 text-muted-foreground" /> Qoidalar
                 </Link>
              </div>
            </div>
          </nav>

          {/* User Actions */}
          <div className="flex items-center justify-end gap-4 z-10">
            
            {/* Language Switcher - Desktop */}
            <div className="relative group flex items-center h-full">
              <button className="hidden sm:flex text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors items-center gap-1 outline-none py-2">
                UZ <ChevronDown className="w-3.5 h-3.5 opacity-50 transition-transform group-hover:rotate-180 duration-300" />
              </button>
              <div className="absolute top-[35px] right-0 w-36 bg-background/95 backdrop-blur-xl border border-border/60 rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 p-1.5 overflow-hidden z-50">
                 <button className="w-full flex items-center justify-between text-left px-3 py-2.5 text-sm font-bold bg-muted/50 rounded-xl transition-colors text-foreground">
                   O&apos;zbek
                   <span className="text-[10px] font-black tracking-wider bg-primary/10 text-primary px-1.5 py-0.5 rounded-md">UZ</span>
                 </button>
                 <button className="w-full flex items-center justify-between text-left px-3 py-2.5 text-sm font-medium text-muted-foreground rounded-xl hover:bg-muted hover:text-foreground transition-colors">
                   Русский
                   <span className="text-[10px] font-bold tracking-wider bg-muted-foreground/10 px-1.5 py-0.5 rounded-md">RU</span>
                 </button>
                 <button className="w-full flex items-center justify-between text-left px-3 py-2.5 text-sm font-medium text-muted-foreground rounded-xl hover:bg-muted hover:text-foreground transition-colors">
                   English
                   <span className="text-[10px] font-bold tracking-wider bg-muted-foreground/10 px-1.5 py-0.5 rounded-md">EN</span>
                 </button>
              </div>
            </div>
            
            <Link 
               href="/login" 
               className="hidden md:flex items-center justify-center bg-foreground text-background hover:bg-foreground/90 font-semibold px-5 h-[38px] rounded-full transition-all active:scale-95 text-sm"
            >
               Kirish
            </Link>

            {/* Mobile Hamburger Button */}
            <button 
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-muted/50 border border-border/50 text-foreground hover:bg-muted transition-all active:scale-90"
              aria-label="Menu"
            >
              <div className="relative w-5 h-5">
                <Menu className={cn("absolute inset-0 w-5 h-5 transition-all duration-300", mobileOpen ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100")} />
                <X className={cn("absolute inset-0 w-5 h-5 transition-all duration-300", mobileOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50")} />
              </div>
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 z-40 md:hidden transition-all duration-500",
        mobileOpen ? "pointer-events-auto" : "pointer-events-none"
      )}>
        {/* Backdrop */}
        <div 
          className={cn("absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500", mobileOpen ? "opacity-100" : "opacity-0")}
          onClick={() => setMobileOpen(false)}
        />
        
        {/* Slide-up Panel */}
        <div className={cn(
          "absolute bottom-0 left-0 right-0 bg-background rounded-t-[32px] border-t border-border/50 transition-all duration-500 ease-out max-h-[85vh] overflow-auto",
          mobileOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        )}>
          {/* Handle bar */}
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-12 h-1.5 rounded-full bg-muted-foreground/20" />
          </div>

          <nav className="px-6 pb-8 pt-2 flex flex-col gap-2">
            <Link 
              href="/catalog" 
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center justify-between px-4 py-4 rounded-2xl text-[17px] font-bold transition-all duration-200 active:scale-[0.98]",
                pathname?.startsWith("/catalog") ? "bg-primary/10 text-primary" : "hover:bg-muted text-foreground"
              )}
            >
              <div className="flex items-center gap-3">
                <LayoutGrid className="w-5 h-5" />
                Katalog
              </div>
              <ArrowUpRight className="w-4 h-4 opacity-40" />
            </Link>

            <Link 
              href="/for-influencers" 
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center justify-between px-4 py-4 rounded-2xl text-[17px] font-bold transition-all duration-200 active:scale-[0.98]",
                pathname?.startsWith("/for-influencers") ? "bg-primary/10 text-primary" : "hover:bg-muted text-foreground"
              )}
            >
              <div className="flex items-center gap-3">
                <Megaphone className="w-5 h-5" />
                Blogerlar uchun
              </div>
              <ArrowUpRight className="w-4 h-4 opacity-40" />
            </Link>

            <div className="h-px bg-border/50 my-2" />

            <Link href="/profile" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-3.5 rounded-2xl hover:bg-muted text-[17px] font-medium text-foreground transition-all active:scale-[0.98]">
              <User className="w-5 h-5 text-muted-foreground" /> Mening profilim
            </Link>
            <Link href="/settings" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-3.5 rounded-2xl hover:bg-muted text-[17px] font-medium text-foreground transition-all active:scale-[0.98]">
              <Settings className="w-5 h-5 text-muted-foreground" /> Sozlamalar
            </Link>
            <Link href="/help" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-3.5 rounded-2xl hover:bg-muted text-[17px] font-medium text-foreground transition-all active:scale-[0.98]">
              <HelpCircle className="w-5 h-5 text-muted-foreground" /> Qoidalar
            </Link>

            <div className="h-px bg-border/50 my-2" />

            {/* Language options */}
            <div className="flex gap-2 px-4">
              <button className="flex-1 py-2.5 rounded-xl bg-foreground text-background font-bold text-sm">UZ</button>
              <button className="flex-1 py-2.5 rounded-xl bg-muted text-muted-foreground font-bold text-sm hover:bg-muted/80 transition-colors">RU</button>
              <button className="flex-1 py-2.5 rounded-xl bg-muted text-muted-foreground font-bold text-sm hover:bg-muted/80 transition-colors">EN</button>
            </div>

            <Link 
              href="/login" 
              onClick={() => setMobileOpen(false)}
              className="mt-3 w-full flex items-center justify-center py-4 rounded-2xl bg-primary text-white font-black text-lg transition-all active:scale-95"
            >
              Kirish / Ro&apos;yxatdan o&apos;tish
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
