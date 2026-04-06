"""Transaction model — generic money movement between users."""

from __future__ import annotations

from datetime import datetime
from decimal import Decimal
from enum import Enum
from typing import Optional

from sqlalchemy import DateTime, Enum as SqlEnum, ForeignKey, Integer, Numeric, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database.connection import Base


class TransactionType(str, Enum):
    DEPOSIT = "deposit"
    WITHDRAWAL = "withdrawal"
    COMMISSION = "commission"
    ESCROW = "escrow"
    FEATURED = "featured"


class TransactionStatus(str, Enum):
    PENDING = "pending"
    COMPLETED = "completed"
    REFUNDED = "refunded"


class Transaction(Base):
    """Financial transaction between users (amount in USD)."""

    __tablename__ = "transactions"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    from_user_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey("users.id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )
    to_user_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey("users.id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )
    amount_usd: Mapped[Decimal] = mapped_column(Numeric(12, 2), nullable=False)
    type: Mapped[TransactionType] = mapped_column(
        SqlEnum(TransactionType, name="transaction_type"),
        nullable=False,
    )
    status: Mapped[TransactionStatus] = mapped_column(
        SqlEnum(TransactionStatus, name="transaction_status"),
        nullable=False,
        default=TransactionStatus.PENDING,
    )
    description: Mapped[Optional[str]] = mapped_column(String(512), nullable=True)
    reference: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow, nullable=False)

    from_user: Mapped[Optional["User"]] = relationship(
        back_populates="transactions_sent",
        foreign_keys=[from_user_id],
    )
    to_user: Mapped[Optional["User"]] = relationship(
        back_populates="transactions_received",
        foreign_keys=[to_user_id],
    )

    def __repr__(self) -> str:
        return f"<Transaction id={self.id!r} amount_usd={self.amount_usd!r} type={self.type!r}>"
