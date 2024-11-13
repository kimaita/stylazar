# Stylazar Backend

Stylazar is a high-performance blogging platform backend built with modern Python technologies. It provides a robust API for managing blog content, user accounts, and media assets with a focus on scalability and developer experience.

## Features

- 🚀 High-performance API built with FastAPI
- 🔒 JWT-based authentication and authorization
- 📝 Rich content management with MongoDB
- 👥 User management with PostgreSQL
- 🖼️ Image upload and processing with S3
- 📊 Analytics tracking and reporting
- 🔍 Full-text search capabilities
- 📱 REST API with automatic OpenAPI documentation

## Tech Stack

### Core

- [FastAPI](https://fastapi.tiangolo.com/) - Modern web framework for building APIs
- [SQLModel](https://sqlmodel.tiangolo.com/) - SQL database interactions with type annotations
- [Beanie](https://roman-right.github.io/beanie/) - MongoDB ODM with async support
- [Python 3.12](https://www.python.org/) - Programming language

### Databases & Storage

- **PostgreSQL** - User data, authentication, and relationships
- **MongoDB** - Blog posts, comments, and content
- **Amazon S3** - Media storage

## Project Structure

```
stylazar/
├── alembic/              # Database migrations
├── app/
│   ├── api/             # API endpoints
│   ├── core/            # Core functionality
│   ├── models/          # Database models
│   │   ├── sql/        # SQLModel models
│   │   └── nosql/      # Beanie models
│   ├── schemas/         # Pydantic schemas
│   ├── services/        # Business logic
│   └── utils/           # Utility functions
├── tests/               # Test suite
├── .env.example         # Environment variables example
├── docker-compose.yml   # Docker services configuration
├── Dockerfile          # Application container definition
└── requirements.txt    # Python dependencies
```

## Getting Started

### Prerequisites

- Python 3.10 or higher
- Docker and Docker Compose
- AWS Account (for S3)
- PostgreSQL
- MongoDB

### Environment Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/stylazar.git
cd stylazar
```

2. Create and activate a virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Copy the example environment file:

```bash
cp .env.example .env
```

5. Update the `.env` file with your configuration:

```env
# Database URLs
DATABASE_URL=postgresql://user:password@localhost:5432/stylazar
MONGODB_URL=mongodb://localhost:27017/stylazar

# AWS Configuration
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=your_region
S3_BUCKET=your_bucket_name

# JWT Configuration
SECRET_KEY=your_secret_key
ALGORITHM=HS256
```

### Running with Docker

1. Build and start the services:

```bash
docker-compose up --build
```

2. The API will be available at `http://localhost:8000`
3. API documentation will be at `http://localhost:8000/docs`

### Running Locally

1. Start PostgreSQL and MongoDB (if not using Docker)
2. Apply database migrations:

```bash
alembic upgrade head
```

3. Start the application:

```bash
uvicorn app.main:app --reload
```

## API Documentation

Once the application is running, visit:

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Development

### Creating Database Migrations

```bash
# Generate a new migration
alembic revision --autogenerate -m "description"

# Apply migrations
alembic upgrade head

# Rollback one version
alembic downgrade -1
```

### Running Tests

```bash
# Run all tests
pytest

# Run with coverage report
pytest --cov=app tests/
```

## Deployment

Deployment guides for common platforms:

### Docker (Production)

```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Manual Deployment

1. Set up a production PostgreSQL database
2. Set up a production MongoDB instance
3. Configure S3 bucket with proper permissions
4. Set up environment variables
5. Run with a production ASGI server:

```bash
gunicorn app.main:app -k uvicorn.workers.UvicornWorker
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- FastAPI for the amazing framework
- SQLModel and Beanie teams for the excellent ORMs
- The Python community for all the great packages

## Support

For support, email <support@stylazar.com> or open an issue on GitHub.
