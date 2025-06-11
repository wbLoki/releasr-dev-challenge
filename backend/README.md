# Task Manager API

A simple REST API for task management built with Node.js and Express.

## Features

- REST API for task management
- CRUD operations for tasks
- Input validation
- Error handling

## API Endpoints

- `GET /tasks` — List all tasks
- `GET /tasks/:id` — Get details of a specific task
- `POST /tasks` — Create a new task
- `PUT /tasks/:id` — Update an existing task
- `DELETE /tasks/:id` — Delete a task

## Project Structure

```
task-manager-api/
├── src/
│   ├── controllers/
│   │   └── taskController.js
│   ├── models/
│   │   └── taskModel.js
│   ├── routes/
│   │   └── taskRoutes.js
│   └── index.js
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
cd task-manager-api
npm install
```

### Running the Server

Development mode with auto-restart:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will run on port 3000 by default. You can change this by setting the PORT environment variable.

## API Usage Examples

### Get all tasks
```
GET /tasks
```

### Get a specific task
```
GET /tasks/:id
```

### Create a new task
```
POST /tasks
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the task manager API project"
}
```

### Update a task
```
PUT /tasks/:id
Content-Type: application/json

{
  "title": "Updated task title",
  "description": "Updated description",
  "completed": true
}
```

### Delete a task
```
DELETE /tasks/:id
```

## Data Model

Task:
- id: string (UUID)
- title: string
- description: string (optional)
- completed: boolean
- createdAt: string (ISO date)
