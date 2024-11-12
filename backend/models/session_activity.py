import enum
from datetime import datetime, timezone

from sqlmodel import TIMESTAMP, Column, Enum, Field, SQLModel
from aredis_om import HashModel, get_redis_connection
from pydantic.networks import IPvAnyAddress
from pydantic import AwareDatetime
from core.config import settings

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
    requested_at: datetime = Field(sa_type=TIMESTAMP(timezone=True))
    route: str
    method: HttpMethod = Field(sa_column=Column(Enum(HttpMethod)))
    response_code: int | None = None
    completed_at: datetime | None = Field(sa_type=TIMESTAMP(timezone=True))


class ActivityCreate(SessionActivity):
    """"""


class ActivityUpdate(SQLModel):
    response_code: int | None = None
    completed_at: datetime | None = None


class ActivityRedis(HashModel):
    """Redis model"""

    ip_address: IPvAnyAddress = Field(index=True)
    requested_at: AwareDatetime = datetime.now(timezone.utc)
    route: str
    method: HttpMethod
    response_code: int | None = None
    completed_at: AwareDatetime | None = None

    class Meta:
        database = get_redis_connection(
            host=settings.REDIS_HOST,
            port=settings.REDIS_PORT,
            encoding="utf8",
            decode_responses=True,
        )
