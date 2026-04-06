"use client";

import Link from "next/link";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { loginWithEmail, registerWithEmail } from "../api/auth";
import type { AuthMode, AuthRole } from "../model/auth.types";
import { getAuthFormContent } from "../lib/auth-content";
import { GoogleIcon } from "./GoogleIcon";
import { AuthRoleSwitcher } from "./AuthRoleSwitcher";

interface AuthCredentialsFormProps {
  mode: AuthMode;
  role: AuthRole;
  onModeChange: (mode: AuthMode) => void;
  onRoleChange: (role: AuthRole) => void;
}

export function AuthCredentialsForm({
  mode,
  role,
  onModeChange,
  onRoleChange,
}: AuthCredentialsFormProps) {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const content = getAuthFormContent(mode);
  const isDemo = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const session = mode === "login"
        ? await loginWithEmail({ email, password })
        : await registerWithEmail({ email, password, name, role });

      login(session.user, session.accessToken);
      router.push("/profile");
    } catch {
      setErrorMessage("Kirishda muammo bo'ldi. Iltimos, ma'lumotlarni tekshirib qayta urinib ko'ring.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 md:px-24 py-12 relative overflow-y-auto bg-background">
      <Link
        href="/"
        className="absolute top-8 left-6 sm:left-12 flex items-center gap-2 text-muted-foreground hover:text-foreground font-medium text-sm transition-all lg:hidden hover:-translate-x-0.5"
      >
        Bosh sahifaga
      </Link>

      <div className="w-full max-w-md mx-auto mt-12 lg:mt-0 animate-slide-up">
        <div className="mb-8 text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl font-heading font-black mb-3 text-foreground">
            {content.title}
          </h1>
          <p className="text-muted-foreground text-lg">{content.description}</p>
        </div>

        {mode === "register" && <AuthRoleSwitcher role={role} onChange={onRoleChange} />}

        <button className="w-full h-12 md:h-14 rounded-full border-2 border-border/80 bg-background flex items-center justify-center gap-3 font-bold text-foreground hover:bg-muted/50 hover:border-border transition-all active:scale-[0.98] mb-6">
          <GoogleIcon className="w-5 h-5" /> Google orqali davom etish
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="h-[1px] flex-1 bg-border/60" />
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Yoki qo&apos;lda</span>
          <div className="h-[1px] flex-1 bg-border/60" />
        </div>

        {isDemo && mode === "login" && (
          <div className="mb-6 p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-[13px] font-medium leading-relaxed">
            <span className="font-bold flex items-center gap-1.5 mb-1.5">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-[pulse_2s_ease-in-out_infinite]" /> 
              Demo Rejim faol
            </span>
            Kompaniya (Brand) uchun: <span className="font-bold bg-blue-500/20 px-1 rounded">brand@demo.uz</span> (parol: demo1234)<br/>
            Blogerlar uchun: <span className="font-bold bg-blue-500/20 px-1 rounded">bloger@demo.uz</span> (parol: demo1234)
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {mode === "register" && (
            <div className="space-y-1.5 animate-slide-up" style={{ animationDelay: "0.15s" }}>
              <label className="text-sm font-bold ml-1 text-foreground/90">
                {role === "brand" ? "Kompaniya yoki To'liq ism" : "Bloger Ijtimoiy Nomi (Ismingiz)"}
              </label>
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder={role === "brand" ? "Masalan: Texnomart MCHJ" : "Masalan: @alisher_off"}
                className="w-full h-12 md:h-14 px-4 rounded-xl border border-border/80 bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-[15px] text-foreground hover:border-border duration-300"
                required
              />
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-sm font-bold ml-1 text-foreground/90">Elektron pochta</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="name@example.com"
                className="w-full h-12 md:h-14 pl-12 pr-4 rounded-xl border border-border/80 bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-[15px] text-foreground hover:border-border duration-300"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between ml-1">
              <label className="text-sm font-bold text-foreground/90">Parol</label>
              {mode === "login" && (
                <Link href="/recover" className="text-sm font-bold text-primary hover:underline transition-colors">
                  Unutdingizmi?
                </Link>
              )}
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                className="w-full h-12 md:h-14 pl-12 pr-12 rounded-xl border border-border/80 bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-[15px] text-foreground hover:border-border duration-300"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {errorMessage && (
            <div className="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm font-medium text-destructive">
              {errorMessage}
            </div>
          )}

          <button
            disabled={isSubmitting}
            className={cn(
              "w-full h-12 md:h-14 rounded-full bg-primary text-white font-black text-lg transition-all active:scale-95 mt-4 md:mt-8 flex items-center justify-center gap-2",
              isSubmitting ? "opacity-80 cursor-wait" : "hover:scale-[1.02]",
            )}
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              content.submitLabel
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-muted-foreground font-medium text-sm">
          {content.switchPrompt}{" "}
          <button
            type="button"
            onClick={() => {
              setErrorMessage(null);
              onModeChange(mode === "login" ? "register" : "login");
            }}
            className="text-foreground font-bold underline hover:text-primary transition-colors decoration-primary/30 hover:decoration-primary underline-offset-4"
          >
            {content.switchAction}
          </button>
        </div>
      </div>
    </div>
  );
}
