'use client';
import { useEffect, useState } from "react";
import api from "../../utils/api";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", gender: "", dob: "" });

  useEffect(() => { fetchStudents(); }, []);

  const fetchStudents = async () => {
    const res = await api.get("students/");
    setStudents(res.data);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("students/", formData);
    setFormData({ name: "", email: "", gender: "", dob: "" });
    fetchStudents();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Students</h2>
      <form onSubmit={handleSubmit} className="space-y-2 mb-6">
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="border px-2 py-1 w-full" />
        <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="border px-2 py-1 w-full" />
        <input name="gender" value={formData.gender} onChange={handleChange} placeholder="Gender" className="border px-2 py-1 w-full" />
        <input name="dob" type="date" value={formData.dob} onChange={handleChange} className="border px-2 py-1 w-full" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">Add</button>
      </form>

      <ul className="list-disc pl-5">
        {students.map((s) => <li key={s.student_id}>{s.name} - {s.email}</li>)}
      </ul>
    </div>
  );
}
