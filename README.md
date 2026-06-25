# Employee Management Fullstack

This is a fullstack Employee Management application using React (Frontend) and Node.js with MongoDB (Backend).

## Prerequisites
- [Node.js](https://nodejs.org/) installed
- MongoDB installed locally or a MongoDB Atlas account

---

## 1. Backend Setup

The backend is built with Node.js, Express, and MongoDB. It uses JWT for authentication.

### Installation
Navigate to the `backend` directory and install dependencies:
```bash
cd backend
npm install
```

### Environment Variables
Create a `.env` file in the `backend` directory with the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_super_secret_jwt_key
```

### Seeding the Database
To create an initial admin user (`admin@example.com` / `password123`), run the seed script:
```bash
npm run seed
```

### Running the Backend
Start the server in development mode:
```bash
npm run dev
```
The backend will run on `http://localhost:5000`.

---

## 2. Frontend Setup

The frontend is built with React and Vite.

### Installation
Open a new terminal, navigate to the frontend directory, and install dependencies:
```bash
cd "react Emp management"
npm install
```

### Running the Frontend
Start the React development server:
```bash
npm run dev
```
The frontend will usually run on `http://localhost:5173`. Open this URL in your browser.

---

## Using the Application
1. Log in using the admin credentials:
   - **Email:** `admin@example.com`
   - **Password:** `password123`
2. You can now manage employees, view the dashboard, and utilize full CRUD operations with JWT authentication securely communicating with the Node.js backend.
