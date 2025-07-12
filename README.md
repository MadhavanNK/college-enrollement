
#  Student Enrollment System

A full-stack web application to manage students, instructors, courses, enrollments, and student addresses.

- **Backend**: Django + Django REST Framework  
- **Frontend**: Next.js (App Router) with Axios

---

##  Project Structure

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
│   │   └── enrollments/page.jsx
│   ├── utils/api.js         
│   └── tailwind.config.js  
```

---

##  Features

- Create, read, and view:
  - Students
  - Student addresses
  - Instructors
  - Courses (linked to instructor)
  - Enrollments (student + course)
- RESTful API for each resource
- Dynamic dropdowns for linked models (e.g., instructor select in courses)
- Tailwind CSS-based UI
- Axios API integration

---

##  Tech Stack

| Layer       | Technology         |
|------------|--------------------|
| Backend     | Django, DRF        |
| Frontend    | Next.js (App Router) |
| Styling     | Tailwind CSS       |
| API Calls   | Axios              |
| DB          | SQLite (default)   |
| CORS        | django-cors-headers|

---

##  Setup Instructions

###  Backend (Django)

```bash
cd backend
python -m venv venv
source venv/bin/activate  
pip install -r requirements.txt
```

If `requirements.txt` is not present, install manually:

```bash
pip install django djangorestframework django-cors-headers
```

Now migrate and run server:

```bash
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser 
python manage.py runserver
```

---

###  Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

> App runs at: `http://localhost:3000`  
> Django API runs at: `http://localhost:8000`

---

##  API Endpoints

| Resource    | Endpoint                   |
|-------------|----------------------------|
| Students    | `/api/students/`           |
| Instructors | `/api/instructors/`        |
| Courses     | `/api/courses/`            |
| Enrollments | `/api/enrollments/`        |
| Addresses   | `/api/student-addresses/`  |

> Use Postman or browser to test these.

---

##  Key Files

### Django:
- `models.py`: All models (Student, Course, etc.)
- `serializers.py`: Data serializers
- `views.py`: APIView or ViewSets
- `urls.py`: Endpoint routes

### Next.js:
- `page.jsx`: Lists + forms for each resource
- `utils/api.js`: Axios instance for API calls

---

##  CORS Setup

Ensure this in Django `settings.py`:

```python
INSTALLED_APPS = [
    ...
    'corsheaders',
    'rest_framework',
    ...
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    ...
]

CORS_ALLOW_ALL_ORIGINS = True  
```

---

##  Screenshots (Optional)

Include images of the frontend pages if you like:
```
- Student form + list
- Course creation dropdown with instructor
- Admin panel
```

---

##  To Do / Improvements

-  Create forms and fetch lists
-  Add update/delete functionality
-  Add search/filter
-  Add pagination
-  Export data as CSV or PDF
-  Deploy (Netlify + Railway or Vercel + Render)

---

