# Stylazar Blog Website

A simple full-stack blog application built using the stack:

- React for the frontend
- FastAPI for the backend
- MongoDB as the content database
- PostgreSQL for user and metadata storage
- AWS S3 for image storage

It has simple blog application features like authentication, posting contents which would have title and description, allowing users to create, read, update, and delete (CRUD) blog posts, with a simple and responsive interface.

## Features

- 💫 Modern, responsive UI built with React
- 🎨 Rich text editor with Markdown support using React Quill
- 🚀 High-performance API built with FastAPI
- 🔒 JWT-based authentication and authorization
- 📝 Rich content management with MongoDB
- 👥 User management with PostgreSQL
- 🖼️ Image upload and processing with S3
- 🔍 Full-text search capabilities
- 📱 REST API with automatic OpenAPI documentation

## Project Structure

```plaintext
stylazar-blog-website/
├── backend/
│   ├── api                 # FastAPI routes definition
│   ├── core                # Core app functionality - database, config, etc
│   ├── crud                # CRUD methods for database models
│   ├── middleware          # App HTTP middleware
│   ├── models              # ORM/ODM model definitions
│   ├── docker-compose.yml  # Backend docker compose
│   ├── Dockerfile          # API container image
│   ├── pyproject.toml      # Project dependencies
│   ├── main.py             # App entrypoint
├── client-side/
│   ├── public/
│   ├── src/
│   │   ├── assets          # React app for frontend
│   │   ├── components      # Reusables for the website
│   │   ├── pages           # Pages for the website
│   ├── package.json        # React dependencies
│   ├── package-lock.json   # React dependencies
├── README.md               # Project documentation
```

## Authors

- [Georgina Kimani](https://github.com/Geena254) - Frontend developer
- [John Kimaita](https://github.com/kimaita) - Backend developer
