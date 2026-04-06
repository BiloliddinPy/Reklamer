import Link from "next/link";
import type { AuthMode, AuthRole } from "../model/auth.types";
import { authFeatures, getAuthHeroContent } from "../lib/auth-content";

export function AuthHeroPanel({ mode, role }: { mode: AuthMode; role: AuthRole }) {
  const content = getAuthHeroContent(mode, role);

  return (
    <div className="hidden lg:flex w-1/2 bg-foreground text-background relative overflow-hidden flex-col justify-between p-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_50%)]" />
      <div className="absolute -bottom-40 -left-20 w-96 h-96 bg-primary/40 blur-[80px] rounded-full mix-blend-screen animate-pulse-glow" />
      <div
        className="absolute top-20 right-10 w-64 h-64 bg-blue-500/10 blur-[60px] rounded-full mix-blend-screen animate-pulse-glow"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative z-10">
        <Link href="/" className="flex items-center gap-2 outline-none w-fit group">
          <div className="bg-primary text-primary-foreground p-1.5 rounded-xl shadow-[0_4px_15px_rgba(232,68,10,0.3)] group-hover:scale-110 transition-transform">
            <span className="font-heading font-black text-xl leading-none block">R.</span>
          </div>
          <span className="font-heading font-black text-2xl tracking-tight">Reklamer</span>
        </Link>
      </div>

      <div className="relative z-10 max-w-md mt-10 animate-slide-up">
        <h2 className="text-4xl lg:text-5xl font-heading font-black tracking-tight mb-6 leading-[1.1] text-transparent bg-clip-text bg-gradient-to-br from-white to-primary/80">
          {content.title}
        </h2>
        <p className="text-xl text-zinc-400 font-medium">{content.description}</p>

        <div className="mt-10 space-y-4">
          {authFeatures.map((feature, index) => (
            <div
              key={feature.text}
              className="flex items-center gap-3 text-zinc-400 animate-slide-up"
              style={{ animationDelay: `${0.3 + index * 0.15}s` }}
            >
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                <feature.icon className="w-4 h-4 text-primary" />
              </div>
              <span className="font-medium">{feature.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 flex items-center gap-4 text-zinc-500 font-medium text-sm">
        <span>© {new Date().getFullYear()} Reklamer dasturi</span>
      </div>
    </div>
  );
}
