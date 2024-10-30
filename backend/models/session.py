""""""

import uuid
from datetime import datetime
from .base_model import BaseModel
from sqlmodel import Field, TIMESTAMP, Relationship


class Session(BaseModel, table=True):
    """"""

    __tablename__ = "sessions"

    visitor_id: uuid.UUID = Field(
        foreign_key="visitors.id",
    )
    destroyed_at: datetime | None = Field(
        default=None,
        sa_type=TIMESTAMP(timezone=True),
    )

    activity: list["SessionActivity"] = Relationship(back_populates="session")




