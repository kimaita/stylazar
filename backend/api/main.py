"""api server module"""

from fastapi import APIRouter
from .routes import users, login, posts
from core.config import Settings

settings = Settings()

postgres_user = settings.POSTGRES_USER
postgres_password = settings.POSTGRES_PASSWORD
postgres_db = settings.POSTGRES_DB
postgres_host = settings.POSTGRES_HOST
postgres_port = settings.POSTGRES_PORT

redis_port = settings.REDIS_PORT

mongo_port = settings.MONGO_PORT
mongo_host = settings.MONGO_HOST
mongo_initdb_database = settings.MONGO_INITDB_DATABASE
mongo_initdb_root_username = settings.MONGO_INITDB_ROOT_USERNAME
mongo_initdb_root_password = settings.MONGO_INITDB_ROOT_PASSWORD

api_v1_prefix = settings.API_V1_PREFIX
api_port = settings.API_PORT

project_name = settings.PROJECT_NAME

secret_key = settings.SECRET_KEY
algorithm = settings.ALGORITHM


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
