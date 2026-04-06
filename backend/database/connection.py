from collections.abc import AsyncGenerator

from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase

from config import settings


class Base(DeclarativeBase):
    """Base class for all SQLAlchemy models."""

    pass


engine = create_async_engine(
    settings.DATABASE_URL,
    echo=settings.DEBUG,
    pool_size=10,
    max_overflow=20,
    pool_pre_ping=True,
)

AsyncSessionLocal = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
)


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """FastAPI dependency that provides an async SQLAlchemy session."""
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()


async def create_all_tables() -> None:
    """
    Create all database tables.

    This is intended for development and initial bootstrap only.
    In production, Alembic migrations should manage schema changes.
    """
    # Import models so that they are registered with SQLAlchemy metadata
    from models import (  # noqa: F401
        user,
        advertiser,
        category,
        influencer,
        content_format,
        brief,
        campaign,
        chat,
        escrow,
        review,
        notification,
        transaction,
    )

    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

