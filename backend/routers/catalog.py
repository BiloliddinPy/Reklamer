"""Public catalog routes for filters and influencer discovery."""

from typing import Annotated

from fastapi import APIRouter, Query

from schemas.category import CategoryListResponse, InfluencerCatalogResponse, PlatformListResponse
from services.catalog_service import catalog_service

router = APIRouter()


@router.get("/categories", response_model=CategoryListResponse)
async def list_categories() -> CategoryListResponse:
    """Return frontend-ready category filter options."""
    return catalog_service.list_categories()


@router.get("/platforms", response_model=PlatformListResponse)
async def list_platforms() -> PlatformListResponse:
    """Return frontend-ready platform filter options."""
    return catalog_service.list_platforms()


@router.get("/influencers", response_model=InfluencerCatalogResponse)
async def list_influencers(
    platform: Annotated[str | None, Query()] = None,
    category: Annotated[str | None, Query()] = None,
    query: Annotated[str | None, Query(min_length=1, max_length=100)] = None,
    only_top: Annotated[bool, Query()] = False,
    limit: Annotated[int, Query(ge=1, le=100)] = 24,
    offset: Annotated[int, Query(ge=0)] = 0,
) -> InfluencerCatalogResponse:
    """Return public influencer cards for catalog and landing flows."""
    return catalog_service.list_influencers(
        platform=platform,
        category=category,
        query=query,
        only_top=only_top,
        limit=limit,
        offset=offset,
    )
