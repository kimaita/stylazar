import uuid
from typing import Annotated, Any

from core import exceptions
from crud import crud_comments, crud_posts
from fastapi import APIRouter, Form, HTTPException, Request, UploadFile, status
from models.comment import CommentCreate, CommentPublic
from models.post import PostCreate, PostPublic, PostPublicWithAuthor, ReactionBase
from models.util import Message

from ..deps import CurrentUser, SessionDep

router = APIRouter(prefix="/posts", tags=["posts"])


@router.post("/", response_model=PostPublic)
async def create_post(
    session: SessionDep,
    user: CurrentUser,
    post_title: Annotated[str, Form()],
    post_body: Annotated[str, Form()],
    publish: Annotated[bool, Form()] = False,
    banner_image: UploadFile | None = None,
):
    """Upload a post"""
    post = PostCreate(
        title=post_title, body=post_body, user_id=user.id, is_published=publish
    )
    res = await crud_posts.create_post(post, session, banner_image=banner_image)
    return res


@router.get("/")
def get_posts_index(session: SessionDep):
    """Post list for the homepage"""
    raise NotImplementedError


@router.get("/{id}", response_model=PostPublic)
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


@router.patch("/{id}")
def update_post(id: uuid.UUID, user: CurrentUser, session: SessionDep):
    """Update post"""
    raise NotImplementedError


@router.delete("/{id}")
def delete_post(id: uuid.UUID, user: CurrentUser, session: SessionDep):
    """Update post"""
    raise NotImplementedError


@router.post("/{id}/comment", response_model=CommentPublic)
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
async def like_post(
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
