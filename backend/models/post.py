""""""

import uuid
from datetime import datetime
from typing import TYPE_CHECKING, ClassVar

import pydantic
import pymongo
from beanie import Document
from pydantic import AwareDatetime, ConfigDict
from sqlmodel import Field, Relationship, SQLModel

from .base_model import BaseModel, UpdatableModel
from .user import User, UserPublic
from .util import UploadedImage

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

    title: str = Field(max_length=128)
    body: str | None
    is_published: bool = False


class PostUpdate(SQLModel):
    """Updating a post"""

    title: str | None = None
    body: str | None = None
    excerpt: str | None = None
    byline: str | None = None
    is_public: bool | None = None
    is_published: bool | None = None
    tags: list[str] | None = None


class PostDisplay(pydantic.BaseModel):
    id: uuid.UUID
    title: str
    slug: str
    excerpt: str
    is_public: bool
    is_published: bool
    banner_image: UploadedImage | None
    published_at: datetime | None
    # edited_at: datetime | None


class PostAuthor(SQLModel):
    user_id: uuid.UUID
    name: str
    profile_pic: str | None


class PostDisplayWithAuthor(PostDisplay):
    author: PostAuthor


class PostPublic(PostDisplay):
    body: str
    byline: str | None
    tags: list[str] | None


class PostPublicWithAuthor(PostPublic):
    """"""

    author: PostAuthor


class PostDocumentBase(pydantic.BaseModel):
    """"""

    body: str | None
    byline: str | None = None
    excerpt: str | None = None
    tags: list[str] | None = None
    banner_image: UploadedImage | None = None
    published_at: datetime | None = None


class PostDocumentUpdate(pydantic.BaseModel):
    """"""

    body: str | None = None
    byline: str | None = None
    excerpt: str | None = None
    tags: list[str] | None = None
    published_at: datetime | None = None
    banner_image: str | None = None


class PostVersion(PostDocumentBase):
    """"""

    version: int


class PostDocument(Document, PostDocumentBase):
    """MongoDB document schema for a post"""

    # metadata:{word_count:int, read_time:timedelta?}
    version_history: list[PostVersion] | None = None

    model_config: ClassVar[ConfigDict] = ConfigDict(timezone_aware=True)

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
