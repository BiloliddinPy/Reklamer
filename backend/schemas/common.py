"""Shared response primitives for API contracts."""

from pydantic import BaseModel, ConfigDict


class ApiMessage(BaseModel):
    """Simple message envelope for non-resource responses."""

    model_config = ConfigDict(from_attributes=True)

    message: str


class PaginationMeta(BaseModel):
    """Metadata describing a paginated collection."""

    model_config = ConfigDict(from_attributes=True)

    total: int
    limit: int
    offset: int
