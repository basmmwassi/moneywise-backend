# 🧠 MoneyWise Backend

This is the backend for the **MoneyWise** budget management application. Built using **Node.js**, **Express**, and **MongoDB** with Mongoose.

## 📁 Folder Structure

```
moneywise-backend/
│
├── app.js               # Main server file
├── db.js                # MongoDB connection setup
├── .env                 # Environment variables
├── routes/              # API route definitions
├── controllers/         # Logic for routes
├── models/              # Mongoose schemas (User, Expense, Deposit)
├── middleware/          # JWT auth and role checks
├── package.json         # Dependencies
```

## 🔐 Authentication

- Uses JWT for secure login sessions
- Middleware for role-based access control (`user` vs `admin`)

## 🔍 Features

- CRUD for expenses and deposits
- Aggregation stats (daily logins, top users)
- Admin user management (view, delete)
- External API support planned (e.g., currency exchange)

## 🚀 Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with the following:
```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

3. Start the server:
```bash
node app.js
```

Runs on: `https://moneywise-backend.onrender.com`

## 🧪 API

You can test all endpoints via Postman.