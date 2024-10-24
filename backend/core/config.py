""""""

from pydantic import PostgresDsn, computed_field
from pydantic_core import MultiHostUrl
from pydantic_settings import BaseSettings, SettingsConfigDict


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


settings = Settings()
