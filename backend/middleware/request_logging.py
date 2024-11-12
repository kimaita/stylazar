"""Logging configuration"""

from datetime import datetime, timezone
from typing import Callable

from core.db import pg_engine
from crud.crud_session_activity import create_activity
from fastapi import FastAPI, Request, Response
from models.session_activity import SessionActivity, HttpMethod
from sqlmodel import Session
from starlette.middleware.base import BaseHTTPMiddleware


class RequestLoggingMiddleware(BaseHTTPMiddleware):
    def __init__(self, app: FastAPI) -> None:
        super().__init__(app)

    async def dispatch(self, request: Request, call_next: Callable) -> Response:
        try:
            method = HttpMethod(request.method)
        except ValueError:
            return await call_next(request)

        ip = request.client.host
        route = request.url.path
        request_time = datetime.now(timezone.utc)
        # if request.query_params:
        #     route += f"?{request.query_params}"
        req = SessionActivity(
            ip_address=ip,
            requested_at=request_time,
            route=route,
            method=method,
        )

        response: Response = await call_next(request)

        if req:
            req.response_code = response.status_code
            req.completed_at = datetime.now(timezone.utc)

            with Session(pg_engine) as session:
                create_activity(req, session)

        return response
