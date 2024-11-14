""""""

import re
import secrets
from datetime import datetime, timezone, timedelta
import logging
import lxml.html
from beanie import PydanticObjectId
from beanie.operators import Set
from core.config import settings
from core.db import commit_to_db
from core.utils import ImageUpload
from models.post import (
    Post,
    PostCreate,
    PostDocument,
    PostDocumentBase,
    PostPublic,
    PostReaction,
    ReactionBase,
    PostUpdate,
    PostAuthor,
    PostPublicWithAuthor,
    PostDocumentUpdate,
)
from sqlmodel import Session, select
from core import exceptions
import uuid


def generate_excerpt(post: str, max_length: int = 512):
    """"""
    content = lxml.html.fromstring(post).text_content()
    if len(content) <= max_length:
        return content

    # Find the last space before max_length to avoid cutting words
    last_space = content.rfind(" ", 0, max_length)
    if last_space == -1:
        excerpt = content[:max_length]
    else:
        excerpt = content[:last_space]

    excerpt = excerpt.rstrip(".,!?:;")

    return excerpt


def generate_slug(title, session):
    """"""
    ptn_nonalpha = re.compile(r"[\W_]")
    ptn_punct = re.compile(r"[.,!?:;\'\"]")
    stripped = ptn_punct.sub("", title.rstrip().lower())
    slug = ptn_nonalpha.sub("-", stripped)
    test_slug = slug
    while check_slug(test_slug, session):
        test_slug = f"{slug}-{secrets.token_hex(4)}"

    return slug if (slug == test_slug) else test_slug


def post_exists(id: uuid.UUID, session: Session) -> Post | None:
    """"""
    return session.get(Post, id)


async def create_post(post: PostCreate, user_id, session, banner_image):
    """"""
    post_document = PostDocument(body=post.body)

    if post.body:
        post_document.excerpt = generate_excerpt(post.body)

    if post.is_published:
        published_at = datetime.now(timezone.utc)
        post_document.published_at = published_at

    await post_document.insert()
    slug = generate_slug(post.title, session)
    update_data = {
        "slug": slug,
        "is_public": post.is_published,
        "mongo_id": str(post_document.id),
        "user_id": user_id,
    }
    db_post = Post.model_validate(post, update=update_data)
    insPost = commit_to_db(session, db_post)

    if banner_image and ImageUpload.is_image(banner_image):
        post_folder = f"{settings.POST_IMAGES}/{insPost.id}"
        with ImageUpload(banner_image) as img:
            banner_pic = img.upload(post_folder, insPost.id)
        if banner_pic:
            await post_document.set({PostDocument.banner_image: banner_pic})

    post_document_public = PostDocumentBase(**post_document.model_dump())

    return PostPublic(
        **insPost.model_dump(),
        **post_document_public.model_dump(),
    )


async def get_mongo_doc(mongo_id: str) -> PostDocumentBase | None:
    """"""
    post_doc = await PostDocument.get(PydanticObjectId(mongo_id))
    if post_doc:
        return PostDocumentBase(**post_doc.model_dump())


async def get_post_by_id(
    id: uuid.UUID, session: Session
) -> PostPublicWithAuthor | None:
    """"""
    post = session.get(Post, id)
    if not post:
        return
    author = PostAuthor(
        user_id=post.author.id,
        name=post.author.name,
        avatar_links=post.author.avatar_links,
    )

    post_document = await get_mongo_doc(post.mongo_id)

    return PostPublicWithAuthor(
        **post.model_dump(), **post_document.model_dump(), author=author
    )


def check_slug(slug: str, session: Session):
    """"""
    statement = select(Post).where(Post.slug == slug)
    try:
        return session.exec(statement).one()
    except Exception:
        return None


async def get_post_by_slug(slug: str, session: Session):
    """"""
    post = check_slug(slug, session)
    if post:
        return await get_post_by_id(post.id, session)

    return None


async def update_post(post: Post, update: PostUpdate, session: Session):
    """"""
    update_dict = update.model_dump(exclude_unset=True)
    if "title" in update_dict:
        update_dict["slug"] = generate_slug(update_dict.get("title"), session)
    if "body" in update_dict:
        update_dict['excerpt'] = generate_excerpt(update_dict['body'])
    post.sqlmodel_update(update_dict)

    if update_dict.get("is_published"):
        update_dict["published_at"] = datetime.now(timezone.utc)
    post_doc_updates = PostDocumentUpdate.model_validate(update_dict).model_dump(
        exclude_unset=True
    )
    post_doc = await PostDocument.get(PydanticObjectId(post.mongo_id))
    if post_doc:
        await post_doc.update({"$set": post_doc_updates})

    db_post = commit_to_db(session, post)
    mongo_post = PostDocumentBase(**post_doc.model_dump())
    

    return PostPublic(**db_post.model_dump(), **mongo_post.model_dump())


# TODO: Post Deletion
def delete_post():
    """"""


async def get_posts(
    filters, session: Session, page, limit, order=Post.updated_at.desc()
):
    """"""
    statement = (
        select(Post).where(*filters).order_by(order).offset(page * limit).limit(limit)
    )
    posts = session.exec(statement)

    return [await get_post_by_id(post.id, session) for post in posts]


async def generate_feed(page: int, page_size: int, session: Session):
    """"""
    recency = datetime.now(timezone.utc) - timedelta(weeks=8)
    filters = (
        Post.is_published,
        Post.is_public,
        Post.updated_at > recency,
    )

    feed = await get_posts(filters=filters, session=session, page=page, limit=page_size)
    return feed


def post_react(
    post_id: uuid.UUID, user_id: uuid.UUID, reaction: ReactionBase, session: Session
):
    """"""
    statement = select(PostReaction).where(
        PostReaction.user_id == user_id, PostReaction.post_id == post_id
    )
    try:
        post_reaction = session.exec(statement).one()
        upvoted = not post_reaction.upvoted
        post_reaction.upvoted = upvoted
    except Exception:
        post_reaction = PostReaction.model_validate(
            reaction, update={"post_id": post_id, "user_id": user_id}
        )

    return commit_to_db(session, post_reaction)
