# Mini Service Request Board

A small full-stack service request board built with:
- Frontend: Next.js App Router
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- Auth: JWT-based login/register
- Styling: Tailwind / CSS utility classes

## Project structure

- `backend/` — Express API server, MongoDB models, auth, and jobs endpoints
- `frontend/` — Next.js app that consumes the backend API

## Setup

### Backend

1. Copy `backend/.env.example` to `backend/.env`
2. Set the values:
   - `MONGO_URI` — MongoDB connection string
   - `JWT_SECRET` — secret for JWT tokens
   - `PORT` — optional, default is `5000`
3. Install dependencies and start:

```bash
cd backend
npm install
npm start
```

### Frontend

1. Copy `frontend/.env.example` to `frontend/.env.local`
2. Set `NEXT_PUBLIC_API_URL` to your backend URL, for example:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

3. Install dependencies and start:

```bash
cd frontend
npm install
npm run dev
```

## API endpoints

- `GET /api/jobs` — list jobs, optional filters: `?category=Plumbing&status=Open&keyword=leak`
- `GET /api/jobs/:id` — job detail
- `POST /api/jobs` — create job (authenticated)
- `PATCH /api/jobs/:id` — update job status
- `DELETE /api/jobs/:id` — delete job (authenticated + owner)
- `POST /api/auth/register` — register user
- `POST /api/auth/login` — login user

## Notes

- Backend now includes global error handling and a 404 route.
- Frontend talks to the Express API via `NEXT_PUBLIC_API_URL`, not directly to MongoDB.
- Authentication is implemented so only logged-in users can post or delete jobs.
