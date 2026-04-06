"""Influencer profile — creator/channel extended profile."""

from __future__ import annotations

from datetime import datetime
from decimal import Decimal
from enum import Enum
from typing import List, Optional

from sqlalchemy import (
    Boolean,
    DateTime,
    Enum as SqlEnum,
    ForeignKey,
    Integer,
    Numeric,
    String,
    Text,
)
from sqlalchemy.dialects.postgresql import ARRAY, JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database.connection import Base


class InfluencerPlatform(str, Enum):
    INSTAGRAM = "instagram"
    TELEGRAM = "telegram"
    YOUTUBE = "youtube"
    TIKTOK = "tiktok"


class InfluencerStatus(str, Enum):
    PENDING = "pending"
    ACTIVE = "active"
    SUSPENDED = "suspended"


class InfluencerProfile(Base):
    """Influencer profile linked to a user (platform, stats, prices in USD)."""

    __tablename__ = "influencer_profiles"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False, index=True)
    platform: Mapped[InfluencerPlatform] = mapped_column(
        SqlEnum(InfluencerPlatform, name="influencer_platform"),
        nullable=False,
    )
    handle: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    profile_url: Mapped[Optional[str]] = mapped_column(String(512), nullable=True)
    category_id: Mapped[Optional[int]] = mapped_column(ForeignKey("categories.id", ondelete="SET NULL"), nullable=True, index=True)
    bio: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    followers_count: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    avg_views: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    er_percent: Mapped[Decimal] = mapped_column(Numeric(5, 2), nullable=False, default=Decimal("0.00"))

    price_post: Mapped[Optional[Decimal]] = mapped_column(Numeric(12, 2), nullable=True)
    price_story: Mapped[Optional[Decimal]] = mapped_column(Numeric(12, 2), nullable=True)
    price_reels: Mapped[Optional[Decimal]] = mapped_column(Numeric(12, 2), nullable=True)
    price_video: Mapped[Optional[Decimal]] = mapped_column(Numeric(12, 2), nullable=True)
    price_30d_avg: Mapped[Optional[Decimal]] = mapped_column(Numeric(12, 2), nullable=True)

    audience_geo: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    audience_age: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    platform_data: Mapped[Optional[dict]] = mapped_column(JSONB, nullable=True)
    rejected_niches: Mapped[Optional[list]] = mapped_column(ARRAY(Text), nullable=True)

    is_verified: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    is_premium: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    is_visible: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)
    quality_score: Mapped[Decimal] = mapped_column(Numeric(4, 2), nullable=False, default=Decimal("0.00"))
    status: Mapped[InfluencerStatus] = mapped_column(
        SqlEnum(InfluencerStatus, name="influencer_status"),
        nullable=False,
        default=InfluencerStatus.PENDING,
    )
    total_campaigns: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    rating: Mapped[Optional[Decimal]] = mapped_column(Numeric(3, 2), nullable=True)

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow, nullable=False)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False,
    )

    user: Mapped["User"] = relationship(back_populates="influencer_profile")
    category: Mapped[Optional["Category"]] = relationship(back_populates="influencer_profiles")

    def __repr__(self) -> str:
        return f"<InfluencerProfile id={self.id!r} platform={self.platform!r} handle={self.handle!r}>"
