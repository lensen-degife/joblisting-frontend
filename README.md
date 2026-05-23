# JobListing Frontend

Modern and responsive frontend for the Job Listing platform built with React + TypeScript.

## Overview

This repository contains the frontend application for the Job Listing platform.

### Backend Repository
[JobListing Backend](https://github.com/lensen-degife/JobListing-backend)

---

## Tech Stack

- React 18
- TypeScript
- Vite
- Axios
- Tailwind CSS
- React Query / Zustand

---

## Features

- Browse available jobs
- Search and filter jobs
- Responsive UI design
- View detailed job information
- User authentication interface
- Submit job applications
- Clean and modern user experience

---

## Getting Started

### Prerequisites

Make sure you have installed:

- Node.js 18+
- npm or yarn

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/lensen-degife/joblisting-frontend.git
cd joblisting-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:8080
```

### 4. Start the development server

```bash
npm run dev
```

---

## API Configuration

Example API setup:

```ts
// src/services/api.ts

const API_BASE_URL = import.meta.env.VITE_API_URL;
```

---

## Project Structure

```text
src/
├── components/
├── pages/
├── services/
├── types/
├── utils/
└── assets/
```

---

## Recommended Development Workflow

1. Start the backend server

```bash
./mvnw spring-boot:run
```

2. Start the frontend server

```bash
npm run dev
```

3. Open the frontend in your browser

```text
http://localhost:5173
```

---

## Future Improvements

- Dark mode
- Saved jobs
- Pagination
- Advanced filtering
- Admin dashboard
- Real-time notifications

---
