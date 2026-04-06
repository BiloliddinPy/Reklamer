"""Content format — post, story, reels, video per platform."""

from __future__ import annotations

from sqlalchemy import Boolean, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from database.connection import Base


class ContentFormat(Base):
    """Content format (post, story, reels, video) with platform and i18n names."""

    __tablename__ = "content_formats"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    platform: Mapped[str] = mapped_column(String(32), nullable=False, index=True)
    name_uz: Mapped[str] = mapped_column(String(100), nullable=False)
    name_ru: Mapped[str] = mapped_column(String(100), nullable=False)
    description_uz: Mapped[str] = mapped_column(Text, nullable=False)
    duration_info: Mapped[str] = mapped_column(String(100), nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)

    def __repr__(self) -> str:
        return f"<ContentFormat id={self.id!r} platform={self.platform!r}>"
