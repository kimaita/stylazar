# Stylazar Backend

Backend for the Stylazar blogging platform, built with FastAPI.

## Getting Started

### Prerequisites

- Python 3.10 or higher
- Docker and Docker Compose
- AWS Account (for S3)

### Environment Setup

1. Clone the repository:

```bash
git clone https://github.com/Geena254/stylazar-blog-website
cd stylazar/backend
```

2. Update the `.env.prod` file with your configuration:

### Running with Docker

Build and start the services:

```bash
docker-compose -f docker-compose.prod.yml up --build
```

Once the application is running, the API and documentation will be available:

- API: `http://localhost:8000`
- API documentation:
  - Swagger UI: `http://localhost:8000/docs`
  - ReDoc: `http://localhost:8000/redoc`

> Use the port number specified in your `.env` file for `API_PORT`
