"""Authentication request and response contracts."""

from __future__ import annotations

from pydantic import BaseModel, ConfigDict, EmailStr, Field

from schemas.user import UserSummary


class RegisterRequest(BaseModel):
    """Contract for creating a new account."""

    model_config = ConfigDict(str_strip_whitespace=True)

    email: EmailStr
    password: str = Field(min_length=8, max_length=128)
    role: str = Field(pattern="^(brand|influencer)$")
    name: str = Field(min_length=2, max_length=255)


class LoginRequest(BaseModel):
    """Contract for email/password authentication."""

    model_config = ConfigDict(str_strip_whitespace=True)

    email: EmailStr
    password: str = Field(min_length=8, max_length=128)


class AuthTokens(BaseModel):
    """Pair of access and refresh tokens."""

    model_config = ConfigDict(from_attributes=True)

    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class AuthSessionResponse(BaseModel):
    """Session payload returned from login and registration."""

    model_config = ConfigDict(from_attributes=True)

    user: UserSummary
    tokens: AuthTokens
    is_demo: bool = False
