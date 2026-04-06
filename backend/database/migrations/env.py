from __future__ import annotations

from logging.config import fileConfig
from typing import Any, Dict

from alembic import context
from sqlalchemy import pool
from sqlalchemy.engine import Connection
from sqlalchemy.ext.asyncio import async_engine_from_config

from config import settings
from database.connection import Base
from models import *  # noqa: F401,F403  # ensure models are imported

# this is the Alembic Config object, which provides
# access to the values within the .ini file in use.
config = context.config

if config.config_file_name is not None:
    fileConfig(config.config_file_name)

target_metadata = Base.metadata


def get_url() -> str:
    """Return database URL for Alembic."""
    return settings.DATABASE_URL


def run_migrations_offline() -> None:
    """Run migrations in 'offline' mode."""
    url = get_url()
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    """Run migrations in 'online' mode (async engine, sync migration run via run_sync)."""
    configuration: Dict[str, Any] = config.get_section(config.config_ini_section) or {}
    configuration["sqlalchemy.url"] = get_url()

    connectable = async_engine_from_config(
        configuration,
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    def do_run_migrations(connection: Connection) -> None:
        context.configure(connection=connection, target_metadata=target_metadata)
        with context.begin_transaction():
            context.run_migrations()

    async def run_with_connectable() -> None:
        async with connectable.connect() as connection:
            await connection.run_sync(do_run_migrations)

    import asyncio

    asyncio.run(run_with_connectable())


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()

