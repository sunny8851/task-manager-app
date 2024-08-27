# Task Management App

A full-stack task management application built with the MERN stack (MongoDB, Express.js, React/Next.js, Node.js). This application allows users to create, update, delete, and organize tasks effectively. It also includes an analytical dashboard with visualizations for task distribution and completion rates.

## Features

- **Task Creation**: Users can create tasks with a title, description, due date, and priority level.
- **Task Management**: Users can view, edit, and delete tasks.
- **Task Details**: Users can view task details in a separate view.
- **Task Completion**: Users can mark tasks as completed.
- **Task Search**: Users can filter tasks by status and search tasks by title or description.
- **Analytics Dashboard**: A dashboard with a pie chart showing task distribution and a list of upcoming deadlines.

## Tech Stack

- **Frontend**: React, Next.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Token)
- **Charts**: Chart.js

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Getting Started

### 1. Clone the Repository

```bash
backend
git clone https://github.com/sunny8851/task-manager-backend.git
npm install
node server.js
The backend will be running on http://localhost:5000.


frontend
git clone https://github.com/sunny8851/task-manager-app.git
npm install
npm run dev
The frontend will be running on http://localhost:3000.

4. Accessing the Application
Frontend: Open your browser and go to http://localhost:3000.
Backend: You can use a tool like Postman to test the API endpoints at http://localhost:5000/api/tasks.
API Endpoints
POST /api/tasks: Create a new task.
GET /api/tasks: Retrieve all tasks.
GET /api/tasks/
: Retrieve a specific task by ID.
PUT /api/tasks/
: Update a specific task by ID.
DELETE /api/tasks/
: Delete a specific task by ID.
```
