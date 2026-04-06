"""User profile routes built on top of the auth dependency boundary."""

from typing import Annotated

from fastapi import APIRouter, Depends

from dependencies import get_current_user
from models.user import User
from schemas.user import CurrentUserResponse, UserSummary

router = APIRouter()


@router.get("/me", response_model=CurrentUserResponse)
async def get_me(
    current_user: Annotated[User, Depends(get_current_user)],
) -> CurrentUserResponse:
    """Return the authenticated account using the public user contract."""
    return CurrentUserResponse(
        user=UserSummary(
            id=str(current_user.id),
            email=current_user.email,
            role=current_user.role.value,
            name=current_user.full_name,
            created_at=current_user.created_at,
            avatar=current_user.avatar_url,
        )
    )
