'use client';
import { useEffect, useState } from "react";
import api from "../../utils/api";

export default function AddressesPage() {
  const [students, setStudents] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [formData, setFormData] = useState({
    student: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    fetchStudents();
    fetchAddresses();
  }, []);

  const fetchStudents = async () => {
    const res = await api.get("students/");
    setStudents(res.data);
  };

  const fetchAddresses = async () => {
    const res = await api.get("addresses/");
    setAddresses(res.data);
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("addresses/", formData);
    setFormData({
      student: "",
      street: "",
      city: "",
      state: "",
      pincode: "",
    });
    fetchAddresses();
  };

  return (
    <div className="m-6">
      <h2 className="text-xl font-bold mb-4">Student Addresses</h2>
     <div className="max-w-md flex flex-col gap-3">
      <form onSubmit={handleSubmit} className="space-y-2 mb-6">
         <div className='max-w-md flex flex-col gap-3'>
        <select
          name="student"
          value={formData.student}
          onChange={handleChange}
          className="p-3 border border-sky-400 rounded"
        >
          <option value="">Select Student</option>
          {students.map((s) => (
            <option key={s.student_id} value={s.student_id}>
              {s.name}
            </option>
          ))}
        </select>
        <input name="street" value={formData.street} onChange={handleChange} placeholder="Street" className="'p-3 border border-sky-400 rounded" />
        <input name="city" value={formData.city} onChange={handleChange} placeholder="City" className="'p-3 border border-sky-400 rounded" />
        <input name="state" value={formData.state} onChange={handleChange} placeholder="State" className="'p-3 border border-sky-400 rounded" />
        <input name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Pincode" className="'p-3 border border-sky-400 rounded" />
        <button type="submit" className="bg-yellow-600 text-white px-4 py-2">Add Address</button>
        </div>
      </form>
      </div>
    

      <ul className="list-disc pl-5">
        {addresses.map((a, idx) => (
          <li key={idx}>
            Student ID {a.student} – {a.street}, {a.city}, {a.state} ({a.pincode})
          </li>
        ))}
      </ul>
    </div>
  );
}
