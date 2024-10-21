""""""

import uuid

from sqlmodel import Session, select

from models.user import User, UserPublic, UserRegister, Visitor
from storage.datastore import pg_engine
from utils.security import hash_password


async def commit_to_db(session: Session, obj):
    """"""
    session.add(obj)
    session.commit()
    session.refresh(obj)
    return obj


async def log_ip_address(ip_addr: str):
    """Saves the request IP address to storage

    Args:
        ip_addr (str): client IP address
    """

    with Session(pg_engine) as session:
        if not check_logged_ip(session, ip_addr):
            obj = Visitor(ip_address=ip_addr)
            db_visitor = Visitor.model_validate(obj)
            session.add(db_visitor)
            session.commit()


def check_logged_ip(session: Session, ip: str):
    statement = select(Visitor).where(Visitor.ip_address == ip)
    try:
        return session.exec(statement).one()
    except Exception:
        return None


async def register_user(session: Session, user_obj: UserRegister) -> UserPublic:
    """Adds a user to the database and returns the object.

    The password is first hashed
    """
    updated_pwd = {"password": hash_password(user_obj.password)}
    db_user = User.model_validate(user_obj, update=updated_pwd)

    return await commit_to_db(session, db_user)


async def get_user_by_id(session: Session, id: uuid.UUID) -> User | None:
    """Retrieves a single user based on the provided id

    Args:
        session (Session): DB connection session
        id (uuid): id to retrieve

    Returns:
        User|None: The user associated with `id`, None otherwise
    """
    return session.get(User, id)


async def get_user_by_email(session: Session, email: str) -> User | None:
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
