""""""

import uuid
from .base_model import UpdateModel
from sqlmodel import Field, Relationship, SQLModel
from .user import User


class Post(UpdateModel, table=True):
    """Database posts model"""

    __tablename__ = "posts"

    user_id: uuid.UUID = Field(foreign_key="users.id", nullable=False)
    mongo_id: str
    title: str
    slug: str
    display_excerpt: str | None
    is_public: bool = Field(default=True)
    is_published: bool = Field(default=True)

    author: User | None = Relationship(back_populates="posts")


class PostCreate(SQLModel):
    """New post"""

    title: str | None
    body: str | None
    is_public: bool | None = None
    is_published: bool | None = None


class PostUpdate(PostCreate):
    """Updating a post"""

    id: uuid.UUID
    # title: str | None = None
    # body: str | None = None
    is_public: bool | None = None
    is_published: bool | None = None


class PostReact(SQLModel):
    """Post Reaction"""

    id: uuid.UUID
    upvote: bool
