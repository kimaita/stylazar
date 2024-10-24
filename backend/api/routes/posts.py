from fastapi import APIRouter
from ..deps import SessionDep, CurrentUser
import uuid

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
def create_post():
    """Upload a post"""
    raise NotImplementedError


@router.put("/{id}")
def update_post():
    """Update post"""
    raise NotImplementedError


@router.delete("/{id}")
def delete_post():
    """Update post"""
    raise NotImplementedError

@router.post("/{id}/like")
def like_post():
    """Like a post"""
    raise NotImplementedError

@router.post("/{id}/share")
def share_post():
    """Send a post link"""
    raise NotImplementedError