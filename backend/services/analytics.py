"""
Analytics service for the Reklamer backend.

Responsibilities:
- Calculate CPM and related performance metrics.
- Aggregate channel statistics for dashboards.
- Provide summary metrics for admin and advertiser views.
"""

from __future__ import annotations

from decimal import Decimal
from typing import Any, Dict, List


class AnalyticsService:
    """Service stub for CPM calculation and stats aggregation (to be implemented)."""

    async def calculate_cpm(self, price_usd: Decimal, avg_views: int) -> Decimal:
        """Calculate CPM value based on price in USD and average views."""
        raise NotImplementedError

    async def channel_summary(self, channel_id: int) -> Dict[str, Any]:
        """Return aggregated statistics for a single channel."""
        raise NotImplementedError

    async def dashboard_metrics(self) -> Dict[str, Any]:
        """Return high-level metrics for admin dashboards."""
        raise NotImplementedError

