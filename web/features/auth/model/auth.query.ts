import type { ReadonlyURLSearchParams } from "next/navigation";
import type { AuthMode, AuthRole } from "./auth.types";

export function parseAuthMode(searchParams: ReadonlyURLSearchParams | null): AuthMode {
  return searchParams?.get("mode") === "register" ? "register" : "login";
}

export function parseAuthRole(searchParams: ReadonlyURLSearchParams | null): AuthRole {
  return searchParams?.get("role") === "influencer" ? "influencer" : "brand";
}

export function buildAuthSearchParams(mode: AuthMode, role: AuthRole) {
  const params = new URLSearchParams();
  params.set("mode", mode);

  if (mode === "register") {
    params.set("role", role);
  }

  return params.toString();
}
