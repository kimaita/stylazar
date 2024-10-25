import logging
import boto3
from botocore.exceptions import ClientError
from core.config import settings


def upload_file(file_obj, object_name: str):
    """Upload a file to an S3 bucket

    :param file_obj: File-like object open in binary mode to upload
    :param object_name: S3 object name.
    :return: True if file was uploaded, else False
    """

    s3_client = boto3.client("s3")

    try:
        s3_client.upload_fileobj(file_obj, settings.BUCKET_NAME, object_name)
    except ClientError as e:
        logging.error(e)
        return False

    return True
