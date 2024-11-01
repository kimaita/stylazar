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
