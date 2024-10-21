"""app server module"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.main import api_router
from storage.datastore import initialize_db
from utils.middleware import RequestLoggingMiddleware

app = FastAPI(title="Stylazar Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(RequestLoggingMiddleware)

app.include_router(api_router)


@app.on_event("startup")
def on_startup():
    initialize_db()

