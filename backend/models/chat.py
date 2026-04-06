"""Chat and Message models — campaign conversation."""

from __future__ import annotations

from datetime import datetime
from enum import Enum
from typing import List, Optional

from sqlalchemy import Boolean, DateTime, Enum as SqlEnum, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database.connection import Base


class MessageType(str, Enum):
    TEXT = "text"
    FILE = "file"
    SYSTEM = "system"


class Chat(Base):
    """One chat per campaign between advertiser and influencer."""

    __tablename__ = "chats"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    campaign_id: Mapped[int] = mapped_column(
        ForeignKey("campaigns.id", ondelete="CASCADE"),
        unique=True,
        nullable=False,
        index=True,
    )
    advertiser_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    influencer_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    is_phone_shared: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow, nullable=False)
    last_message_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)

    campaign: Mapped["Campaign"] = relationship(back_populates="chat")
    messages: Mapped[List["Message"]] = relationship(
        back_populates="chat",
        cascade="all, delete-orphan",
    )

    def __repr__(self) -> str:
        return f"<Chat id={self.id!r} campaign_id={self.campaign_id!r}>"


class Message(Base):
    """Single message in a chat."""

    __tablename__ = "messages"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    chat_id: Mapped[int] = mapped_column(ForeignKey("chats.id", ondelete="CASCADE"), nullable=False, index=True)
    sender_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    content: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    file_url: Mapped[Optional[str]] = mapped_column(String(512), nullable=True)
    file_type: Mapped[Optional[str]] = mapped_column(String(64), nullable=True)
    message_type: Mapped[MessageType] = mapped_column(
        SqlEnum(MessageType, name="message_type"),
        nullable=False,
        default=MessageType.TEXT,
    )
    is_read: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow, nullable=False)

    chat: Mapped["Chat"] = relationship(back_populates="messages")

    def __repr__(self) -> str:
        return f"<Message id={self.id!r} chat_id={self.chat_id!r}>"
