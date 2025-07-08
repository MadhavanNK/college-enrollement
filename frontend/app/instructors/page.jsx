'use client';
import { useEffect, useState } from "react";
import api from "../../utils/api";

export default function InstructorsPage() {
  const [instructors, setInstructors] = useState([]);
  const [formData, setFormData] = useState({ instructor_name: "", email: "" });

  useEffect(() => { fetchInstructors(); }, []);

  const fetchInstructors = async () => {
    const res = await api.get("instructors/");
    setInstructors(res.data);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("instructors/", formData);
    setFormData({ instructor_name: "", email: "" });
    fetchInstructors();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Instructors</h2>
      <form onSubmit={handleSubmit} className="space-y-2 mb-6">
        <input name="instructor_name" value={formData.instructor_name} onChange={handleChange} placeholder="Name" className="border px-2 py-1 w-full" />
        <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="border px-2 py-1 w-full" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2">Add</button>
      </form>

      <ul className="list-disc pl-5">
        {instructors.map((i) => <li key={i.instructor_id}>{i.instructor_name} - {i.email}</li>)}
      </ul>
    </div>
  );
}
