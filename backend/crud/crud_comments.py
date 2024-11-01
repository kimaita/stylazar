from sqlmodel import Session, select
import uuid
from models.comment import Comment, CommentUpdate, CommentCreate
from core.db import commit_to_db
from core import exceptions


def create_comment(
    post_id: uuid.UUID, user_id: uuid.UUID, comment: CommentCreate, session: Session
):
    """"""

    db_comment = Comment(**comment.model_dump(), user_id=user_id, post_id=post_id)
    return commit_to_db(session, db_comment)


def get_by_id(id: uuid.UUID, session: Session):
    """"""
    comment = session.get(Comment, id)
    if not comment:
        raise exceptions.not_found_exception("comment")

    return comment


def update_comment(id: uuid.UUID, update: CommentUpdate, session: Session):
    """"""
    raise NotImplementedError


def delete_comment(id: uuid.UUID, session: Session):
    """"""
    raise NotImplementedError
