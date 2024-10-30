""""""

from pydantic import MongoDsn, PostgresDsn, computed_field
from pydantic_core import MultiHostUrl
from pydantic_settings import BaseSettings, SettingsConfigDict

from botocore.config import Config


class Settings(BaseSettings):
    """"""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_ignore_empty=True,
        extra="ignore",
    )

    POSTGRES_PASSWORD: str
    POSTGRES_USER: str
    POSTGRES_DB: str
    POSTGRES_HOST: str
    POSTGRES_PORT: int

    REDIS_PORT: int

    MONGO_PORT: int
    MONGO_HOST: str
    MONGO_INITDB_DATABASE: str
    MONGO_INITDB_ROOT_USERNAME: str
    MONGO_INITDB_ROOT_PASSWORD: str

    API_V1_PREFIX: str = "/api/v1"
    API_PORT: int

    PROJECT_NAME: str

    SECRET_KEY: str
    ALGORITHM: str
    DEFAULT_TOKEN_EXPIRE_MINUTES: int = 60 * 2  # 2 Hours
    USER_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 1 Day

    @computed_field  # type: ignore[prop-decorator]
    @property
    def PG_DATABASE_URI(self) -> PostgresDsn:
        return MultiHostUrl.build(
            scheme="postgresql+psycopg",
            username=self.POSTGRES_USER,
            password=self.POSTGRES_PASSWORD,
            host=self.POSTGRES_HOST,
            port=self.POSTGRES_PORT,
            path=self.POSTGRES_DB,
        )

    @computed_field  # type: ignore[prop-decorator]
    @property
    def MONGO_DATABASE_URI(self) -> MongoDsn:
        return MultiHostUrl.build(
            scheme="mongodb",
            username=self.MONGO_INITDB_ROOT_USERNAME,
            password=self.MONGO_INITDB_ROOT_PASSWORD,
            host=self.MONGO_HOST,
            port=self.MONGO_PORT,
        )

    # S3
    BUCKET_NAME: str = "stylazar"
    STORAGE_IMAGES: str = "images"
    PROFILE_IMAGES: str = f"{STORAGE_IMAGES}/profiles"
    POST_IMAGES: str = f"{STORAGE_IMAGES}/posts"
    DEFAULT_POST_IMAGES: str = f"{POST_IMAGES}/defaults"


settings = Settings()
