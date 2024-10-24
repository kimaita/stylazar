from typing import Any
import uuid
from fastapi import APIRouter, HTTPException

from ..deps import SessionDep, CurrentUser
from crud import crud_users
from models.user import UserPublic, UserRegister

router = APIRouter(prefix="/users")


@router.post("/signup", response_model=UserPublic)
def create_user(session: SessionDep, user_reg: UserRegister) -> Any:
    """Adds a new user to the user database"""
    user_exists = crud_users.get_user_by_email(
        session=session,
        email=user_reg.email,
    )
    if user_exists:
        raise HTTPException(
            status_code=400,
            detail="A user with this email already exists",
        )

    user = crud_users.register_user(session=session, user_obj=user_reg)
    return user


@router.get("/me", response_model=UserPublic)
def retrieve_profile(current_user: CurrentUser) -> Any:
    """
    Get the logged in user.
    """
    return current_user


@router.get("/{user_id}", response_model=UserPublic)
def retrieve_user(session: SessionDep, user_id: uuid.UUID) -> Any:
    """Retrieves a user profile given an id"""
    user = crud_users.get_user_by_id(session, user_id)
    if not user:
        raise HTTPException(
            status_code=404,
            detail="No user found",
        )
    return user
