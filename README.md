# Ghiblix

Ghiblix is a full-stack web application inspired by Studio Ghibli movies. It features a Vue 3 + Vite frontend styled with Tailwind CSS, and a Node.js/Express backend with MongoDB for data storage.

## Project Structure

```
/
├── frontend/   # Vue 3 + Vite + Tailwind CSS app
└── backend/    # Node.js + Express + MongoDB API
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [pnpm](https://pnpm.io/) (or use npm/yarn if you prefer)
- [MongoDB](https://www.mongodb.com/) instance (local or cloud)

## 1. Backend Setup

1. **Install dependencies:**

   ```bash
   cd backend
   pnpm install
   # or
   npm install
   ```

2. **Configure environment variables:**

   - Create a `.env` file in the `backend/` directory with the following:
     ```
     MONGO_URI=your_mongodb_connection_string
     PORT=3000 # optional, defaults to 3000
     JWT_SECRET=your_jwt_secret_key
     ```
   - Required variables are `MONGO_URI` and `JWT_SECRET`.

3. **Start the backend server:**
   ```bash
   node server.js
   # or for development with auto-reload
   pnpm run dev
   # or
   nodemon server.js
   ```

## 2. Frontend Setup

1. **Install dependencies:**

   ```bash
   cd frontend
   pnpm install
   # or
   npm install
   ```

2. **Start the development server:**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```
   - The app will be available at [http://localhost:5173](http://localhost:5173) by default.

## 3. Usage

- The frontend will interact with the backend API (make sure both are running).
- You may need to adjust API URLs in the frontend if your backend runs on a different port or host.

## Tech Stack

- **Frontend:** Vue 3, Vite, Tailwind CSS, Pinia, Vue Router
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs

## License

All rights reserved.

This source code is provided for educational and portfolio purposes only.  
You are not allowed to copy, reuse, modify, or redistribute any part of this project without explicit permission from the author.

© 2025 Valentin HIPPOLYTE
