import { CheckCircle2, ShieldCheck, Star, type LucideIcon } from "lucide-react";
import type { AuthMode, AuthRole } from "../model/auth.types";

interface AuthFeature {
  icon: LucideIcon;
  text: string;
}

interface AuthHeroContent {
  title: string;
  description: string;
}

interface AuthFormContent {
  title: string;
  description: string;
  submitLabel: string;
  switchPrompt: string;
  switchAction: string;
}

export const authFeatures: AuthFeature[] = [
  { icon: ShieldCheck, text: "Escrow orqali xavfsiz to'lov" },
  { icon: Star, text: "30+ tasdiqlangan bloger" },
  { icon: CheckCircle2, text: "Bepul ro'yxatdan o'tish" },
];

export function getAuthHeroContent(mode: AuthMode, role: AuthRole): AuthHeroContent {
  if (mode === "register" && role === "influencer") {
    return {
      title: "Kattaroq auditoriya. Kuchli daromad.",
      description:
        "Tadbirkorlar sizning mahoratingizga ehtiyoj sezadi. Platformaga ulaning va reklama narxlaringizni o'zingiz belgilang.",
    };
  }

  return {
    title: "Katta nufuzingiz - bitta qadam narida.",
    description:
      "O'zbekistondagi eng nufuzli blogerlar va brendlar bilan ishonchli hamkorlikni xavfsiz tarzda yo'lga qo'ying.",
  };
}

export function getAuthFormContent(mode: AuthMode): AuthFormContent {
  if (mode === "register") {
    return {
      title: "Profil yaratish",
      description: "Platformadan bepul foydalanishni hoziroq boshlang.",
      submitLabel: "Ro'yxatdan o'tish",
      switchPrompt: "Allaqachon ro'yxatdan o'tganmisiz?",
      switchAction: "Tizimga kirish",
    };
  }

  return {
    title: "Xush kelibsiz!",
    description: "Profilingizga kirish uchun malumotlarni kiriting.",
    submitLabel: "Kirish",
    switchPrompt: "Hali akkauntingiz yo'qmi?",
    switchAction: "Yangi yaratish",
  };
}
