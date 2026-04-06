"""
Scheduler service for the Reklamer backend.

Responsibilities:
- Configure and manage APScheduler jobs.
- Run weekly channel statistics synchronization.
- Periodically check and update sponsored_until expirations.
"""

from __future__ import annotations

from typing import Awaitable, Callable


class SchedulerService:
    """Service stub for background scheduling (to be implemented)."""

    def __init__(self) -> None:
        """Initialize scheduler and job configuration."""
        raise NotImplementedError

    async def start(self) -> None:
        """Start the scheduler and all configured jobs."""
        raise NotImplementedError

    async def shutdown(self) -> None:
        """Gracefully stop the scheduler."""
        raise NotImplementedError

    async def add_weekly_channel_update_job(self, func: Callable[[], Awaitable[None]]) -> None:
        """Register a weekly job that updates all channel statistics."""
        raise NotImplementedError

    async def add_sponsored_expiry_check_job(self, func: Callable[[], Awaitable[None]]) -> None:
        """Register a periodic job that checks and updates sponsored_until expirations."""
        raise NotImplementedError

