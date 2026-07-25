# Lead Management System

A simple CRM-style lead management application built for a small sales team.

The application allows visitors to submit leads through a public form while authenticated staff can manage those leads through an internal dashboard.

The project was built using the MERN stack with JWT authentication and role-based access control.

---

## Live Demo

Frontend: lead-management-system-ochre-sigma.vercel.app

Backend API: [https://your-render-url.onrender.com](https://lead-management-system-6tsq.onrender.com)

---

## Demo Accounts

### Admin

Email:
```
admin@test.com
```

Password:
```
password123
```

### Member

Email:
```
member@test.com
```

Password:
```
123456
```

---

## Features

### Public Lead Capture

- Public landing page
- Visitors can submit leads without logging in
- Validation on both client and server
- New leads automatically enter the pipeline

### Authentication

- JWT based login
- Password hashing using bcrypt
- Protected API routes
- Persistent login using localStorage

### Role Based Access Control

Admin can

- View all leads
- Create leads
- Delete leads
- Assign leads
- Change lead status
- View timelines

Member can

- View assigned leads
- View lead details
- Add notes
- View activity timeline

Permissions are enforced on both the frontend and backend.

---

## Lead Lifecycle

Each lead progresses through a status pipeline.

Current statuses:

- New
- Contacted
- Qualified
- Proposal Sent
- Won
- Lost

Leads can also be assigned to members.

---

## Activity Timeline

Every important action is recorded.

Examples include:

- Lead created
- Lead assigned
- Status changed
- Notes added

---

## Search & Filtering

The dashboard supports:

- Search by name
- Search by email
- Search by company
- Filter by status
- Pagination

---

## Tech Stack

### Frontend

- React
- Vite
- Bootstrap
- Axios
- React Router
- React Hot Toast

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcrypt

---

## Folder Structure

```
lead-management-system/
│
├── client/
│   ├── src/
│   └── ...
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── ...
```

---

## Running Locally

### Clone

```bash
git clone https://github.com/AnishRN/lead-management-system.git
```

Move into the project.

```bash
cd lead-management-system
```

---

### Backend

```bash
cd server
npm install
npm run dev
```

Create a `.env` file.

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret
```

---

### Frontend

```bash
cd client
npm install
npm run dev
```

Create a `.env` file.

```
VITE_API_URL=http://localhost:5000/api
```

---

## API

### Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/register` | Register |
| GET | `/api/auth/me` | Current user |

---

### Leads

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/leads` | Get all leads |
| POST | `/api/leads` | Create lead |
| GET | `/api/leads/:id` | Lead details |
| PUT | `/api/leads/:id` | Update lead |
| DELETE | `/api/leads/:id` | Delete lead |
| PATCH | `/api/leads/:id/status` | Update status |
| PATCH | `/api/leads/:id/assign` | Assign member |

---

### Public

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/public/leads` | Submit a public lead |

---

### Notes

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/notes/:leadId` | Add note |
| DELETE | `/api/notes/:id` | Delete note |

---

## Query Parameters

The lead list endpoint supports:

```
?page=1
&limit=10
&status=New
&search=john
```

Example:

```
GET /api/leads?page=1&status=Qualified&search=company
```

---

## Testing

Tests were written using:

- Jest
- Supertest

The following flows are covered:

- Authentication
- Authorization
- Lead creation
- Protected routes

Run:

```bash
npm test
```

---

## Deployment

Frontend is deployed on Vercel.

Backend is deployed on Render.

MongoDB Atlas is used for the database.

---

## Credits

Built for Digital Heroes Training Task

https://digitalheroesco.com
