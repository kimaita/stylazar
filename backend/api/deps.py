import uuid
from collections.abc import Generator
from typing import Annotated

import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jwt.exceptions import InvalidTokenError
from sqlmodel import Session

from crud.crud_users import get_user_by_id
from models.token import TokenData
from models.user import User
from core.db import pg_engine
from core.config import settings


def get_db() -> Generator[Session, None, None]:
    with Session(pg_engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_db)]

oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{settings.API_V1_PREFIX}/login/access_token")
TokenDep = Annotated[str, Depends(oauth2_scheme)]

"""
def get_heroes_crud(
       session: SessionDep
) -> HeroesCRUD:
   return HeroesCRUD(session=session)
"""
def get_current_user(session: SessionDep, token: TokenDep) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM],
        )
    except InvalidTokenError:
        raise credentials_exception

    user_id = uuid.UUID(payload.get("sub"))
    if user_id is None:
        raise credentials_exception
    token_data = TokenData(user_id=user_id)
    user = get_user_by_id(session, token_data.user_id)
    if user is None:
        raise credentials_exception
    return user


CurrentUser = Annotated[User, Depends(get_current_user)]
