"""Authentication routes — real DB-backed register/login endpoints."""

from typing import Annotated

from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from database.connection import get_db
from dependencies import get_current_user
from models.user import User
from schemas.auth import AuthSessionResponse, LoginRequest, RegisterRequest
from schemas.user import CurrentUserResponse, UserSummary
from services.auth_service import auth_service

router = APIRouter()


@router.post(
    "/register",
    response_model=AuthSessionResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Yangi hisob yaratish",
)
async def register(
    payload: RegisterRequest,
    db: Annotated[AsyncSession, Depends(get_db)],
) -> AuthSessionResponse:
    """Email, parol va rol asosida yangi foydalanuvchi yaratadi."""
    return await auth_service.register(db, payload)


@router.post(
    "/login",
    response_model=AuthSessionResponse,
    summary="Tizimga kirish",
)
async def login(
    payload: LoginRequest,
    db: Annotated[AsyncSession, Depends(get_db)],
) -> AuthSessionResponse:
    """Email va parol yordamida tizimga kiradi va access token qaytaradi."""
    return await auth_service.login(db, payload)


@router.get(
    "/me",
    response_model=CurrentUserResponse,
    summary="Joriy foydalanuvchi ma'lumotlari",
)
async def get_me(
    current_user: Annotated[User, Depends(get_current_user)],
) -> CurrentUserResponse:
    """JWT token yordamida joriy tizimga kirgan foydalanuvchi ma'lumotlarini qaytaradi."""
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
