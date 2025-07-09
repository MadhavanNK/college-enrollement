// 'use client';
// import { useEffect, useState } from "react";
// import api from "../../utils/api";

// export default function CoursesPage() {
//   const [courses, setCourses] = useState([]);
//   const [instructors, setInstructors] = useState([]);
//   const [formData, setFormData] = useState({ course_name: "", instructor: "" });

//   useEffect(() => {
//     fetchCourses();
//     fetchInstructors();
//   }, []);

//   const fetchCourses = async () => {
//     const res = await api.get("courses/");
//     setCourses(res.data);
//   };

//   const fetchInstructors = async () => {
//     const res = await api.get("instructors/");
//     setInstructors(res.data);
//   };

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await api.post("courses/", formData);
//     setFormData({ course_name: "", instructor: "" });
//     fetchCourses();
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">Courses</h2>
//       <div className="max-w-md flex flex-col gap-3">
//       <form onSubmit={handleSubmit} className="space-y-2 mb-6">
//         <input name="course_name" value={formData.course_name} onChange={handleChange} placeholder="Course Name" className="border px-2 py-1 w-full" />
//         <select name="instructor" value={formData.instructor} onChange={handleChange} className="border px-2 py-1 w-full">
//           <option value="">Select Instructor</option>
//           {instructors.map((i) => (
//             <option key={i.instructor_id} value={i.instructor_id}>
//               {i.instructor_name}
//             </option>
//           ))}
//         </select>
//         <button type="submit" className="bg-purple-600 text-white px-4 py-2">Add</button>
//       </form>
//       </div>

//       <ul className="list-disc pl-5">
//         {courses.map((c) => (
//           <li key={c.course_id}>
//             {c.course_name} – {c.instructor?.instructor_name || "N/A"}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

'use client';
import { useEffect, useState } from "react";
import api from "../../utils/api";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [formData, setFormData] = useState({ course_name: "", instructor: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCourses();
    fetchInstructors();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await api.get("courses/");
      setCourses(res.data);
    } catch (err) {
      console.error("Failed to load courses", err);
    }
  };

  const fetchInstructors = async () => {
    try {
      const res = await api.get("instructors/");
      setInstructors(res.data);
    } catch (err) {
      console.error("Failed to load instructors", err);
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.course_name || !formData.instructor) {
      setError("Course name and instructor are required.");
      return;
    }

    try {
      await api.post("courses/", {
        course_name: formData.course_name,
        instructor: parseInt(formData.instructor), // Convert to integer
      });
      setFormData({ course_name: "", instructor: "" });
      fetchCourses();
    } catch (err) {
      console.error(err);
      setError("Something went wrong while creating the course.");
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
