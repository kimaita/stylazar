"""api server module"""

from fastapi import APIRouter
from .routes import users, login, posts


api_router = APIRouter()

api_router.include_router(users.router)
api_router.include_router(login.router)
api_router.include_router(posts.router)


@api_router.get("/status")
async def status() -> dict:
    """Returns the API status"""
    return {
        "status": 'OK',
    }
