"""app server module"""

from api.main import api_router
from core.config import settings
from core.db import initialize_db, mongo_lifespan
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from middleware.middleware import RequestLoggingMiddleware
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

app = FastAPI(
    lifespan=mongo_lifespan,
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_PREFIX}/openapi.json",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(RequestLoggingMiddleware)

app.include_router(api_router, prefix=settings.API_V1_PREFIX)


@app.on_event("startup")
def on_startup():
    initialize_db()
