"""
CSV importer service for the Reklamer backend.

Responsibilities:
- Import channels in bulk from CSV files.
- Validate input data and map it to channel fields.
- Log and report validation errors without stopping the whole import.
"""

from __future__ import annotations

from typing import Any, Dict, Iterable, List


class CSVImporterService:
    """Service stub for bulk channel import from CSV (to be implemented)."""

    async def import_channels(self, rows: Iterable[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Import channels from an iterable of CSV rows and return a summary."""
        raise NotImplementedError

