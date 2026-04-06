"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { AuthCredentialsForm } from "./AuthCredentialsForm";
import { AuthHeroPanel } from "./AuthHeroPanel";
import { buildAuthSearchParams, parseAuthMode, parseAuthRole } from "../model/auth.query";
import type { AuthMode, AuthRole } from "../model/auth.types";

export function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const authMode = parseAuthMode(searchParams);
  const role = parseAuthRole(searchParams);

  const updateAuthQuery = (mode: AuthMode, nextRole: AuthRole) => {
    const query = buildAuthSearchParams(mode, nextRole);
    router.replace(query ? `/login?${query}` : "/login", { scroll: false });
  };

  return (
    <div className="min-h-screen bg-background flex z-50 relative">
      <AuthHeroPanel mode={authMode} role={role} />
      <AuthCredentialsForm
        mode={authMode}
        role={role}
        onModeChange={(mode) => updateAuthQuery(mode, role)}
        onRoleChange={(nextRole) => updateAuthQuery(authMode, nextRole)}
      />
    </div>
  );
}
