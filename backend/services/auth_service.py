"""Authentication service — real DB-backed register/login with JWT tokens."""

from __future__ import annotations

from datetime import UTC, datetime, timedelta

from fastapi import HTTPException, status
from jose import jwt
from passlib.context import CryptContext
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from config import settings
from models.user import User, UserRole
from schemas.auth import AuthSessionResponse, AuthTokens, LoginRequest, RegisterRequest
from schemas.user import UserSummary

password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Role mapping: brand → BIZNES_EGASI, influencer → INFLUENSER
_ROLE_MAP: dict[str, UserRole] = {
    "brand": UserRole.BIZNES_EGASI,
    "influencer": UserRole.INFLUENSER,
}


class AuthService:
    """Encapsulates auth primitives behind a clean service boundary."""

    # ─── Crypto helpers ───────────────────────────────────────────────────

    def hash_password(self, password: str) -> str:
        return password_context.hash(password)

    def verify_password(self, plain: str, hashed: str) -> bool:
        return password_context.verify(plain, hashed)

    def create_access_token(self, subject: str) -> str:
        expires_at = datetime.now(UTC) + timedelta(
            minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
        )
        return jwt.encode(
            {"sub": subject, "type": "access", "exp": expires_at},
            settings.SECRET_KEY,
            algorithm=settings.ALGORITHM,
        )

    def create_refresh_token(self, subject: str) -> str:
        expires_at = datetime.now(UTC) + timedelta(
            days=settings.REFRESH_TOKEN_EXPIRE_DAYS
        )
        return jwt.encode(
            {"sub": subject, "type": "refresh", "exp": expires_at},
            settings.SECRET_KEY,
            algorithm=settings.ALGORITHM,
        )

    # ─── Public API ───────────────────────────────────────────────────────

    async def register(
        self, db: AsyncSession, payload: RegisterRequest
    ) -> AuthSessionResponse:
        """Create a new account and return a session immediately."""
        # 1. Email unique tekshiruvi
        existing = await db.execute(
            select(User).where(User.email == payload.email)
        )
        if existing.scalar_one_or_none():
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Bu email allaqachon ro'yxatdan o'tgan.",
            )

        # 2. Foydalanuvchini bazaga yozish
        db_role = _ROLE_MAP.get(payload.role, UserRole.INFLUENSER)
        user = User(
            email=payload.email,
            password_hash=self.hash_password(payload.password),
            role=db_role,
            full_name=payload.name,
        )
        db.add(user)
        await db.commit()
        await db.refresh(user)

        return self._build_session(user)

    async def login(
        self, db: AsyncSession, payload: LoginRequest
    ) -> AuthSessionResponse:
        """Authenticate with email + password and return a session."""
        result = await db.execute(
            select(User).where(User.email == payload.email)
        )
        user = result.scalar_one_or_none()

        if not user or not self.verify_password(payload.password, user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Email yoki parol noto'g'ri.",
                headers={"WWW-Authenticate": "Bearer"},
            )

        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Hisob faol emas. Administrator bilan bog'laning.",
            )

        return self._build_session(user)

    # ─── Internal helpers ─────────────────────────────────────────────────

    def _build_session(self, user: User) -> AuthSessionResponse:
        subject = str(user.id)
        tokens = AuthTokens(
            access_token=self.create_access_token(subject),
            refresh_token=self.create_refresh_token(subject),
        )
        summary = UserSummary(
            id=subject,
            email=user.email,
            role=user.role.value,
            name=user.full_name,
            created_at=user.created_at,
            avatar=user.avatar_url,
        )
        return AuthSessionResponse(user=summary, tokens=tokens, is_demo=False)


auth_service = AuthService()
