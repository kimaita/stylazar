from uuid import UUID
from sqlmodel import SQLModel


class Token(SQLModel):
    """Session Access Tokens"""

    access_token: str
    token_type: str


class TokenData(SQLModel):
    """Token-User identifier"""

    user_id: UUID | None = None


class Message(SQLModel):
    """Generic response message"""

    message: str
