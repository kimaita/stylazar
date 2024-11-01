""""""

from contextlib import asynccontextmanager
from logging import info
from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient
from sqlmodel import SQLModel, create_engine, Session
from fastapi import FastAPI
from .config import settings

from models.post import Post, PostReaction, PostDocument
from models.user import User, UserIp
from models.visitor import Visitor
from models.comment import Comment

pg_engine = create_engine(
    url=str(settings.PG_DATABASE_URI),
    echo=True,
)


def initialize_db():
    SQLModel.metadata.create_all(pg_engine)


@asynccontextmanager
async def mongo_lifespan(app: FastAPI):  # type: ignore
    """Initialize application services."""
    app.mongodb_client = AsyncIOMotorClient(str(settings.MONGO_DATABASE_URI))
    app.db = app.mongodb_client.get_database(settings.MONGO_INITDB_DATABASE)
    ping_response = await app.db.command("ping")
    if int(ping_response["ok"]) != 1:
        raise Exception("Problem connecting to database cluster.")
    else:
        info("Connected to database cluster.")

    await init_beanie(database=app.db, document_models=[PostDocument])  # type: ignore[arg-type,attr-defined]

    yield

    app.mongodb_client.close()


def commit_to_db(session: Session, obj):
    """"""
    session.add(obj)
    session.commit()
    session.refresh(obj)
    return obj
