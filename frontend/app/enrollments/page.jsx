'use client';
import { useEffect, useState } from "react";
import api from "../../utils/api";

export default function EnrollmentsPage() {
  const [enrollments, setEnrollments] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({ student: "", course: "", enrollment_date: "" });

  useEffect(() => {
    fetchEnrollments();
    fetchStudents();
    fetchCourses();
  }, []);

  const fetchEnrollments = async () => {
    const res = await api.get("enrollments/");
    setEnrollments(res.data);
  };

  const fetchStudents = async () => {
    const res = await api.get("students/");
    setStudents(res.data);
  };

  const fetchCourses = async () => {
    const res = await api.get("courses/");
    setCourses(res.data);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("enrollments/", formData);
    setFormData({ student: "", course: "", enrollment_date: "" });
    fetchEnrollments();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Enrollments</h2>
      <div className="max-w-md flex flex-col gap-3">
      <form onSubmit={handleSubmit} className="space-y-2 mb-6">
        <select name="student" value={formData.student} onChange={handleChange} className="border px-2 py-1 w-full">
          <option value="">Select Student</option>
          {students.map((s) => (
            <option key={s.student_id} value={s.student_id}>{s.name}</option>
          ))}
        </select>
        <select name="course" value={formData.course} onChange={handleChange} className="border px-2 py-1 w-full">
          <option value="">Select Course</option>
          {courses.map((c) => (
            <option key={c.course_id} value={c.course_id}>{c.course_name}</option>
          ))}
        </select>
        <input name="enrollment_date" type="date" value={formData.enrollment_date} onChange={handleChange} className="border px-2 py-1 w-full" />
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2">Enroll</button>
      </form>
      </div>

      <ul className="list-disc pl-5">
        {enrollments.map((e, idx) => (
          <li key={idx}>
            {e.student?.name || "Student"} → {e.course?.course_name || "Course"} on {e.enrollment_date}
          </li>
        ))}
      </ul>
    </div>
  );
}
