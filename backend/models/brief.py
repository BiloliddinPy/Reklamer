"""Brief model — advertiser's campaign brief for influencers to apply."""

from __future__ import annotations

from datetime import datetime
from decimal import Decimal
from typing import Optional

from sqlalchemy import DateTime, ForeignKey, Integer, Numeric, String, Text, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database.connection import Base


class Brief(Base):
    """Advertiser brief (platform, category, budget, goal) for matching influencers."""

    __tablename__ = "briefs"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    advertiser_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    platform: Mapped[str] = mapped_column(String(32), nullable=False)
    category_id: Mapped[Optional[int]] = mapped_column(ForeignKey("categories.id", ondelete="SET NULL"), nullable=True, index=True)
    budget_min_usd: Mapped[Decimal] = mapped_column(Numeric(12, 2), nullable=False)
    budget_max_usd: Mapped[Decimal] = mapped_column(Numeric(12, 2), nullable=False)
    target_audience: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    additional_info: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)
    expires_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow, nullable=False)

    advertiser: Mapped["User"] = relationship(back_populates="briefs", foreign_keys=[advertiser_id])
    category: Mapped[Optional["Category"]] = relationship(back_populates="briefs")

    def __repr__(self) -> str:
        return f"<Brief id={self.id!r} title={self.title!r}>"
