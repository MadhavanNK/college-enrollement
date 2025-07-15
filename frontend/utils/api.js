// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://127.0.0.1:8000/api/", 
// });

// export default api;

// frontend/utils/api.js


import axios from "axios";

const API_BASE = "http://localhost:8000/api"; 

const api = axios.create({
  baseURL: API_BASE,
});


export const fetchInstructors = () => api.get("/instructors/");
export const createInstructor = (data) => api.post("/instructors/", data);


export const fetchCourses = () => api.get("/courses/");
export const createCourse = (data) => api.post("/courses/", data);


export const fetchEnrollments = () => api.get("/enrollments/");
export const createEnrollment = (data) => api.post("/enrollments/", data);


export const fetchStudents = () => api.get("/students/");
export const createStudent = (data) => api.post("/students/", data);

export const fetchAddresses = () => api.get("/student-addresses/");
export const createAddress = (data) => api.post("/student-addresses/", data);


export default api;
