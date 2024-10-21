""""""

import os

from dotenv import load_dotenv
from pydantic import PostgresDsn
from pydantic_core import MultiHostUrl
from sqlmodel import SQLModel, create_engine

load_dotenv()

postgres_url: PostgresDsn = MultiHostUrl.build(
    scheme="postgresql+psycopg",
    username=os.getenv("POSTGRES_USER"),
    password=os.getenv("POSTGRES_PASSWORD"),
    host=os.getenv("POSTGRES_HOST"),
    port=int(os.getenv("POSTGRES_PORT")),
    path=os.getenv("POSTGRES_DB"),
)

pg_engine = create_engine(
    url=str(postgres_url),
    echo=True,
)


def initialize_db():
    SQLModel.metadata.create_all(pg_engine)
