# Task Management App

## Overview
A simple Task Management application where users can create, view, edit, delete, and mark tasks as complete/incomplete. The app uses **Next.js 14+** with Server Actions for handling backend logic and **MongoDB** for data persistence.

## Core Features
- ✅ **Task CRUD Operations**: Create, Read, Update, Delete tasks.
- ✅ **Mark Tasks as Complete/Incomplete**.
- ✅ **Basic Task Details**: Title, Description, Due Date.
- ✅ **Data Persistence**: MongoDB for storing task data.
- ✅ **Error Handling & Loading States**.

## Technical Breakdown

### Frontend (Next.js 14+ with App Router)
- **React Server Components**: Optimized for performance.
- **Server Actions**: Handling form submissions directly from server components (instead of traditional API routes).
- **Client Components**: Used for interactive elements like buttons, forms.
- **Tailwind CSS**: For styling and responsive design.

### Backend (Server Actions)
- **Next.js Server Actions** (`use server` directive): Handling form submissions and CRUD operations directly on the server.
- **MongoDB + Mongoose**: Used for database interactions and data persistence.
