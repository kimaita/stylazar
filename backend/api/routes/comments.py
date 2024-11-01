import uuid

from fastapi import APIRouter

from ..deps import CurrentUser, SessionDep
from models.comment import CommentUpdate

router = APIRouter(prefix="/comments")


@router.patch("/{id}")
def edit_comment(
    id: uuid.UUID, new_comment: CommentUpdate, user: CurrentUser, session: SessionDep
):
    """"""
    # comment =
    raise NotImplementedError
