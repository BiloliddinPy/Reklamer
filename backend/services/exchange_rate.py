"""
Exchange rate service for the Reklamer backend.

Responsibilities:
- Integrate with the Central Bank of Uzbekistan (CBU) API.
- Fetch the daily USD/UZS exchange rate.
- Cache results in Redis to minimize external calls.
"""

from __future__ import annotations

from decimal import Decimal
from typing import Optional


class ExchangeRateService:
    """Service stub for currency exchange rates (to be implemented)."""

    async def get_usd_to_uzs_rate(self, force_refresh: bool = False) -> Optional[Decimal]:
        """Return the current USD to UZS exchange rate."""
        raise NotImplementedError

