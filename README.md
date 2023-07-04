# News Explorer API

News Explorer API is the backend component of the News Explorer project. It provides the necessary server-side functionality for user authentication, article search, and managing saved articles.

The API is built using Node.js and Express.js, and it interacts with a MongoDB database to store user information and saved articles.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Error Handling](#error-handling)

## Features

- User registration and authentication
- Article search from external news sources
- Saving and managing articles for each user
- Secure password storage using bcrypt hashing
- JWT-based authentication for API access

## Technologies

The News Explorer API is built using the following technologies:

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcrypt

## API Endpoints

The News Explorer API provides the following endpoints:

- `POST /signup` - User registration
- `POST /signin` - User login
- `GET /users/me` - Get user information
- `GET /articles` - Search for articles
- `GET /articles/saved` - Get saved articles for the authenticated user
- `POST /articles` - Save an article for the authenticated user
- `DELETE /articles/:articleId` - Delete a saved article

For detailed information about each endpoint and their request/response formats, please refer to the API documentation or Postman collection.

## Authentication

The News Explorer API uses JWT-based authentication to protect the API endpoints. When a user registers or logs in, a JWT token is generated and returned in the response. This token is included in the `Authorization` header of subsequent requests as a Bearer token.

## Error Handling

The API handles errors gracefully and returns appropriate error responses with detailed error messages and status codes. The error handling middleware ensures consistent error responses for various scenarios.
