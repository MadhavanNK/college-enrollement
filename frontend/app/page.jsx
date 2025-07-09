'use client';
import Link from "next/link";

export default function Home() {
  const pages = [
    { name: "Students", path: "/students" },
    { name: "Instructors", path: "/instructors" },
    { name: "Courses", path: "/courses" },
    { name: "Enrollments", path: "/enrollments" },
    { name: "Addresses", path: "/addresses" },
  ];

  return (
    <main className="min-h-screen bg-orange-400 text-center p-10">
      <h1 className="text-3xl font-bold mb-8">📚 College Enrollment System</h1>
      
      <div className="flex flex-col items-center gap-4">
        {pages.map((page) => (
          <Link
            key={page.path}
            href={page.path}
            className="px-6 py-3 bg-blue-600 text-white rounded shadow-md hover:bg-blue-700 w-64 text-center"
          >
            {page.name}
          </Link>
        ))}
      </div>
    </main>
  );
}
