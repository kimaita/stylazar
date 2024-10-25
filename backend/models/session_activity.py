import enum
import uuid
from datetime import datetime

from sqlmodel import TIMESTAMP, Column, Enum, Field, Relationship, SQLModel

from .session import Session


class HttpMethod(str, enum.Enum):
    """ENUM class for HTTP Methods"""

    DELETE = "DELETE"
    GET = "GET"
    PATCH = "PATCH"
    POST = "POST"
    PUT = "PUT"


class SessionActivity(SQLModel, table=True):
    """"""

    __tablename__ = "session_activity"

    session_id: uuid.UUID = Field(
        foreign_key="sessions.id",
        primary_key=True,
    )
    performed_at: datetime = Field(
        sa_type=TIMESTAMP(timezone=True),
    )
    route: str
    method: HttpMethod = Field(sa_column=Column(Enum(HttpMethod)))
    response_code: int | None = None
    session: Session = Relationship(back_populates="activity")
