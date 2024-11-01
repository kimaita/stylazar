import enum
from datetime import datetime

from sqlmodel import TIMESTAMP, Column, Enum, Field, SQLModel


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

    ip_address: str = Field(index=True, primary_key=True)
    performed_at: datetime = Field(
        sa_type=TIMESTAMP(timezone=True),
    )
    route: str
    method: HttpMethod = Field(sa_column=Column(Enum(HttpMethod)))
    response_code: int | None = None


class ActivityCreate(SessionActivity):
    pass


class ActivityUpdate(SQLModel):
    response_code: int | None = None
