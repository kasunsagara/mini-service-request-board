# Mini Service Request Board

A small full-stack service request board built with:
- Frontend: Next.js App Router
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- Auth: JWT-based login/register
- Styling: Tailwind CSS

## Live Demo

Check out the live application: [https://service-board-ten.vercel.app/](https://service-board-ten.vercel.app/)

## Project structure

- `backend/` — Express API server, MongoDB connection, auth, and job endpoints
- `frontend/` — Next.js application that consumes the backend API

## Setup

### 1. Backend setup

1. Open a terminal and go to the backend folder:

```bash
cd backend
```

2. Install backend dependencies:

```bash
npm install
```

3. Create a backend environment file:

```bash
copy .env.example .env
```

4. Set the required backend environment variables in `backend/.env`:

- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — secret for signing JWT tokens
- `PORT` — optional, defaults to `5000`

5. Start the backend server:

```bash
npm start
```

### 2. Frontend setup

1. Open a second terminal and go to the frontend folder:

```bash
cd frontend
```

2. Install frontend dependencies:

```bash
npm install
```

3. Create a frontend environment file:

```bash
# On Windows PowerShell
New-Item -Path .env.local -ItemType File -Force
```

4. Set the required frontend environment variable in `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

5. Start the frontend app:

```bash
npm run dev
```

## Required environment variables

### Backend

- `MONGO_URI` — MongoDB connection string, for example `mongodb://localhost:27017/mydb`
- `JWT_SECRET` — secret key used by the backend to sign JSON Web Tokens
- `PORT` — optional server port, default is `5000`

### Frontend

- `NEXT_PUBLIC_API_URL` — full URL of the backend API, for example `http://localhost:5000`

## Run instructions

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

1. Start the backend in one terminal:

```bash
cd backend
npm start
```

2. Start the frontend in another terminal:

```bash
cd frontend
npm run dev
```

## API overview

- `GET /api/jobs` — fetch job requests
- `GET /api/jobs/:id` — fetch a single job request
- `POST /api/jobs` — create a new job request (authenticated)
- `PATCH /api/jobs/:id` — update job status
- `DELETE /api/jobs/:id` — delete a job request (authenticated + owner)
- `POST /api/auth/register` — register a new user
- `POST /api/auth/login` — login and receive a JWT token
