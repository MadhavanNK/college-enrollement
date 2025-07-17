# 🎓 Student Enrollment System

A full-stack web application to manage students, instructors, courses, enrollments, and student addresses.

- **Backend**: Django + Django REST Framework  
- **Frontend**: Next.js (App Router) with Axios  
- **Styling**: Tailwind CSS

---

## 📁 Project Structure

```
├── backend/                  
│   ├── core/                
│   ├── db.sqlite3          
│   └── manage.py
│
├── frontend/                 
│   ├── app/
│   │   ├── page.jsx         
│   │   ├── students/page.jsx
│   │   ├── instructors/page.jsx
│   │   ├── courses/page.jsx
│   │   ├── enrollments/page.jsx
│   │   └── student-addresses/page.jsx
│   ├── utils/api.js         
│   └── tailwind.config.js  
```

---

## ✅ Features

- Create, Read (CRUD) support for:
  - Students
  - Student Addresses
  - Instructors
  - Courses (linked to instructors)
  - Enrollments (student + course)
- RESTful API endpoints with Django DRF
- Dynamic dropdowns in frontend (e.g., Instructor → Course)
- Axios integration for frontend API
- Tailwind CSS UI design

---

## 🧱 Tech Stack

| Layer       | Technology          |
|-------------|---------------------|
| Backend     | Django + DRF        |
| Frontend    | Next.js (App Router)|
| Styling     | Tailwind CSS        |
| API Client  | Axios               |
| Database    | SQLite (default)    |
| CORS        | django-cors-headers |

---

## ⚙️ Setup Instructions

### 🔙 Backend (Django)

```bash
cd backend
python -m venv venv
source venv/bin/activate  
pip install -r requirements.txt
```

If `requirements.txt` is missing:

```bash
pip install django djangorestframework django-cors-headers
```

Now run migrations and start server:

```bash
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

---

### 🔜 Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

> Frontend runs at: `http://localhost:3000`  
> Django API runs at: `http://localhost:8000`

---

## 🔗 API Endpoints Summary

| Resource    | Endpoint                   | Methods        |
|-------------|----------------------------|----------------|
| Students    | `/api/students/`           | GET, POST      |
| Instructors | `/api/instructors/`        | GET, POST      |
| Courses     | `/api/courses/`            | GET, POST      |
| Enrollments | `/api/enrollments/`        | GET, POST      |
| Addresses   | `/api/student-addresses/`  | GET, POST      |

---

## 📘 API Details with Responses & cURL

### 📍 Students

- **GET /api/students/**
  - ✅ 200 OK: Returns list of students.
  - ❌ 500 Server Error: Internal failure.
  - 📦 cURL:
    ```bash
    curl http://localhost:8000/api/students/
    ```

- **POST /api/students/**
  - ✅ 201 Created: New student created.
  - ❌ 400 Bad Request: Missing fields.
  - 📦 cURL:
    ```bash
    curl -X POST http://localhost:8000/api/students/       -H "Content-Type: application/json"       -d '{"name": "John Doe", "email": "john@example.com"}'
    ```

### 📍 Student Addresses

- **GET /api/student-addresses/**
  - ✅ 200 OK: Returns list of addresses.
  - ❌ 500 Server Error: Internal failure.
  - 📦 cURL:
    ```bash
    curl http://localhost:8000/api/student-addresses/
    ```

- **POST /api/student-addresses/**
  - ✅ 201 Created: New address added.
  - ❌ 400 Bad Request: Validation failed.
  - 📦 cURL:
    ```bash
    curl -X POST http://localhost:8000/api/student-addresses/       -H "Content-Type: application/json"       -d '{"student": 1, "street": "123 Lane", "city": "Chennai", "state": "TN", "pincode": "600001"}'
    ```

### 📍 Instructors

- **GET /api/instructors/**
  - ✅ 200 OK: Returns list of instructors.
  - 📦 cURL:
    ```bash
    curl http://localhost:8000/api/instructors/
    ```

- **POST /api/instructors/**
  - ✅ 201 Created: Instructor created.
  - ❌ 400 Bad Request
  - 📦 cURL:
    ```bash
    curl -X POST http://localhost:8000/api/instructors/       -H "Content-Type: application/json"       -d '{"instructor_name": "Dr. Smith"}'
    ```

### 📍 Courses

- **GET /api/courses/**
  - ✅ 200 OK: Returns list of courses.
  - 📦 cURL:
    ```bash
    curl http://localhost:8000/api/courses/
    ```

- **POST /api/courses/**
  - ✅ 201 Created: Course created.
  - ❌ 400 Bad Request
  - 📦 cURL:
    ```bash
    curl -X POST http://localhost:8000/api/courses/       -H "Content-Type: application/json"       -d '{"course_name": "Physics", "instructor": 1}'
    ```

### 📍 Enrollments

- **GET /api/enrollments/**
  - ✅ 200 OK: Returns list of enrollments.
  - 📦 cURL:
    ```bash
    curl http://localhost:8000/api/enrollments/
    ```

- **POST /api/enrollments/**
  - ✅ 201 Created: Enrollment created.
  - ❌ 400 Bad Request
  - 📦 cURL:
    ```bash
    curl -X POST http://localhost:8000/api/enrollments/       -H "Content-Type: application/json"       -d '{"student": 1, "course": 1}'
    ```

---


