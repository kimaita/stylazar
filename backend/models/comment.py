""""""

import uuid
from .base_model import BaseModel, UpdatableModel
from .user import User, UserPublic
from .post import Post, PostPublic
from sqlmodel import Field, Relationship, SQLModel


class CommentBase(SQLModel):
    """"""

    body: str


class Comment(BaseModel, UpdatableModel, CommentBase, table=True):
    """"""

    __tablename__ = "comments"

    user_id: uuid.UUID = Field(foreign_key="users.id")
    post_id: uuid.UUID = Field(foreign_key="posts.id")

    user: User = Relationship(back_populates="comments")
    post: Post = Relationship(back_populates="comments")


class CommentCreate(CommentBase):
    """"""

    pass


class CommentUpdate(CommentBase):
    """"""

    pass


class CommentPublic(CommentBase):
    """"""

    id: uuid.UUID
    user: UserPublic
    # post: PostPublic
