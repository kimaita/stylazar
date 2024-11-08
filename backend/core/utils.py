import logging
import os
import tempfile

import boto3
import filetype
from botocore.exceptions import ClientError
from dotenv import load_dotenv
from fastapi import UploadFile
from PIL import Image
from pydantic import BaseModel

from core.config import settings
from core.exceptions import exceeded_size, invalid_img_file

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

    __MAX_IMAGE_SIZE: int = 2_097_152
    __THUMBNAIL_SIZE: tuple[int, int] = (256, 256)

    def __init__(self, image: UploadFile):
        self.__temp = tempfile.NamedTemporaryFile("wb+", dir=self._temp_folder)
        if self.receive_file(image):
            self.convert_image()
        self.generate_thumbnail()

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        if not self.__temp.closed:
            self.__temp.close()
        for file in [self.image, self.thumbnail]:
            os.unlink(file)

    def receive_file(self, file):
        """"""
        real_file_size = 0

        for chunk in file.file:
            real_file_size += len(chunk)
            if real_file_size > self.__MAX_IMAGE_SIZE:
                raise exceeded_size()
            self.__temp.write(chunk)

        return True

    def convert_image(self):
        filepath = self.__temp.name + ".jpg"
        try:
            with Image.open(self.__temp.name) as img:
                if img.mode != "RGB":
                    img = img.convert("RGB")
                img.save(filepath, optimize=True, quality=80)
                self.__temp.close()

        except OSError as e:
            logging.error(e)
            raise invalid_img_file()
        self.__image = filepath

    @property
    def thumbnail(self):
        return self.__thumbnail

    @property
    def image(self):
        return self.__image

    def generate_thumbnail(self):
        """"""
        filepath = self.image[:-4] + ".thumbnail.jpg"
        with Image.open(self.image) as im:
            im.thumbnail(self.__THUMBNAIL_SIZE)
            im.save(filepath, "JPEG", optimize=True, quality=80)
        self.__thumbnail = filepath

    def upload(self, folder, id) -> dict:
        """"""

        full_img = f"{folder}/{id}-full.jpg"
        thumbnail = f"{folder}/{id}-thmb.jpg"

        original_path = upload_to_s3(self.image, full_img)
        thumbnail_path = upload_to_s3(self.thumbnail, thumbnail)


        return UploadedImage(
            folder=folder,
            original=original_path,
            thumbnail=thumbnail_path,
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
            raise invalid_img_file()

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

    s3_path: str = "https://{bucket}.s3.{region}.amazonaws.com/".format(
        bucket=settings.BUCKET_NAME, region=os.getenv("AWS_DEFAULT_REGION")
    )

    try:
        s3_client.upload_file(file_path, settings.BUCKET_NAME, object_name)
    except ClientError as e:
        logging.error(e)
        return False

    return s3_path + object_name
