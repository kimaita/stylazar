from fastapi import HTTPException, status


def not_found_exception(resource: str):
    return HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"This {resource} does not exist",
    )


def invalid_credentials(message: str | None = "Invalid user credentials"):
    return HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail=message,
        headers={"WWW-Authenticate": "Bearer"},
    )


def invalid_img_file():
    return HTTPException(
        status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
        detail="Unsupported file type. Allowed: jpg, jpeg, png, heic, heif",
    )


def exceeded_size():
    return HTTPException(
        status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
        detail="The image file is too large. Try 2MB or less",
    )
