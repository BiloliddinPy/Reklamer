"""User-facing account schemas shared across auth and profile endpoints."""

from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr


class UserSummary(BaseModel):
    """Canonical API representation of the authenticated user."""

    model_config = ConfigDict(from_attributes=True)

    id: str
    email: EmailStr
    role: str
    name: str
    created_at: datetime
    avatar: str | None = None


class CurrentUserResponse(BaseModel):
    """Response envelope for account introspection."""

    model_config = ConfigDict(from_attributes=True)

    user: UserSummary
