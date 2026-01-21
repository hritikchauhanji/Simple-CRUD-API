# User CRUD REST API

A simple and clean **User CRUD REST API** built using **Fastify**, **Prisma**, **PostgreSQL**, and **Zod**.  
This project demonstrates backend fundamentals such as request validation, soft delete, structured error handling, and API documentation using Swagger.

---

## Tech Stack

- Node.js
- Fastify
- Prisma ORM
- PostgreSQL
- Zod

---

## Project Structure

CRUD_REST_APIs/
├── prisma/
│ └── schema.prisma
├── src/
│ ├── app.js
│ ├── server.js
│ ├── config/
│ │ └── prisma.js
│ ├── controllers/
│ │ └── user.controller.js
│ ├── routes/
│ │ └── user.routes.js
│ ├── validator/
│ │ └── user.validator.js
│ └── middleware/
│ └── error.middleware.js
├── .env
├── package.json
└── README.md

---

## User Table Schema

- id (UUID) – Primary Key
- name (VARCHAR 100) – Required
- email (VARCHAR 150) – Required, Unique
- age (INTEGER) – Optional
- isActive (BOOLEAN) – Default true
- createdAt (TIMESTAMP) – Auto-generated

---

## API Endpoints

POST /users  
GET /users  
GET /users/:id  
PATCH /users/:id  
DELETE /users/:id

---

## Setup Instructions

1. Install dependencies  
   npm install

2. Setup environment variables  
   PORT=3000
   NODE_ENV=development
   DATABASE_URL=postgresql://username:password@host:port/database

3. Run migrations  
   npx prisma migrate dev  
   npx prisma generate

4. Start server  
   node src/server.js or npm run dev

---

## Author

Hritik Chauhan
