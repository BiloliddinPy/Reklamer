"""
Tracking service for the Reklamer backend.

Responsibilities:
- Create tracking links for channel contact actions.
- Record tracking events (click, contact_view, saved, compared).
- Provide click statistics and aggregated tracking metrics.
"""

from __future__ import annotations

from typing import Any, Dict, List


class TrackingService:
    """Service stub for tracking links and events (to be implemented)."""

    async def create_tracking_link(self, user_id: int, channel_id: int, source: str) -> Dict[str, Any]:
        """Create and return a new tracking link for the specified user and channel."""
        raise NotImplementedError

    async def record_event(self, link_id: int, event_type: str, ip_hash: str | None = None) -> None:
        """Record a tracking event for the given link."""
        raise NotImplementedError

    async def get_click_stats(self, channel_id: int) -> List[Dict[str, Any]]:
        """Return basic click and event statistics for a given channel."""
        raise NotImplementedError

