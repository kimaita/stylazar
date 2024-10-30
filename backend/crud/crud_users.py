""""""

import uuid

from sqlmodel import Session, select

from core.db import pg_engine, commit_to_db
from models.user import User, UserPublic, UserRegister, UserUpdate
from models.visitor import Visitor
from core.security import hash_password, verify_password
from core.config import settings


def log_ip_address(ip_addr: str):
    """Saves the request IP address to storage

    Args:
        ip_addr (str): client IP address
    """

    with Session(pg_engine) as session:
        ip_exists = get_logged_ip(session, ip_addr)
        if not ip_exists:
            obj = Visitor(ip_address=ip_addr)
            db_visitor = Visitor.model_validate(obj)
            session.add(db_visitor)
            session.commit()


def get_logged_ip(session: Session, ip: str) -> Visitor | None:
    statement = select(Visitor).where(Visitor.ip_address == ip)
    try:
        return session.exec(statement).one()
    except Exception:
        return None


def register_user(session: Session, user_obj: UserRegister) -> UserPublic:
    """Adds a user to the database and returns the object.

    The password is first hashed
    """
    updated_pwd = {"password": hash_password(user_obj.password)}
    db_user = User.model_validate(user_obj, update=updated_pwd)

    return commit_to_db(session, db_user)


def get_user_by_id(session: Session, id: uuid.UUID) -> User | None:
    """Retrieves a single user based on the provided id

    Args:
        session (Session): DB connection session
        id (uuid): id to retrieve

    Returns:
        User|None: The user associated with `id`, None otherwise
    """
    try:
        return session.get(User, id)
    except Exception:
        return None


def get_user_by_email(session: Session, email: str) -> User | None:
    """Retrieves a user based on the provided email address
    Args:
        email (str): email to search

    Returns:
        User|None: the associated user, None otherwise
    """
    statement = select(User).where(User.email == email)
    try:
        return session.exec(statement).one()
    except Exception:
        return None


def authenticate_user(session: Session, email: str, password: str) -> User | None:
    """"""
    user = get_user_by_email(session, email)
    print(f"authenticated {email}")
    if not user:
        return
    if not verify_password(password, user.password):
        return
    return user


def update_user(session: Session, current_user: User, user_in: UserUpdate) -> User:
    """Updates a user"""

    update_data = user_in.model_dump(exclude_unset=True)

    if "interests" in update_data and current_user.interests:
        update_data["interests"] += current_user.interests

    if "social_links" in update_data and current_user.social_links:
        update_data["social_links"].update(current_user.social_links)

    current_user.sqlmodel_update(update_data)

    return commit_to_db(session, current_user)
