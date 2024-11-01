import uuid
from datetime import datetime, timedelta, timezone
from typing import Any

import jwt
from models.util import TokenData
from passlib.context import CryptContext

from .config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    """_summary_

    Args:
        password (str): _description_

    Returns:
        str: _description_
    """
    return pwd_context.hash(password)


def verify_password(password:str, hashed:str) -> bool:
    """Verify provided password against a stored hash

    Args:
        password (str): Password to check
        hashed (bool): Stored password hash

    Returns:
        bool: True if a match, False otherwise
    """
    return pwd_context.verify(password, hashed)


async def create_access_token(
    data: dict[str, Any], expires_delta: timedelta | None = None
) -> str:
    """Generate a fresh access token using a refresh token

    Args:
        data (dict[str, Any]): user credential
        expires_delta (timedelta | None, optional): Expiry time. Defaults to None.

    Returns:
        str: JWT
    """
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(
            minutes=settings.TOKEN_EXPIRY_MINUTES
        )

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(
        to_encode,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM,
    )
    return encoded_jwt


async def create_refresh_token(
    data: dict[str, Any], expires_delta: timedelta | None = None
) -> str:
    """_summary_

    Args:
        data (dict[str, Any]): _description_
        expires_delta (timedelta | None, optional): _description_. Defaults to None.

    Returns:
        str: _description_
    """
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(
            days=settings.REFRESH_TOKEN_EXPIRE_DAYS
        )
    to_encode.update({"exp": expire})
    encoded_jwt: str = jwt.encode(
        to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM
    )
    return encoded_jwt


async def verify_token(token: str) -> TokenData | None:
    """Verify a JWT token and return TokenData if valid.

    Parameters
    ----------
    token: str
        The JWT token to be verified.

    Returns
    -------
    TokenData | None
        TokenData instance if the token is valid, None otherwise.
    """

    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )

        user_id = uuid.UUID(payload.get("sub"))
        if user_id is None:
            return None
        return TokenData(user_id=user_id)

    except Exception:
        return None
