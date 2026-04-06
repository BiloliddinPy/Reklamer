"""User model — base account for all roles (biznes_egasi, influenser, admin)."""

from __future__ import annotations

from datetime import datetime
from enum import Enum
from typing import List, Optional

from sqlalchemy import Boolean, DateTime, Enum as SqlEnum, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database.connection import Base


class UserRole(str, Enum):
    BIZNES_EGASI = "biznes_egasi"
    INFLUENSER = "influenser"
    ADMIN = "admin"


class User(Base):
    """Platform user (business owner, influencer, or admin)."""

    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False, index=True)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[UserRole] = mapped_column(SqlEnum(UserRole, name="user_role"), nullable=False)
    full_name: Mapped[str] = mapped_column(String(255), nullable=False)
    username: Mapped[Optional[str]] = mapped_column(String(255), unique=True, nullable=True, index=True)
    avatar_url: Mapped[Optional[str]] = mapped_column(String(512), nullable=True)
    phone: Mapped[Optional[str]] = mapped_column(String(32), nullable=True)
    language: Mapped[str] = mapped_column(String(5), nullable=False, default="uz")  # uz | ru
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)
    is_email_verified: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    last_seen: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow, nullable=False)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False,
    )

    advertiser_profile: Mapped[Optional["AdvertiserProfile"]] = relationship(
        back_populates="user",
        uselist=False,
        cascade="all, delete-orphan",
    )
    influencer_profile: Mapped[Optional["InfluencerProfile"]] = relationship(
        back_populates="user",
        uselist=False,
        cascade="all, delete-orphan",
    )
    briefs: Mapped[List["Brief"]] = relationship(
        back_populates="advertiser",
        foreign_keys="Brief.advertiser_id",
    )
    campaigns_as_advertiser: Mapped[List["Campaign"]] = relationship(
        back_populates="advertiser",
        foreign_keys="Campaign.advertiser_id",
    )
    campaigns_as_influencer: Mapped[List["Campaign"]] = relationship(
        back_populates="influencer",
        foreign_keys="Campaign.influencer_id",
    )
    transactions_sent: Mapped[List["Transaction"]] = relationship(
        back_populates="from_user",
        foreign_keys="Transaction.from_user_id",
    )
    transactions_received: Mapped[List["Transaction"]] = relationship(
        back_populates="to_user",
        foreign_keys="Transaction.to_user_id",
    )
    notifications: Mapped[List["Notification"]] = relationship(
        back_populates="user",
        cascade="all, delete-orphan",
    )

    def __repr__(self) -> str:
        return f"<User id={self.id!r} email={self.email!r} role={self.role!r}>"
