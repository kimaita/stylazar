from typing import Any

from fastapi import APIRouter, HTTPException

from api.deps import SessionDep
from api.repository import users_repo
from models.user import UserPublic, UserRegister

router = APIRouter(prefix="/users")


@router.post("/", response_model=UserPublic)
async def create_user(session: SessionDep, user_reg: UserRegister) -> Any:
    """Adds a new user to the user database"""
    user_exists = await users_repo.get_user_by_email(
        session=session,
        email=user_reg.email,
    )
    if user_exists:
        raise HTTPException(
            status_code=400,
            detail="A user with this email already exists",
        )

    user = await users_repo.register_user(session=session, user_obj=user_reg)
    return user


@router.get("/{id}", response_model=UserPublic)
async def retrieve_user(session: SessionDep, id) -> Any:
    """Retrieves a user profile given an id"""
    user = await users_repo.get_user_by_id(session, id)
    if not user:
        raise HTTPException(
            status_code=404,
            detail="No user found",
        )
    return user


# @router.get('/me')
