from uuid import UUID
from pydantic import BaseModel


class Token(BaseModel):
    """Session Access Tokens"""

    access_token: str
    token_type: str


class TokenData(BaseModel):
    """Token-User identifier"""

    user_id: UUID | None = None
