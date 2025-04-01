# Task Management API

A RESTful API for managing tasks with advanced features including authentication, pagination, filtering, and sorting.

## Features

### Authentication
- JWT-based authentication
- User registration and login
- Protected routes

### Task Management
- Create, Read, Update, Delete (CRUD) operations
- Pagination support
- Search functionality
- Status filtering
- Custom sorting
- Input validation

## Tech Stack

- Node.js & Express.js
- TypeScript
- MongoDB with Mongoose
- JWT for authentication
- Joi for validation
- Error handling middleware
- CORS enabled

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
  - Body: `{ "email": "user@example.com", "password": "password123" }`

- `POST /api/auth/login` - Login user
  - Body: `{ "email": "user@example.com", "password": "password123" }`

### Tasks
All task endpoints require authentication token in header: `Authorization: Bearer <token>`

- `POST /api/tasks` - Create a new task
  - Body: 
    ```json
    {
      "title": "Task title",
      "description": "Task description",
      "status": "pending"
    }
    ```

- `GET /api/tasks` - Get all tasks (with filtering options)
  - Query Parameters:
    - `page`: Page number (default: 1)
    - `limit`: Items per page (default: 10)
    - `status`: Filter by status (pending/in-progress/completed)
    - `sortBy`: Sort by field (e.g., createdAt:desc)
    - `search`: Search in title

- `PATCH /api/tasks/:id` - Update a task
  - Body: `{ "status": "completed" }`

- `DELETE /api/tasks/:id` - Delete a task

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Run

```bash
npm run dev
```
