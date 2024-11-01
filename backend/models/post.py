""""""

import uuid
from datetime import datetime
from typing import TYPE_CHECKING

import pydantic
import pymongo
from beanie import Document
from sqlmodel import Field, Relationship, SQLModel

from .base_model import BaseModel, UpdatableModel
from .user import User, UserPublic

if TYPE_CHECKING:
    from .comment import Comment


class Post(BaseModel, UpdatableModel, table=True):
    """Database posts model"""

    __tablename__ = "posts"

    user_id: uuid.UUID = Field(foreign_key="users.id", nullable=False)
    mongo_id: str
    title: str = Field(index=True)
    slug: str = Field(index=True)
    is_public: bool = Field(default=False)
    is_published: bool = Field(default=False)

    author: User = Relationship(back_populates="posts")
    comments: list["Comment"] = Relationship(back_populates="post")
    reactions: list["PostReaction"] = Relationship(back_populates="post")


class PostCreate(SQLModel):
    """New post"""

    user_id: uuid.UUID
    title: str = Field(max_length=128)
    body: str | None
    is_published: bool = False


class PostUpdate(PostCreate):
    """Updating a post"""

    title: str | None = None
    body: str | None = None
    is_public: bool | None = None
    is_published: bool | None = None


class PostVersion(pydantic.BaseModel):
    """"""

    version: int
    content: str
    published_at: datetime


class PostPublic(SQLModel):
    id: uuid.UUID
    title: str
    body: str
    excerpt: str
    slug: str
    published_at: datetime | None
    byline: str | None
    banner_image: str | None


class PostPublicWithAuthor(PostPublic):
    author: UserPublic


class PostDocument(Document):
    """MongoDB document schema for a post"""

    body: str | None
    byline: str | None = None
    excerpt: str | None = None
    tags: list[str] | None = None
    published_at: datetime | None = None
    banner_image: str | None = None
    # metadata:{word_count:int, read_time:timedelta?}
    version_history: list[PostVersion] | None = None

    class Settings:
        # The name of the collection to store these objects.
        name = "posts"
        indexes = [
            [
                ("excerpt", pymongo.TEXT),
            ],
        ]


class ReactionBase(SQLModel):
    """"""

    upvoted: bool


class PostReaction(UpdatableModel, ReactionBase, table=True):
    """Post Reaction"""

    __tablename__ = "post_reaction"

    post_id: uuid.UUID = Field(foreign_key="posts.id", primary_key=True)
    user_id: uuid.UUID = Field(foreign_key="users.id", primary_key=True)

    post: Post = Relationship(back_populates="reactions")
    user: User = Relationship(back_populates="post_reactions")
