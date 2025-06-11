# Task Manager Frontend

A modern task management application built with Next.js, TypeScript, TailwindCSS, and Framer Motion.

## Features

- Task list with card and table views
- Dynamic filters: status, due date
- Sorting by priority or date
- Instant search functionality
- Add/edit/delete tasks with form validation
- Smooth animations using Framer Motion
- Dark mode toggle
- Responsive UI design
- State management with Zustand

## Tech Stack

- **Next.js 14+**: React framework with App Router
- **TypeScript**: For type safety
- **TailwindCSS**: For styling
- **Framer Motion**: For animations
- **React Hook Form + Zod**: For form validation
- **Zustand**: For state management
- **Axios**: For API calls

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend API running (see task-manager-api project)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
cd task-manager-frontend
npm install
```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### Connecting to the Backend

Make sure the backend API is running on http://localhost:3000 or update the API_URL in `src/services/taskService.ts` to match your backend URL.

## Project Structure

```
task-manager-frontend/
├── src/
│   ├── app/
│   │   ├── page.tsx       # Main application page
│   │   └── layout.tsx     # Application layout
│   ├── components/        # React components
│   │   ├── TaskCard.tsx   # Individual task card
│   │   ├── TaskForm.tsx   # Form for adding/editing tasks
│   │   ├── TaskList.tsx   # List of tasks with filtering
│   │   └── SearchBar.tsx  # Search functionality
│   ├── services/          # API services
│   │   └── taskService.ts # Task API client
│   ├── store/             # State management
│   │   └── taskStore.ts   # Zustand store for tasks
│   └── types/             # TypeScript types
│       └── task.ts        # Task-related types
└── public/                # Static assets
```
