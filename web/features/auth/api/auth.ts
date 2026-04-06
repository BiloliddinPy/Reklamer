import { api } from "@/services/api";
import type { AuthSession, AuthSessionDto, LoginPayload, RegisterPayload } from "./auth.types";

// ─────────────────────────────────────────────────────────────────
// Role normalization: backend returns DB enum values, frontend
// expects "brand" | "influencer".
// ─────────────────────────────────────────────────────────────────
function normalizeRole(raw: string): "brand" | "influencer" {
  if (raw === "biznes_egasi" || raw === "brand") return "brand";
  return "influencer";
}

function mapAuthSession(dto: AuthSessionDto): AuthSession {
  return {
    user: {
      id: dto.user.id,
      email: dto.user.email,
      role: normalizeRole(dto.user.role as string),
      name: dto.user.name,
      createdAt: dto.user.created_at,
      avatar: dto.user.avatar ?? undefined,
    },
    accessToken: dto.tokens.access_token,
    refreshToken: dto.tokens.refresh_token,
    isDemo: dto.is_demo,
  };
}

export async function loginWithEmail(payload: LoginPayload): Promise<AuthSession> {
  const response = await api.post<AuthSessionDto>("/auth/login", payload);
  return mapAuthSession(response.data);
}

export async function registerWithEmail(payload: RegisterPayload): Promise<AuthSession> {
  const response = await api.post<AuthSessionDto>("/auth/register", payload);
  return mapAuthSession(response.data);
}

export async function fetchCurrentUser(): Promise<AuthSession["user"] | null> {
  try {
    const response = await api.get<{ user: AuthSessionDto["user"] }>("/auth/me");
    const u = response.data.user;
    return {
      id: u.id,
      email: u.email,
      role: normalizeRole(u.role as string),
      name: u.name,
      createdAt: u.created_at,
      avatar: u.avatar ?? undefined,
    };
  } catch {
    return null;
  }
}
