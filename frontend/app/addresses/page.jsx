'use client';
import { useEffect, useState } from "react";
import { fetchAddresses, createAddress } from "../../utils/api";


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
  const [error, setError] = useState("");


  useEffect(() => {
    fetch('http://localhost:8000/api/students/')
      .then(res => res.json())
      .then(data => setStudents(data));
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  
  useEffect(() => {
  loadAddresses();
}, []);

const loadAddresses = async () => {
  const res = await fetchAddresses();
  setAddresses(res.data);
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  if (!formData.student || !formData.city) {
    setError("Student and city are required.");
    return;
  }

  try {
    await createAddress({
      ...formData,
      student: parseInt(formData.student),
    });
    setFormData({ student: "", street: "", city: "", state: "", pincode: "" });
    loadAddresses();
  } catch (err) {
    console.error(err);
    setError("Error creating address.");
  }
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
