"""
Parser service for the Reklamer backend.

Responsibilities:
- Integrate with TGStat (and similar services) to fetch channel statistics.
- Periodically sync subscriber, views, and engagement data for channels.
- Help detect fake followers and suspicious activity patterns.
"""

from __future__ import annotations

from typing import Any, Dict, List


class ParserService:
    """Service stub for external stats parsing and sync (to be implemented)."""

    async def fetch_channel_stats(self, platform: str, handle: str) -> Dict[str, Any]:
        """Fetch latest statistics for a single channel from an external service."""
        raise NotImplementedError

    async def sync_all_channels(self) -> List[Dict[str, Any]]:
        """Sync statistics for all tracked channels."""
        raise NotImplementedError

    async def detect_fake_followers(self, channel_id: int) -> Dict[str, Any]:
        """Return indicators related to potential fake followers for a channel."""
        raise NotImplementedError

