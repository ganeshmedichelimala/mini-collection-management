# Mini Collection Management System - Backend

## Overview

This is the backend for the Mini Collection Management System. It provides APIs for authentication, customer and payment management, real-time notifications, and Excel file uploads.

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Socket.io
- JWT
- Multer
- xlsx
- Docker

## Setup

1. Copy `.env.example` to `.env` and fill in your environment variables.
2. Run `npm install` to install dependencies.
3. Use `npm run dev` to start the server in development mode.
4. Use Docker Compose to run with PostgreSQL: `docker-compose up --build`

## Scripts

- `npm run dev` - Start with nodemon
- `npm start` - Start with node

## API Documentation

Swagger docs will be available at `/api-docs` after implementation.

## Database Initialization

To create the required tables, connect to the running PostgreSQL container and run:

```
psql -U user -d mini_collection_db -f src/config/init.sql
```

Or use a GUI tool to run the SQL in `src/config/init.sql`.
