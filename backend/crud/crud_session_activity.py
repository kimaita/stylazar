""""""

from sqlmodel import Session
from core.db import commit_to_db

from models.session_activity import SessionActivity


def create_activity(activity: SessionActivity, session: Session) -> SessionActivity:
    """"""
    db_activity = SessionActivity.model_validate(activity)

    return commit_to_db(session=session, obj=db_activity)


def get_activity():
    """"""


def update_activity():
    """"""
