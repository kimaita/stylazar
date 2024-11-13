import uuid
from typing import Any

from core.config import settings
from core.security import hash_password, verify_password
from core.utils import ImageUpload, UploadedImage
from crud import crud_users
from fastapi import APIRouter, HTTPException, UploadFile, status
from models.user import (
    UpdatePassword,
    UserPublic,
    UserRegister,
    UserUpdate,
)
from models.util import Message
from models.post import Post, PostDisplay

from ..deps import CurrentUser, SessionDep
from sqlmodel import select

router = APIRouter(prefix="/users", tags=["users"])


@router.post(
    "/register", status_code=status.HTTP_201_CREATED, response_model=UserPublic
)
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


@router.patch("/me", response_model=UserPublic)
def update_profile(
    session: SessionDep, user_in: UserUpdate, current_user: CurrentUser
) -> Any:
    """Update user profile."""
    if user_in.email:
        existing_user = crud_users.get_user_by_email(
            session=session, email=user_in.email
        )
        if existing_user and existing_user.id != current_user.id:
            raise HTTPException(
                status_code=409, detail="This email address is unavailable"
            )
    return crud_users.update_user(
        session=session, current_user=current_user, user_in=user_in
    )


@router.patch("/me/password", response_model=Message)
def update_password(
    session: SessionDep, body: UpdatePassword, current_user: CurrentUser
) -> Any:
    """Update current password"""
    if not verify_password(body.current_password, current_user.password):
        raise HTTPException(status_code=400, detail="Incorrect password")
    if body.current_password == body.new_password:
        raise HTTPException(
            status_code=400, detail="New password cannot be the same as the current one"
        )
    hashed_password = hash_password(body.new_password)
    current_user.password = hashed_password
    session.add(current_user)
    session.commit()
    return Message(message="Password updated successfully")


@router.post("/me/pic", response_model=UploadedImage)
def update_profile_pic(
    image: UploadFile,
    session: SessionDep,
    current_user: CurrentUser,
) -> Any:
    """Update user's profile picture"""
    if ImageUpload.is_image(image):
        user_folder = f"{settings.PROFILE_IMAGES}/{current_user.id}"

        with ImageUpload(image) as img:
            profile_pic = img.upload(user_folder, current_user.id)
        user_data = UserUpdate(avatar_links=profile_pic.model_dump())
        crud_users.update_user(
            session=session, current_user=current_user, user_in=user_data
        )
        return profile_pic


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


#  TODO: Implement user posts retrieval
@router.get(
    "/{user_id}/posts",
    response_model=list[PostDisplay],
)
def retrieve_user_posts(user_id: uuid.UUID, session: SessionDep):
    """Get posts by a user"""
    user = crud_users.get_user_by_id(session, user_id)
    if not user:
        raise HTTPException(
            status_code=404,
            detail="No user found",
        )
    statement = select(Post).where(Post.user_id == user.id)
    res = session.exec(statement).all()
    return res


# TODO: Implement user drafts retrieval
@router.get(
    "/{user_id}/drafts",
    response_model=list[PostDisplay],
)
def retrieve_user_drafts(current_user: CurrentUser, session: SessionDep):
    """Get post drafts for a user"""

    statement = select(Post).where(
        Post.user_id == current_user.id, not Post.is_published
    )
    res = session.exec(statement).all()
    return res


# TODO: Implement user history retrieval
@router.get(
    "/{user_id}/history",
    response_model="",
)
def retrieve_user_history(current_user: CurrentUser):
    """Get reading history for a user"""
    raise NotImplementedError


# TODO: Implement user likes retrieval
@router.get(
    "/{user_id}/likes",
    # response_model="",
)
def retrieve_user_likes(current_user: CurrentUser):
    """Get posts upvoted by a user"""
    return current_user.post_reactions
