import uuid

from fastapi import APIRouter, status

from ..deps import CurrentUser, SessionDep
from models.comment import CommentUpdate, CommentPublic
from models.util import Message
from crud import crud_comments
from core import exceptions

router = APIRouter(prefix="/comments", tags=["posts"])


@router.patch("/{id}", response_model=CommentPublic)
def edit_comment(
    id: uuid.UUID, new_comment: CommentUpdate, user: CurrentUser, session: SessionDep
):
    """"""
    db_comment = crud_comments.get_by_id(id)
    if not db_comment:
        raise exceptions.not_found_exception("comment")

    return crud_comments.update_comment(
        update=new_comment, comment=db_comment, session=session
    )


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_comment(id: uuid.UUID, user: CurrentUser, session: SessionDep):
    """"""
    comment = crud_comments.get_by_id(id, session)
    if not comment:
        raise exceptions.not_found_exception("comment")

    crud_comments.delete_comment(comment, session)
    return Message(message="Comment deleted")
