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
    return session.get(Comment, id)


def update_comment(update: CommentUpdate, comment: Comment, session: Session):
    """"""
    update_data = update.model_dump(exclude_unset=True)
    comment.sqlmodel_update(update_data)
    return commit_to_db(session, comment)


def delete_comment(comment: Comment, session: Session):
    """"""
    session.delete(comment)
    session.commit()
    
