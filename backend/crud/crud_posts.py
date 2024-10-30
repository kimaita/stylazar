""""""

import re
from datetime import datetime, timezone

import lxml.html
from core.db import commit_to_db

from models.post import Post, PostCreate, PostDocument


def generate_excerpt(post: str, max_length: int = 250):
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

    # Remove trailing punctuation
    excerpt = excerpt.rstrip(".,!?:;")

    return excerpt + "..."


def generate_slug(title):
    """"""
    ptn_nonalpha = re.compile(r"[\W_]")
    ptn_punct = re.compile(r"[.,!?:;\'\"]")
    stripped = ptn_punct.sub("", title.rstrip().lower())
    slug = ptn_nonalpha.sub("-", stripped)
    return slug


async def create_post(post: PostCreate, session, user_id):
    """"""
    post_document = PostDocument(body=post.body)

    if post.body:
        post_document.excerpt = generate_excerpt(post.body)

    if post.is_published:
        published_at = datetime.now(timezone.utc)
        post_document.published_at = published_at

    inserted = await post_document.insert()
    mongo_id = str(inserted.id)
    update_data = {
        "user_id": user_id,
        "slug": generate_slug(post.title),
        "is_public": post.is_published,
        "mongo_id": mongo_id,
    }
    db_post = Post.model_validate(post, update=update_data)
    insPost = commit_to_db(session, db_post)
    return insPost


def load_post():
    """"""


def update_post():
    """"""


def retrieve_post():
    """"""


def get_posts_index():
    """"""


def get_post_by_id():
    """"""


def get_post_by_stub():
    """"""
