'use client';
import { useEffect, useState } from "react";
import { fetchInstructors, createInstructor } from "../../utils/api";


export default function InstructorsPage() {
  const [instructors, setInstructors] = useState([]);
  const [formData, setFormData] = useState({ instructor_name: "", email: "" });
   const [error, setError] = useState("");

   useEffect(() => {
  loadInstructors();
}, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

const loadInstructors = async () => {
  const res = await fetchInstructors();
  setInstructors(res.data);
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  if (!formData.instructor_name || !formData.email) {
    setError("Name and email required.");
    return;
  }

  try {
    await createInstructor(formData);
    setFormData({ instructor_name: "", email: "" });
    loadInstructors();
  } catch (err) {
    console.error(err);
    setError("Failed to add instructor.");
  }
};


  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Instructors</h2>
      <div className="max-w-md flex flex-col gap-3">
      <form onSubmit={handleSubmit} className="space-y-2 mb-6">
        <input name="instructor_name" value={formData.instructor_name} onChange={handleChange} placeholder="Name" className="border px-2 py-1 w-full" />
        <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="border px-2 py-1 w-full" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2">Add</button>
      </form>
      </div>

      <ul className="list-disc pl-5">
        {instructors.map((i) => <li key={i.instructor_id}>{i.instructor_name} - {i.email}</li>)}
      </ul>
    </div>
  );
}
