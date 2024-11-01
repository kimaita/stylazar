import logging
import os
import tempfile

import boto3
import filetype
from botocore.exceptions import ClientError
from fastapi import HTTPException, UploadFile, status
from PIL import Image
from pydantic import BaseModel

from core.config import settings
from dotenv import load_dotenv

load_dotenv()

class ImageUpload:
    """"""

    _accepted_file_types = [
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
    _temp_folder = "/tmp/stylazar"
    os.makedirs(_temp_folder, exist_ok=True)

    invalid_img_file = HTTPException(
        status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
        detail="Unsupported file type",
    )

    exceeded_size = HTTPException(
        status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
        detail="The image file is too large",
    )

    __MAX_IMAGE_SIZE: int = 2_097_152
    __THUMBNAIL_SIZE: tuple[int, int] = (256, 256)

    def __init__(self, image: UploadFile):
        self.image = image
        self.generate_thumbnail()

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        for file in [self.image, self.thumbnail]:
            os.unlink(file)

    @property
    def image(self):
        return self.__image

    @image.setter
    def image(self, file):
        """"""
        real_file_size = 0

        temp = tempfile.NamedTemporaryFile("wb+", dir=self._temp_folder)
        for chunk in file.file:
            real_file_size += len(chunk)
            if real_file_size > self.__MAX_IMAGE_SIZE:
                raise self.exceeded_size
            temp.write(chunk)

        temp_path = temp.name + ".jpg"

        try:
            with Image.open(temp.name) as img:
                if img.mode != "RGB":
                    img = img.convert("RGB")
                img.save(temp_path, "JPEG", optimize=True, quality=80)
                temp.close()
        except OSError:
            raise self.invalid_img_file

        self.__image = temp_path

    @property
    def thumbnail(self):
        return self.__thumbnail

    def generate_thumbnail(self):
        """"""
        temp_path = self.image[:-4] + ".thumbnail.jpg"
        with Image.open(self.__image) as im:
            im.thumbnail(self.__THUMBNAIL_SIZE)
            im.save(temp_path, "JPEG")
        self.__thumbnail = temp_path

    def upload(self, folder, id) -> dict:
        """"""

        full_img = f"{folder}/{id}-full.jpg"
        thumbnail = f"{folder}/{id}-thmb.jpg"

        upload_to_s3(self.image, full_img)
        upload_to_s3(self.thumbnail, thumbnail)

        return UploadedImage(
            folder=settings.s3_path + folder,
            original=settings.s3_path + full_img,
            thumbnail=settings.s3_path + thumbnail,
        )

    @classmethod
    def is_image(cls, file) -> bool:
        """"""

        file_info = filetype.guess(file.file)
        if (
            file_info is None
            or file.content_type not in cls._accepted_file_types
            or file_info.extension.lower() not in cls._accepted_file_types
        ):
            raise cls.invalid_img_file

        return True


class UploadedImage(BaseModel):
    """Return model for picture uploads"""

    folder: str
    original: str
    thumbnail: str


def upload_to_s3(file_path, object_name: str):
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
