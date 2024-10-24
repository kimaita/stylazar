""""""

from sqlmodel import SQLModel, create_engine
from models.user import User, UserIp
from models.visitor import Visitor
from models.post import Post
from .config import settings

pg_engine = create_engine(
    url=str(settings.PG_DATABASE_URI),
    echo=True,
)


def initialize_db():
    SQLModel.metadata.create_all(pg_engine)
