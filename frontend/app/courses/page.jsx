'use client';
import { useEffect, useState } from "react";
import api from "../../utils/api";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [formData, setFormData] = useState({ course_name: "", instructor: "" });

  useEffect(() => {
    fetchCourses();
    fetchInstructors();
  }, []);

  const fetchCourses = async () => {
    const res = await api.get("courses/");
    setCourses(res.data);
  };

  const fetchInstructors = async () => {
    const res = await api.get("instructors/");
    setInstructors(res.data);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("courses/", formData);
    setFormData({ course_name: "", instructor: "" });
    fetchCourses();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Courses</h2>
      <form onSubmit={handleSubmit} className="space-y-2 mb-6">
        <input name="course_name" value={formData.course_name} onChange={handleChange} placeholder="Course Name" className="border px-2 py-1 w-full" />
        <select name="instructor" value={formData.instructor} onChange={handleChange} className="border px-2 py-1 w-full">
          <option value="">Select Instructor</option>
          {instructors.map((i) => (
            <option key={i.instructor_id} value={i.instructor_id}>
              {i.instructor_name}
            </option>
          ))}
        </select>
        <button type="submit" className="bg-purple-600 text-white px-4 py-2">Add</button>
      </form>

      <ul className="list-disc pl-5">
        {courses.map((c) => (
          <li key={c.course_id}>
            {c.course_name} – {c.instructor?.instructor_name || "N/A"}
          </li>
        ))}
      </ul>
    </div>
  );
}
