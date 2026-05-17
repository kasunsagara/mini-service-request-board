# Mini Service Request Board

A service request board built as a full-stack developer technical assessment project.
It includes a Next.js frontend, an Express backend, MongoDB persistence, JWT authentication, and a clean UI for browsing, filtering, posting, updating, and deleting service requests.

## Live Demo

- https://service-board-ten.vercel.app/

## Features

- Browse all posted service requests
- Filter by category and status
- Search requests by title or description
- View detailed request information
- Register and sign in with JWT authentication
- Create new service requests with contact information
- Update request status to Open / In Progress / Closed
- Delete requests only by the authenticated owner
- Responsive UI with Tailwind CSS and React icons

## Tech Stack

- Frontend: Next.js App Router, React 19, Tailwind CSS v4
- Backend: Node.js, Express 5, MongoDB, Mongoose
- Auth: JWT, bcryptjs
- Notifications: react-hot-toast

## Repository Structure

- `backend/` — Express API server, auth and job endpoints, MongoDB models
- `frontend/` — Next.js application, pages, components, and auth context

## Backend Summary

- `backend/server.js` — app bootstrapping, middleware, route registration
- `backend/config/db.js` — MongoDB connection
- `backend/routes/authRouter.js` — `/api/auth/register`, `/api/auth/login`
- `backend/routes/jobRouter.js` — `/api/jobs`, `/api/jobs/:id`
- `backend/controllers/authController.js` — register and login logic
- `backend/controllers/jobController.js` — fetch, create, update, delete job requests
- `backend/models/User.js` — user schema, password hashing, password validation
- `backend/models/jobRequest.js` — service request schema, status enum, timestamps
- `backend/middleware/authMiddleware.js` — JWT auth middleware
- `backend/middleware/errorMiddleware.js` — centralized error handling

## Frontend Summary

- `frontend/app/page.jsx` — homepage with search and filter controls
- `frontend/app/jobs/new/page.jsx` — authenticated request creation form
- `frontend/app/jobs/[id]/page.jsx` — detail page with status update and delete action
- `frontend/app/login/page.jsx` — sign-in form
- `frontend/app/register/page.jsx` — sign-up form
- `frontend/app/context/AuthContext.js` — auth state, login/register/logout, localStorage persistence
- `frontend/app/components/JobCard.jsx` — request preview card

## Setup

### Backend

```bash
cd backend
npm install
```

Create `backend/.env` with:

```env
MONGO_URI=mongodb://localhost:27017/service-board
JWT_SECRET=your_jwt_secret
PORT=5000
```

Start the backend:

```bash
npm start
```

### Frontend

```bash
cd frontend
npm install
```

Create `frontend/.env.local` with:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

## Run Commands

### Run backend only

```bash
cd backend
npm start
```

### Run frontend only

```bash
cd frontend
npm run dev
```

### Run both together

1. In terminal 1:

```bash
cd backend
npm start
```

2. In terminal 2:

```bash
cd frontend
npm run dev
```

## API Endpoints

### Auth

- `POST /api/auth/register`
  - body: `{ username, email, password }`
- `POST /api/auth/login`
  - body: `{ email, password }`

### Jobs

- `GET /api/jobs`
  - optional query params: `category`, `status`, `keyword`
- `GET /api/jobs/:id`
- `POST /api/jobs`
  - authenticated route
  - requires `Authorization: Bearer <token>`
- `PATCH /api/jobs/:id`
  - updates job request status
- `DELETE /api/jobs/:id`
  - authenticated route
  - only the request owner may delete

## Notes

- The frontend stores auth state in `localStorage` under `userInfo`.
- Job status values are `Open`, `In Progress`, and `Closed`.
- Requests include category, location, contact name, and contact email.
- Validation is performed on both backend and frontend.

## Deployment

- Frontend is deployable to Vercel.
- Backend can be deployed anywhere Node.js and MongoDB are supported.
- Set `NEXT_PUBLIC_API_URL` to your deployed backend URL for production.

---

Built for a Full-Stack Developer Intern technical assessment.
