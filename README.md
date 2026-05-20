# SES Employee Directory

Small internal workforce directory assessment project.

---

# Project Overview

This project provides a small employee directory system with:

- A NestJS backend API
- MongoDB persistence using Mongoose
- A React frontend
- Employee CRUD operations
- DTO validation
- Soft delete support
- Business rule validation

---

# Architecture

See:

```text
architecture.md
```

---

# Projet Structure

ses-employee-directory/
│
├── backend/
│   ├── src/
│   └── .env
│
├── frontend/
│   └── src/
│
├── architecture.md
└── README.md

## Backend Setup
1. Navigate to backend
cd backend
2. Install dependencies
npm install
3. Create .env

Create a .env file inside backend/:

PORT=3010
MONGO_URI=mongodb://localhost:27017/ses_employee_directory

For MongoDB Atlas, replace MONGO_URI with the provided connection string.

4. Start backend
npm run start:dev

Backend runs on:

http://localhost:3010
Frontend Setup
1. Navigate to frontend
cd frontend
2. Install dependencies
npm install
3. Start frontend
npm run dev

Frontend runs on:

http://localhost:5173

## Business Rule
Required rule

Active employee work emails must be unique.

An active employee cannot use the same work email as another active employee.

Inactive or soft-deleted employees do not appear in the normal employee list.

Business Rule Implementation

Implemented in:

backend/src/employees/employees.service.ts

Method:

ensureActiveWorkEmailIsUnique()