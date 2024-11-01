# Stylazar Blog Website
A simple full-stack blog application built using the stack:

- React for the frontend
- FastAPI for the backend
- MongoDB as the database
- PostgreSQL for database management

It has simple blog application features like authentication, posting contents which would have title and description, allowing users to create, read, update, and delete (CRUD) blog posts, with a simple and responsive interface.

## Features

- Create, Read, Update, and Delete blog posts
- FastAPI backend with MongoDB as the database
- React frontend for interacting with the blog
- React Quill for creating and updating blog posts
- CORS support for communication between frontend and backend

## Project Structure

```plaintext
stylazar-blog-website/
├── backend/
│   ├── api                 # FastAPI app with blog routes
│   ├── core                # MongoDB connection setup
│   ├── crud                # Pydantic models for blog posts
│   ├── middleware          # 
│   ├── models              # 
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

* Georgina Kimani - Frontend developer
* John Kimaita - Backend developer
