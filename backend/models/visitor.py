from sqlmodel import Field, Relationship

from .base_model import UpdateModel
from .user import User, UserIp

class Visitor(UpdateModel, table=True):
    """Database visitors table"""

    __tablename__ = "visitors"

    ip_address: str = Field(index=True)

    user: User | None = Relationship(back_populates="users", link_model=UserIp)
