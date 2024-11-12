""""""

from contextlib import asynccontextmanager

from models.post import Post, PostReaction, PostDocument
from models.user import User, UserIp
from models.visitor import Visitor
from models.comment import Comment
from models.session_activity import SessionActivity
from beanie import init_beanie
from fastapi import FastAPI
from motor.motor_asyncio import AsyncIOMotorClient
from sqlmodel import Session, SQLModel, create_engine
from .config import settings

pg_engine = create_engine(
    url=str(settings.PG_DATABASE_URI),
    echo=settings.DEBUG,
)


def initialize_db():
    SQLModel.metadata.create_all(pg_engine)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Initialize application services."""
    initialize_db()
    app.mongodb_client = AsyncIOMotorClient(str(settings.MONGO_DATABASE_URI))
    app.db = app.mongodb_client.get_database(settings.MONGO_INITDB_DATABASE)
    ping_response = await app.db.command("ping")
    if int(ping_response["ok"]) != 1:
        raise Exception("Problem connecting to mongodb.")

    await init_beanie(database=app.db, document_models=[PostDocument])  # type: ignore[arg-type,attr-defined]

    yield

    app.mongodb_client.close()


def commit_to_db(session: Session, obj):
    """"""
    session.add(obj)
    session.commit()
    session.refresh(obj)
    return obj
