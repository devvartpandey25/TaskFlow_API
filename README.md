# 🚀 Task Manager with Role-Based Access

## 📌 Overview

A secure REST API with JWT authentication and role-based access control. Includes a React frontend for interaction.

---

## 🛠 Tech Stack

* Spring Boot (Java)
* MongoDB
* Spring Security + JWT
* React.js
* Postman

---

## 🔐 Features

* User Registration & Login
* Password Hashing (BCrypt)
* JWT Authentication
* Role-Based Access (User/Admin)
* CRUD Operations (Tasks)
* Admin-only delete functionality

---

## ⚙️ Run Project

### Backend

cd backend
mvn spring-boot:run

### Frontend

cd frontend
npm install
npm start

---

## 🔗 API Endpoints

* POST /auth/register
* POST /auth/login
* GET /tasks
* POST /tasks
* DELETE /tasks/{id} (Admin only)

---

## 📬 API Testing

Postman collection available in `/postman`

---

## 📊 Scalability

* Stateless JWT supports scaling
* Can integrate Redis for caching
* Can evolve into microservices


