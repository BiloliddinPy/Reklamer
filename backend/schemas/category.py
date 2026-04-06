"""Catalog response contracts used by public listing endpoints."""

from __future__ import annotations

from pydantic import BaseModel, ConfigDict, Field

from schemas.common import PaginationMeta


class CategoryItem(BaseModel):
    """Public category DTO for frontend filters."""

    model_config = ConfigDict(from_attributes=True)

    id: str
    label: str
    image: str


class PlatformItem(BaseModel):
    """Public platform DTO for frontend filters."""

    model_config = ConfigDict(from_attributes=True)

    id: str
    label: str


class InfluencerListItem(BaseModel):
    """Public influencer card contract used by catalog and landing pages."""

    model_config = ConfigDict(from_attributes=True)

    id: str
    name: str
    handle: str
    platform: str
    category: str
    followers: int = Field(ge=0)
    rating: float = Field(ge=0, le=5)
    price: int = Field(ge=0)
    image_url: str
    is_top: bool = False
    location: str | None = None
    bio: str | None = None
    engagement_rate: float | None = None


class InfluencerCatalogResponse(BaseModel):
    """Paginated public influencer collection."""

    model_config = ConfigDict(from_attributes=True)

    items: list[InfluencerListItem]
    meta: PaginationMeta


class CategoryListResponse(BaseModel):
    """Category collection wrapper."""

    model_config = ConfigDict(from_attributes=True)

    items: list[CategoryItem]


class PlatformListResponse(BaseModel):
    """Platform collection wrapper."""

    model_config = ConfigDict(from_attributes=True)

    items: list[PlatformItem]
