from datetime import timedelta
from typing import Annotated

from crud.crud_users import authenticate_user
from api.deps import SessionDep, CurrentUser
from core.security import create_access_token
from core.config import settings
from models.util import Token
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter()


@router.post("/login/access_token")
def login_access_token(
    session: SessionDep,
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
) -> Token:
    """
    OAuth2 compatible token login, get an access token for future requests
    """

    user = authenticate_user(
        session=session, email=form_data.username, password=form_data.password
    )
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=settings.USER_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(user.id)}, expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")

# TODO: Implement password reset token generation - forgotten
@router.post('/password/reset_token')
def get_reset_token():
    """"""
    raise NotImplementedError

# TODO: Implement password resetting - forgotten
@router.post('/password/reset')
def reset_password():
    """"""
    raise NotImplementedError

