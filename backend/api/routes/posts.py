import uuid
from typing import Annotated, Any

from core import exceptions
from crud import crud_comments, crud_posts
from fastapi import APIRouter, Form, Query, Request, UploadFile, status, HTTPException
from models.comment import CommentCreate, CommentPublic
from models.post import (
    PostCreate,
    PostPublic,
    PostUpdate,
    ReactionBase,
    PostPublicWithAuthor,
    PostDisplay,
    PostDisplayWithAuthor,
)
from models.util import Message

from ..deps import CurrentUser, SessionDep

router = APIRouter(prefix="/posts", tags=["posts"])


@router.post("/", status_code=status.HTTP_201_CREATED, response_model=PostPublic)
async def create_post(
    session: SessionDep,
    user: CurrentUser,
    post_title: Annotated[str, Form()],
    post_body: Annotated[str, Form()],
    publish: Annotated[bool, Form()] = False,
    banner_image: UploadFile | None = None,
):
    """Upload a post"""
    post = PostCreate(title=post_title, body=post_body, is_published=publish)
    res = await crud_posts.create_post(
        post, user_id=user.id, session=session, banner_image=banner_image
    )
    return res


@router.get("/", response_model=list[PostDisplayWithAuthor])
async def get_posts_index(
    session: SessionDep,
    offset: int = 0,
    limit: Annotated[int, Query(le=30)] = 20,
):
    """Post list for the homepage"""
    return await crud_posts.generate_feed(offset, limit, session)


@router.get("/{id}", response_model=PostPublicWithAuthor)
async def get_post(id: str, session: SessionDep) -> Any:
    """Retrieve a specific post by the database ID or the title slug"""
    try:
        id = uuid.UUID(id)
        post = await crud_posts.get_post_by_id(id=id, session=session)
    except ValueError:  # ID is a slug
        post = await crud_posts.get_post_by_slug(slug=id, session=session)

    if not post:
        raise exceptions.not_found_exception("post")

    return post


@router.patch("/{id}", response_model=PostPublic)
async def update_post(
    id: uuid.UUID,
    updates: PostUpdate,
    user: CurrentUser,
    session: SessionDep,
):
    """Update post"""
    db_post = crud_posts.post_exists(id, session)
    if not db_post:
        raise exceptions.not_found_exception("post")
    if db_post.user_id != user.id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="You cannot edit this post",
        )

    return await crud_posts.update_post(post=db_post, update=updates, session=session)


# TODO: Implement Post deletion route
@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_post(id: uuid.UUID, user: CurrentUser, session: SessionDep):
    """Update post"""
    db_post = crud_posts.post_exists(id)
    if not db_post:
        raise exceptions.not_found_exception("post")
    if db_post.user_id != user.id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="You cannot delete this post",
        )
    raise NotImplementedError


@router.post(
    "/{id}/comment", status_code=status.HTTP_201_CREATED, response_model=CommentPublic
)
def add_post_comment(
    id: uuid.UUID, comment: CommentCreate, user: CurrentUser, session: SessionDep
):
    """Add a comment to a post"""
    if not crud_posts.post_exists(id, session):
        raise exceptions.not_found_exception("post")

    comment = crud_comments.create_comment(
        post_id=id, user_id=user.id, comment=comment, session=session
    )
    return comment


@router.post(
    "/{id}/like", status_code=status.HTTP_201_CREATED, response_model=ReactionBase
)
def like_post(
    id: uuid.UUID,
    reaction_in: ReactionBase,
    current_user: CurrentUser,
    session: SessionDep,
):
    """Like a post"""
    if not crud_posts.post_exists(id, session):
        raise exceptions.not_found_exception("post")

    return crud_posts.post_react(
        post_id=id, user_id=current_user.id, reaction=reaction_in, session=session
    )


@router.get("/{id}/share")
def share_post(id: uuid.UUID, session: SessionDep, request: Request):
    """Send a post link"""
    post = crud_posts.post_exists(id, session)
    if post:
        return Message(message=str(request.url_for("get_post", id=post.slug)))
