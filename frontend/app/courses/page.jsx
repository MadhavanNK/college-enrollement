
'use client';
import { useEffect, useState } from "react";
import { fetchCourses, createCourse } from "../../utils/api";


export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [formData, setFormData] = useState({ course_name: "", instructor: "" });
  const [error, setError] = useState("");

  useEffect(() => {
  loadCourses();
  fetchInstructors(); 
}, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });  

const loadCourses = async () => {
  const res = await fetchCourses(); 
  setCourses(res.data);
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  if (!formData.course_name || !formData.instructor) {
    setError("Course name and instructor are required.");
    return;
  }

  try {
    await createCourse({
      course_name: formData.course_name,
      instructor: parseInt(formData.instructor),
    }); 
    setFormData({ course_name: "", instructor: "" });
    loadCourses();
  } catch (err) {
    console.error(err);
    setError("Something went wrong while creating the course.");
  }
};

const fetchInstructors = async () => {
  try {
    const res = await fetch('http://localhost:8000/api/instructors/'); 
    const data = await res.json();
    setInstructors(data);
     console.log("Instructors:", data);
  } catch (err) {
    console.error("Failed to load instructors", err);
  }
};


  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Courses</h2>

      <form onSubmit={handleSubmit} className="space-y-3 max-w-md mb-6">
        <input
          name="course_name"
          value={formData.course_name}
          onChange={handleChange}
          placeholder="Course Name"
          className="border px-2 py-1 w-full"
          required
        />

        <select
          name="instructor"
          value={formData.instructor}
          onChange={handleChange}
          className="border px-2 py-1 w-full"
          required
        >
          <option value="">Select Instructor</option>
          {instructors.map((ins) => (
            <option key={ins.instructor_id} value={ins.instructor_id}>
              {ins.instructor_name}
            </option>
          ))}
        </select>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Add Course
        </button>
      </form>

      <ul className="list-disc pl-5">
        {courses.map((c) => (
          <li key={c.course_id}>
            {c.course_name} — Instructor ID: {c.instructor}
          </li>
        ))}
      </ul>
    </div>
  );
}
