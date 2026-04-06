from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import settings
from database.connection import create_all_tables
from routers import (
    auth,
    users,
    influencers,
    advertisers,
    catalog,
    campaigns,
    chat,
    escrow,
    reviews,
    notifications,
    uploads,
    admin,
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan context."""
    await create_all_tables()
    yield


app = FastAPI(
    title="Reklamer API",
    version=settings.APP_VERSION,
    description="Open advertising marketplace for Uzbekistan",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL, "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(users.router, prefix="/api/v1/users", tags=["users"])
app.include_router(influencers.router, prefix="/api/v1/influencers", tags=["influencers"])
app.include_router(advertisers.router, prefix="/api/v1/advertisers", tags=["advertisers"])
app.include_router(catalog.router, prefix="/api/v1/catalog", tags=["catalog"])
app.include_router(campaigns.router, prefix="/api/v1/campaigns", tags=["campaigns"])
app.include_router(chat.router, prefix="/api/v1/chats", tags=["chat"])
app.include_router(escrow.router, prefix="/api/v1/escrow", tags=["escrow"])
app.include_router(reviews.router, prefix="/api/v1/reviews", tags=["reviews"])
app.include_router(notifications.router, prefix="/api/v1/notifications", tags=["notifications"])
app.include_router(uploads.router, prefix="/api/v1/uploads", tags=["uploads"])
app.include_router(admin.router, prefix="/api/v1/admin", tags=["admin"])


@app.get("/health")
async def health_check() -> dict[str, str]:
    """Lightweight health check endpoint."""
    return {"status": "ok"}


@app.get("/")
async def root() -> dict[str, str]:
    """Root endpoint describing the API."""
    return {"name": settings.APP_NAME, "version": settings.APP_VERSION}
