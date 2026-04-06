"""Advertiser profile — business owner extended profile."""

from __future__ import annotations

from datetime import datetime
from typing import Optional

from sqlalchemy import DateTime, ForeignKey, Integer, String, Boolean, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database.connection import Base


class AdvertiserProfile(Base):
    """Business owner profile linked to a user."""

    __tablename__ = "advertiser_profiles"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False, index=True)
    business_name: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    business_type: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    website: Mapped[Optional[str]] = mapped_column(String(512), nullable=True)
    instagram_url: Mapped[Optional[str]] = mapped_column(String(512), nullable=True)
    logo_url: Mapped[Optional[str]] = mapped_column(String(512), nullable=True)
    is_onboarded: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow, nullable=False)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False,
    )

    user: Mapped["User"] = relationship(back_populates="advertiser_profile")

    def __repr__(self) -> str:
        return f"<AdvertiserProfile id={self.id!r} user_id={self.user_id!r}>"
