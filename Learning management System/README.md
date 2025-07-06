# 🎓 Learning Management System (LMS)

A full-featured web-based Learning Management System (LMS) where instructors can create, edit, publish, and manage online courses. Students can view and enroll in published courses, access lecture videos, and interact with course materials.

---
👨‍💻 About Me
Hi! I'm Tanha Tanven, the developer behind this LMS project.
Student ID: C231468

## 📌 Features

### 🧑‍🏫 Instructor Capabilities
- Create, edit, delete courses
- Upload course thumbnails and lecture videos
- Publish/unpublish courses
- Add/edit/remove lectures with video upload support
- Mark lectures as free previews

### 🧑‍🎓 Student Capabilities (Optional for future dev)
- View published courses
- Enroll in courses
- Stream video lectures (from Cloudinary or similar)
- View course and lecture metadata

---

## ⚙️ Tech Stack

### 🌐 Frontend
- **React.js** – SPA (Single Page Application)
- **Redux Toolkit (RTK Query)** – State management and API calls
- **React Router DOM** – Page routing
- **Tailwind CSS** – UI styling
- **Sonner / Toastify** – Notifications and user feedback
- **Axios** – File upload requests
- **Shadcn UI** -UI 

### 🖥️ Backend
- **Node.js** – Runtime environment
- **Express.js** – Web server framework
- **MongoDB + Mongoose** – Database and ODM
- **Cloudinary** – File/video/image hosting
- **Multer** – File parsing middleware
- **JWT** – Authentication middleware
- **dotenv** – Environment variables

---

## 📂 Folder Structure (Important Parts)

├── client/
│ ├── components/
│ ├── features/api/ ➜ RTK Query API setup
│ ├── pages/ ➜ Pages: Courses, Lectures, Dashboard
│ └── App.jsx, main.jsx
├── server/
│ ├── controllers/
│ ├── routes/
│ ├── models/
│ ├── utils/ ➜ Multer, Cloudinary
│ ├── middlewares/ ➜ isAuthenticated
│ └── index.js


## 🔁 Workflow Overview

### 1. Course Creation (Instructor)
- Instructor submits course title and category
- Course saved in MongoDB with instructor ID

### 2. Edit Course
- Instructor can update thumbnail, description, level, price

### 3. Lecture Upload
- Videos are uploaded to Cloudinary via Multer
- Video URL and public ID are saved to lectures collection

### 4. Course Publishing
- A toggle allows courses to be published/unpublished
- Published courses are visible to students

---

## 🔐 Authentication & Security

- JWT tokens are issued on login and checked via `isAuthenticated` middleware
- Protected routes for instructors (course/lecture management)



## 🚀 Setup Instructions

### 📦 Backend

```bash
cd server
npm install
npm run dev
🌐 Frontend
bash
Copy
Edit
cd client
npm install
npm run dev
