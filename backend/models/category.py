"""Category model — influencer/content categories."""

from __future__ import annotations

from typing import List

from sqlalchemy import Boolean, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database.connection import Base


class Category(Base):
    """Category for influencers (lifestyle, business, education, etc.)."""

    __tablename__ = "categories"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    slug: Mapped[str] = mapped_column(String(100), unique=True, nullable=False, index=True)
    name_uz: Mapped[str] = mapped_column(String(255), nullable=False)
    name_ru: Mapped[str] = mapped_column(String(255), nullable=False)
    emoji: Mapped[str] = mapped_column(String(10), nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)
    sort_order: Mapped[int] = mapped_column(Integer, nullable=False, default=0)

    influencer_profiles: Mapped[List["InfluencerProfile"]] = relationship(
        back_populates="category",
    )
    briefs: Mapped[List["Brief"]] = relationship(back_populates="category")

    def __repr__(self) -> str:
        return f"<Category id={self.id!r} slug={self.slug!r}>"
