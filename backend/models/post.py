""""""

import uuid
from datetime import datetime

from sqlmodel import Field, Relationship, SQLModel

from .base_model import BaseModel, UpdatableModel
from .user import User


class Post(BaseModel, UpdatableModel, table=True):
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
    comments: list["Comment"] = Relationship(back_populates="post")
    reactions: list["PostReaction"] = Relationship(back_populates="post")


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
    updated_at: datetime = Field()


class PostReaction(UpdatableModel, table=True):
    """Post Reaction"""

    __tablename__ = "post_reaction"

    post_id: uuid.UUID = Field(foreign_key="posts.id", primary_key=True)
    visitor_id: uuid.UUID = Field(foreign_key="visitors.id", primary_key=True)
    upvoted: bool = Field(default=True)

    post: Post = Relationship(back_populates="reactions")
    # visitor : Visitor = Relationship()