""""""

from motor import core, motor_asyncio
from odmantic import AIOEngine
from pymongo.driver_info import DriverInfo
from sqlmodel import SQLModel, create_engine

from models.post import Post, PostReaction
from models.user import User, UserIp
from models.visitor import Visitor
from models.comment import Comment

from .config import settings

pg_engine = create_engine(
    url=str(settings.PG_DATABASE_URI),
    echo=True,
)
DRIVER_INFO = DriverInfo(name="stylazar-mongodb", version="0.1.0")


def initialize_db():
    SQLModel.metadata.create_all(pg_engine)


class _MongoClientSingleton:
    mongo_client: motor_asyncio.AsyncIOMotorClient | None
    engine: AIOEngine

    def __new__(cls):
        if not hasattr(cls, "instance"):
            cls.instance = super(_MongoClientSingleton, cls).__new__(cls)
            cls.instance.mongo_client = motor_asyncio.AsyncIOMotorClient(
                settings.MONGO_DATABASE_URI, driver=DRIVER_INFO
            )
            cls.instance.engine = AIOEngine(
                client=cls.instance.mongo_client,
                database=settings.MONGO_INITDB_DATABASE,
            )
        return cls.instance


def MongoDatabase() -> core.AgnosticDatabase:
    return _MongoClientSingleton().mongo_client[settings.MONGO_INITDB_DATABASE]


def get_engine() -> AIOEngine:
    return _MongoClientSingleton().engine


async def ping():
    await MongoDatabase().command("ping")


__all__ = ["MongoDatabase", "ping"]
