from sqlmodel import Field, Relationship

from .base_model import BaseModel, UpdatableModel
from .user import User, UserIp


class Visitor(BaseModel, UpdatableModel, table=True):
    """Database visitors table"""

    __tablename__ = "visitors"

    ip_address: str = Field(index=True)

    user: User | None = Relationship(back_populates="visitors", link_model=UserIp)
