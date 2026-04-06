"""
AI service for the Reklamer backend.

Responsibilities:
- Provide channel recommendations for advertisers.
- Perform NLP search over channels and categories.
- Calculate and update quality scores for channels.
- Detect anomalies in channel statistics (e.g., suspected fake followers).
"""

from __future__ import annotations

from typing import Any, Dict, List, Optional


class AIService:
    """Service stub for AI-powered features (to be implemented)."""

    async def get_recommendations(self, user_id: int, limit: int = 10) -> List[Dict[str, Any]]:
        """Return recommended channels for a given user."""
        raise NotImplementedError

    async def nlp_search(self, query: str, limit: int = 20) -> List[Dict[str, Any]]:
        """Perform NLP-based search over channels using a free-form query."""
        raise NotImplementedError

    async def calculate_quality_score(self, channel_id: int) -> float:
        """Calculate quality score for a single channel."""
        raise NotImplementedError

    async def detect_anomalies(self, channel_id: Optional[int] = None) -> List[Dict[str, Any]]:
        """Detect anomalies (e.g., suspicious growth) for one or many channels."""
        raise NotImplementedError

