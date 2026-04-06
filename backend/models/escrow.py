"""Escrow transaction — payment hold and release for campaigns."""

from __future__ import annotations

from datetime import datetime
from decimal import Decimal
from enum import Enum
from typing import Optional

from sqlalchemy import DateTime, Enum as SqlEnum, ForeignKey, Integer, Numeric, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database.connection import Base


class EscrowTransactionStatus(str, Enum):
    PENDING = "pending"
    HELD = "held"
    RELEASED = "released"
    REFUNDED = "refunded"


class EscrowTransaction(Base):
    """Escrow record for a campaign payment."""

    __tablename__ = "escrow_transactions"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    campaign_id: Mapped[int] = mapped_column(ForeignKey("campaigns.id", ondelete="CASCADE"), nullable=False, index=True)
    advertiser_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    influencer_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    amount_usd: Mapped[Decimal] = mapped_column(Numeric(12, 2), nullable=False)
    platform_fee_usd: Mapped[Decimal] = mapped_column(Numeric(12, 2), nullable=False)
    influencer_amount_usd: Mapped[Decimal] = mapped_column(Numeric(12, 2), nullable=False)
    status: Mapped[EscrowTransactionStatus] = mapped_column(
        SqlEnum(EscrowTransactionStatus, name="escrow_transaction_status"),
        nullable=False,
        default=EscrowTransactionStatus.PENDING,
    )
    payment_method: Mapped[Optional[str]] = mapped_column(String(64), nullable=True)
    payment_ref: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    held_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    released_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    refunded_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow, nullable=False)

    campaign: Mapped["Campaign"] = relationship(back_populates="escrow_transactions")

    def __repr__(self) -> str:
        return f"<EscrowTransaction id={self.id!r} campaign_id={self.campaign_id!r} status={self.status!r}>"
