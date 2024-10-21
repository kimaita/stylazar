"""api server module"""

from fastapi import APIRouter
from .v1.routes import users


api_router = APIRouter(prefix="/api/v1")

api_router.include_router(users.router)


@api_router.get("/status")
async def status() -> dict:
    """Returns the API status"""
    return {
        "status": True,
        "mongo": True,
        "redis": True,
        "postgres": True,
    }
