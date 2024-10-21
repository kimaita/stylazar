from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response

from api.repository.users_repo import log_ip_address


class RequestLoggingMiddleware(BaseHTTPMiddleware):
    def __init__(self, app):
        super().__init__(app)

    async def dispatch(self, request: Request, call_next) -> Response:
        # Perform actions before the request is processed
        ip = request.client.host
        await log_ip_address(ip)

        # Forward the request to the next middleware or route handler
        response = await call_next(request)

        # Perform actions after the request is processed

        return response
