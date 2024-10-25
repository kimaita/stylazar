""""""

import uuid
from .base_model import BaseModel, UpdatableModel
from .user import User
from .post import Post
from sqlmodel import Field, Relationship


class Comment(BaseModel, UpdatableModel, table=True):
    """"""

    __tablename__ = "comments"

    user_id: uuid.UUID = Field(foreign_key="users.id")
    post_id: uuid.UUID = Field(foreign_key="posts.id")
    body: str

    user: User = Relationship(back_populates="comments")
    post: Post = Relationship(back_populates="comments")
