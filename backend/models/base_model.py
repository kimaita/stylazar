"""Base Database Class definition"""

import uuid
from datetime import datetime

from sqlmodel import TIMESTAMP, Field, SQLModel, text


class BaseModel(SQLModel):
    """Base model for database objects

    It defines two properties: id, created_at
    """

    id: uuid.UUID = Field(
        default_factory=uuid.uuid4,
        primary_key=True,
    )


class TimestampedModel(SQLModel):
    created_at: datetime | None = Field(
        default=None,
        sa_type=TIMESTAMP(timezone=True),
        sa_column_kwargs={"server_default": text("CURRENT_TIMESTAMP")},
        nullable=False,
    )


class UpdatableModel(TimestampedModel):
    """Adds updated_at field to a base model"""

    updated_at: datetime | None = Field(
        default_factory=datetime.utcnow,
        sa_type=TIMESTAMP(timezone=True),
        sa_column_kwargs={"onupdate": datetime.utcnow},
        nullable=False,
    )
