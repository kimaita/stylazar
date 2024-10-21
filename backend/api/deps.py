from collections.abc import Generator
from typing import Annotated

from fastapi import Depends
from sqlmodel import Session

from storage.datastore import pg_engine


def get_db() -> Generator[Session, None, None]:
    with Session(pg_engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_db)]
