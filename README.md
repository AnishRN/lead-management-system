# Lead Management System

A CRM-style lead management application built for a small sales team.

The application allows visitors to submit leads through a public form, while authenticated staff members can manage those leads through an internal dashboard. It supports role-based access control, lead assignment, status tracking, notes, activity history, filtering and pagination.

This project was built as part of the **Digital Heroes Training Task**.

---

# Live Demo

Frontend (Vercel)

https://lead-management-system-ochre-sigma.vercel.app/

Backend API (Render)

https://lead-management-system-6tsq.onrender.com

---

# Demo Accounts

## Admin

Email

```
admin@test.com
```

Password

```
password123
```

---

## Member

Email

```
member@test.com
```

Password

```
123456
```

---

# Features

## Public Lead Capture

- Public landing page
- Visitors can submit leads without logging in
- Client-side and server-side validation
- Leads are automatically added to the sales pipeline

---

## Authentication

- JWT authentication
- Password hashing with bcrypt
- Protected API routes
- Persistent login using Local Storage

---

## Role-Based Access Control

### Admin

- View all leads
- Create new leads
- Delete leads
- Assign leads to members
- Update lead status
- View complete activity timeline

### Member

- View assigned leads
- View lead details
- Add notes
- View activity history

Permissions are enforced on both the frontend and backend.

---

## Lead Lifecycle

Each lead progresses through the following pipeline:

- New
- Contacted
- Qualified
- Proposal Sent
- Won
- Lost

Leads can also be assigned to individual sales members.

---

## Activity Timeline

Every important action is recorded automatically.

Examples include:

- Lead created
- Lead assigned
- Lead status updated
- Notes added

This provides a complete history of each lead.

---

## Search, Filtering & Pagination

The dashboard supports:

- Search by name
- Search by email
- Search by company
- Filter by lead status
- Pagination

---

# Tech Stack

## Frontend

- React
- Vite
- Bootstrap
- Axios
- React Router
- React Hot Toast

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcrypt

---

# Project Structure

```
lead-management-system/
│
├── client/
│   ├── src/
│   ├── public/
│   └── ...
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── tests/
│   └── ...
│
└── README.md
```

---

# Running Locally

## Clone Repository

```bash
git clone https://github.com/AnishRN/lead-management-system.git
```

```bash
cd lead-management-system
```

---

## Backend

```bash
cd server
npm install
npm run dev
```

Create a `.env` file inside the server directory.

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## Frontend

```bash
cd client
npm install
npm run dev
```

Create a `.env` file inside the client directory.

```
VITE_API_URL=http://localhost:5000/api
```

---

# REST API

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/register` | Register |
| GET | `/api/auth/me` | Current User |

---

## Leads

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/leads` | Get Leads |
| POST | `/api/leads` | Create Lead |
| GET | `/api/leads/:id` | Get Lead |
| PUT | `/api/leads/:id` | Update Lead |
| DELETE | `/api/leads/:id` | Delete Lead |
| PATCH | `/api/leads/:id/status` | Update Status |
| PATCH | `/api/leads/:id/assign` | Assign Lead |

---

## Public

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/public/leads` | Public Lead Submission |

---

## Notes

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/notes/:leadId` | Add Note |
| DELETE | `/api/notes/:id` | Delete Note |

---

# Query Parameters

Lead listing supports:

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

# Testing

The project includes a Jest and Supertest testing structure covering:

- Authentication
- Authorization
- Public lead creation
- Protected routes

Run the test suite using:

```bash
npm test
```

---

# API Documentation

A detailed API document is included in the repository.

```
docs/API_Documentation.pdf
```

---

# Deployment

Frontend

- Vercel

Backend

- Render

Database

- MongoDB Atlas

---

# Assumptions

Some implementation decisions were made where the specification was open-ended.

- The system contains two predefined roles: Admin and Member.
- User registration is intended for internal use only.
- Demo accounts are provided instead of a public registration flow.
- Only administrators can assign leads and manage the lead pipeline.
- Members are limited to working with their assigned leads.

---

# AI Usage

AI tools (primarily ChatGPT and Gemini) were used as a development assistant throughout the project.

They were mainly used to:

- Plan the frontend folder structure.
- Speed up the creation of reusable React components.
- Generate the initial testing structure using Jest and Supertest.
- Help troubleshoot deployment issues on Render and Vercel.

The application logic, backend APIs, authentication flow, deployment configuration, debugging, integration between frontend and backend, and final project decisions were completed and adjusted manually to fit the assignment requirements.

---

# Credits

Built for **Digital Heroes Training Task**

https://digitalheroesco.com
