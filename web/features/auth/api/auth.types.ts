import type { Role, User } from "@/types";

export interface AuthSessionDto {
  user: {
    id: string;
    email: string;
    role: Role;
    name: string;
    created_at: string;
    avatar?: string | null;
  };
  tokens: {
    access_token: string;
    refresh_token: string;
    token_type: string;
  };
  is_demo: boolean;
}

export interface AuthSession {
  user: User;
  accessToken: string;
  refreshToken: string;
  isDemo: boolean;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload extends LoginPayload {
  name: string;
  role: "brand" | "influencer";
}
