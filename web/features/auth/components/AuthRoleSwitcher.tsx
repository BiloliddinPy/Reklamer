import { Building2, Megaphone } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AuthRole } from "../model/auth.types";

interface AuthRoleSwitcherProps {
  role: AuthRole;
  onChange: (role: AuthRole) => void;
}

export function AuthRoleSwitcher({ role, onChange }: AuthRoleSwitcherProps) {
  return (
    <div
      className="p-1.5 mb-8 bg-muted rounded-2xl flex border border-border/60 animate-scale-in"
      style={{ animationDelay: "0.1s" }}
    >
      <button
        type="button"
        onClick={() => onChange("brand")}
        className={cn(
          "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[15px] font-bold transition-all duration-300",
          role === "brand"
            ? "bg-background text-foreground shadow-sm ring-1 ring-border/50 scale-[1.02]"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        <Building2 className="w-4 h-4" /> Mijoz (Brand)
      </button>
      <button
        type="button"
        onClick={() => onChange("influencer")}
        className={cn(
          "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[15px] font-bold transition-all duration-300",
          role === "influencer"
            ? "bg-primary text-white shadow-sm ring-1 ring-primary/50 scale-[1.02]"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        <Megaphone className="w-4 h-4" /> Men Blogerman
      </button>
    </div>
  );
}
