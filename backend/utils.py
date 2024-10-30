import logging
import os
import shutil
import tempfile

import boto3
import filetype
from botocore.exceptions import ClientError
from dotenv import load_dotenv
from fastapi import HTTPException, UploadFile, status
from PIL import Image

from core.config import settings
from models.user import UserProfilePic

load_dotenv()
MAX_IMAGE_SIZE: int = 2_097_152
THUMBNAIL_SIZE: tuple[int, int] = (256, 256)
temp_folder = "/tmp/stylazar"
os.makedirs(temp_folder, exist_ok=True)


def upload_file(file_path, object_name: str):
    """Upload a file to an S3 bucket

    :param file_path: Path to the file.
    :param object_name: S3 object name.
    :return: True if file was uploaded, else False
    """

    s3_client = boto3.client("s3")

    try:
        s3_client.upload_file(file_path, settings.BUCKET_NAME, object_name)
    except ClientError as e:
        logging.error(e)
        return False

    return True


def valid_media_type(file: UploadFile) -> bool:
    """"""
    accepted_file_types = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/heic",
        "image/heif",
        "image/heics",
        "png",
        "jpeg",
        "jpg",
        "heic",
        "heif",
        "heics",
    ]
    file_info = filetype.guess(file.file)
    if file_info is None:
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail="Unable to determine file type",
        )

    detected_content_type = file_info.extension.lower()

    if (
        file.content_type not in accepted_file_types
        or detected_content_type not in accepted_file_types
    ):
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail="Unsupported file type",
        )

    return True


def receive_image_upload(file: UploadFile):
    real_file_size = 0

    with tempfile.NamedTemporaryFile("wb+", delete=False) as temp:
        for chunk in file.file:
            real_file_size += len(chunk)
            if real_file_size > MAX_IMAGE_SIZE:
                raise HTTPException(
                    status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                    detail="The image file is too large",
                )
            temp.write(chunk)

    temp_path = os.path.join(temp_folder, os.path.basename(temp.name))
    temp_path += ".jpg"

    try:
        with Image.open(temp.name) as img:
            if img.mode != "RGB":
                img = img.convert("RGB")
            img.save(temp_path, "JPEG", optimize=True, quality=80)
    except OSError as e:
        print("cannot convert", e)

    return temp_path


def generate_image_thumbnail(filename):
    """"""
    temp_path = filename[:-4] + ".thumbnail.jpg"
    with Image.open(filename) as im:
        im.thumbnail(THUMBNAIL_SIZE)
        im.save(temp_path, "JPEG")
    return temp_path


s3_path = "https://{bucket}.s3.{region}.amazonaws.com/".format(
    bucket=settings.BUCKET_NAME, region=os.getenv("AWS_DEFAULT_REGION")
)


def process_profile_pic(file: UploadFile, user_id):
    """"""
    temp_path = receive_image_upload(file)
    thumbnail_path = generate_image_thumbnail(temp_path)

    user_folder = f"{settings.PROFILE_IMAGES}/{user_id}"
    full_img = f"{user_folder}/{user_id}-full.jpg"
    thumbnail = f"{user_folder}/{user_id}-thmb.jpg"

    upload_file(temp_path, full_img)
    upload_file(thumbnail_path, thumbnail)

    folder_url = s3_path + user_folder
    full_img_url = s3_path + full_img
    thumbnail_url = s3_path + thumbnail
    return UserProfilePic(folder=folder_url, original=full_img_url, thumbnail=thumbnail_url)
