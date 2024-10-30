"""User class implementations"""

import uuid

from pydantic import EmailStr
from sqlalchemy.dialects.postgresql import ARRAY, JSONB
from sqlalchemy.types import String
from sqlmodel import AutoString, Column, Field, Relationship, SQLModel

from .base_model import BaseModel, UpdatableModel


class UserIp(SQLModel, table=True):
    """Link table for users and visitors"""

    __tablename__ = "user_ips"

    visitor_id: uuid.UUID | None = Field(
        default=None,
        foreign_key="visitors.id",
        primary_key=True,
    )
    user_id: uuid.UUID | None = Field(
        default=None,
        foreign_key="users.id",
        primary_key=True,
    )


class User(BaseModel, UpdatableModel, table=True):
    """Database user table"""

    __tablename__ = "users"

    name: str
    email: EmailStr = Field(unique=True, index=True, sa_type=AutoString)
    bio: str | None = None
    social_links: dict | None = Field(default=None, sa_type=JSONB)
    picture_url: str | None = None
    interests: list[str] | None = Field(default=None, sa_column=Column(ARRAY(String)))
    password: str = Field()

    visitors: list["Visitor"] | None = Relationship(
        back_populates="user", link_model=UserIp
    )

    posts: list["Post"] = Relationship(back_populates="author")
    comments: list["Comment"] = Relationship(back_populates="user")


class UserRegister(SQLModel):
    """Sign up object"""

    name: str
    email: EmailStr
    password: str = Field(min_length=8, max_length=40)


class UserPublic(SQLModel):
    """Public-facing user Model. JSON API responses"""

    id: uuid.UUID
    name: str
    email: EmailStr
    bio: str | None = None
    social_links: dict | None = None
    picture_url: str | None = None
    interests: list[str] | None = None


class UserUpdate(SQLModel):
    """Handles update requests"""

    name: str | None = None
    email: EmailStr | None = None
    bio: str | None = None
    picture_url: str | None = None
    social_links: dict | None = None
    interests: list[str] | None = None


class UpdatePassword(SQLModel):
    """Active user password changes"""

    current_password: str = Field(min_length=8, max_length=40)
    new_password: str = Field(min_length=8, max_length=40)


class UserProfilePic(SQLModel):
    """Return model for profile picture uploads"""
    folder:str
    original: str
    thumbnail: str
