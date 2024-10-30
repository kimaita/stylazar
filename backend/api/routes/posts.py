from fastapi import APIRouter
from ..deps import SessionDep, CurrentUser
import uuid
from models.post import PostCreate
from crud import crud_posts

router = APIRouter(prefix="/posts")


@router.get("/")
def get_posts_index(session: SessionDep):
    """Post list for the homepage"""
    raise NotImplementedError


@router.get("/{post_id}")
def get_post(post_id: uuid.UUID):
    """Retrieve a specific post by the database ID"""
    raise NotImplementedError


@router.get("/{stub}")
def get_post_by_stub(stu: str):
    """Retrieve a post by its stub"""
    raise NotImplementedError


@router.post("/")
async def create_post(post: PostCreate, session: SessionDep, user: CurrentUser):
    """Upload a post"""

    res = await crud_posts.create_post(post, session, user_id=user.id)
    return res


@router.put("/{id}")
def update_post():
    """Update post"""
    raise NotImplementedError


@router.delete("/{id}")
def delete_post():
    """Update post"""
    raise NotImplementedError


@router.post("/{id}/comment")
def add_post_comment():
    """Add a comment to a post"""
    raise NotImplementedError


@router.post("/{id}/like")
def like_post():
    """Like a post"""
    raise NotImplementedError


@router.post("/{id}/share")
def share_post():
    """Send a post link"""
    raise NotImplementedError
