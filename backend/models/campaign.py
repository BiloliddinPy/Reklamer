"""Campaign model — deal between advertiser and influencer."""

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
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database.connection import Base


class CampaignStatus(str, Enum):
    OFFERED = "offered"
    NEGOTIATING = "negotiating"
    ACCEPTED = "accepted"
    ESCROW_PENDING = "escrow_pending"
    IN_PROGRESS = "in_progress"
    PREVIEW_SUBMITTED = "preview_submitted"
    REVISION_REQUESTED = "revision_requested"
    APPROVED = "approved"
    PUBLISHED = "published"
    COMPLETED = "completed"
    CANCELLED = "cancelled"
    DISPUTED = "disputed"


class EscrowStatus(str, Enum):
    NONE = "none"
    PENDING = "pending"
    HELD = "held"
    RELEASED = "released"
    REFUNDED = "refunded"


class Campaign(Base):
    """Campaign (order) between advertiser and influencer with escrow flow."""

    __tablename__ = "campaigns"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    advertiser_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    influencer_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    brief_id: Mapped[Optional[int]] = mapped_column(ForeignKey("briefs.id", ondelete="SET NULL"), nullable=True, index=True)
    format_id: Mapped[int] = mapped_column(ForeignKey("content_formats.id", ondelete="RESTRICT"), nullable=False, index=True)
    platform: Mapped[str] = mapped_column(String(32), nullable=False)

    agreed_price_usd: Mapped[Decimal] = mapped_column(Numeric(12, 2), nullable=False)
    platform_fee_pct: Mapped[Decimal] = mapped_column(Numeric(5, 2), nullable=False, default=Decimal("5.00"))
    platform_fee_usd: Mapped[Optional[Decimal]] = mapped_column(Numeric(12, 2), nullable=True)
    influencer_payout_usd: Mapped[Optional[Decimal]] = mapped_column(Numeric(12, 2), nullable=True)

    content_brief: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    content_deadline: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    post_url: Mapped[Optional[str]] = mapped_column(String(512), nullable=True)
    preview_url: Mapped[Optional[str]] = mapped_column(String(512), nullable=True)
    revision_count: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    max_revisions: Mapped[int] = mapped_column(Integer, nullable=False, default=2)

    status: Mapped[CampaignStatus] = mapped_column(
        SqlEnum(CampaignStatus, name="campaign_status"),
        nullable=False,
        default=CampaignStatus.OFFERED,
    )
    escrow_status: Mapped[EscrowStatus] = mapped_column(
        SqlEnum(EscrowStatus, name="escrow_status"),
        nullable=False,
        default=EscrowStatus.NONE,
    )

    offer_expires_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    escrow_held_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    completed_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    advertiser_agreed: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    influencer_agreed: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow, nullable=False)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False,
    )

    advertiser: Mapped["User"] = relationship(back_populates="campaigns_as_advertiser", foreign_keys=[advertiser_id])
    influencer: Mapped["User"] = relationship(back_populates="campaigns_as_influencer", foreign_keys=[influencer_id])
    chat: Mapped[Optional["Chat"]] = relationship(back_populates="campaign", uselist=False)
    escrow_transactions: Mapped[List["EscrowTransaction"]] = relationship(
        back_populates="campaign",
        cascade="all, delete-orphan",
    )
    reviews: Mapped[List["Review"]] = relationship(back_populates="campaign", cascade="all, delete-orphan")

    def __repr__(self) -> str:
        return f"<Campaign id={self.id!r} status={self.status!r}>"
