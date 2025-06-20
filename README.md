# 💼 Mini Collection Management System

A full-stack application for managing customers, payments, and notifications with real-time updates. Built using React, Node.js, PostgreSQL, and WebSockets.

---

## 📌 Project Overview

The Mini Collection Management System is designed to help businesses manage:

- ✅ Customer records (CRUD)
- ✅ Payments and dues
- ✅ Upload customers via Excel file
- ✅ Real-time notifications for payment events
- ✅ Admin authentication
- ✅ API documentation with Swagger

---

## ⚙️ Setup Instructions

### 🔧 Prerequisites

- Node.js (v18+)
- Docker Desktop (recommended)
- npm
- PostgreSQL (optional if not using Docker)

---

### 🚀 Option 1: One-Click Setup with Docker (Recommended)

```bash
# Step 1: Clone the repository
git clone https://github.com/ganeshmedichelimala/mini-collection-management.git
cd mini-collection-management

# Step 2: Copy environment file
cd backend
cp .env.example .env

# Step 3: Start all services
docker-compose up --build
```

#### 🔗 Access URLs

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:5000](http://localhost:5000)
- Swagger API Docs: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

---

### 🛠️ Option 2: Manual Setup (Without Docker)

#### Backend

```bash
cd backend
npm install
cp .env.example .env
# Manually start PostgreSQL (use pgAdmin or local instance)
# Run SQL in backend/src/config/init.sql to create tables
npm start
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🏗️ Architecture Diagram

```text
[ React + Redux (Frontend) ]
          |
          | REST API + WebSocket (Socket.IO)
          |
[ Node.js + Express (Backend) ]
          |
          | SQL
          |
[ PostgreSQL Database ]
```

---

## ⚙️ Technical Decisions

| Area             | Technology / Reasoning                                         |
| ---------------- | -------------------------------------------------------------- |
| Auth             | JWT (Stateless, secure)                                        |
| Real-time Comm   | Socket.IO (Push notifications for payments)                    |
| File Upload      | Multer + XLSX (Parse Excel data to JSON)                       |
| DB               | PostgreSQL (Relational and scalable)                           |
| Docs             | Swagger (API documentation)                                    |
| State Management | Redux Toolkit (Centralized state for customer, auth, payments) |
| UI               | Tailwind CSS (Fast, utility-first styling)                     |

---

## 🌱 Future Improvements

- 🔍 Integrate Elasticsearch for full-text search
- 🧪 Add unit and integration testing (Jest, Supertest)
- 🔐 Implement role-based access control (RBAC)
- 📤 Add email/SMS notifications via 3rd-party services
- 📊 Add dashboard analytics for customers & payments

---

## 📂 Project Structure

```
mini-collection-management/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   ├── .env.example
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── package.json
├── frontend/
│   ├── src/
│   ├── public/
│   ├── .gitignore
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---

## 📑 Swagger Documentation

API Docs: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

Swagger is integrated via `swagger-jsdoc` and `swagger-ui-express`.

---

## 🧪 Testing

You can test APIs using Postman or Swagger UI. Socket.IO can be tested with client-side emitters or tools like Postman WebSocket (v10+).

---

## 🔐 .env.example

```env
PORT=5000
JWT_SECRET=your_jwt_secret
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/mini_collection_db
```

---

## 🐳 Docker Configuration

### `docker-compose.yml`

```yaml
version: "3.9"

services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - DATABASE_URL=postgresql://postgres:postgres@db:5432/mini_collection_db
      - JWT_SECRET=your_jwt_secret
    depends_on:
      - db

  db:
    image: postgres
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: mini_collection_db
    ports:
      - "5432:5432"

  frontend:
    build: ./frontend
    ports:
      - "5173:5173"
```

---

## 👤 Author

**Ganesh Medichelimala**  
[GitHub](https://github.com/ganeshmedichelimala)
